import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Star,
  Sparkles,
  UserCheck,
  Info,
  AlertTriangle
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { ThorxLogo } from '../components/ThorxLogo';
import { EmailValidator } from '../utils/emailValidation';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
}

interface EmailValidationState {
  isValidating: boolean;
  result: any;
  showSuggestion: boolean;
}

// Team member interfaces removed - now using dedicated team login page

const AuthPage = () => {
  const [location] = useLocation();
  const [isLogin, setIsLogin] = useState(location === '/login' || location === '/auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();

  // Get email from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get('email');

  // Team member verification removed - now using dedicated team login page

  // Update form mode based on route
  useEffect(() => {
    setIsLogin(location === '/login' || location === '/auth');
    // If user navigates to /register, show signup form
    if (location === '/register') {
      setIsLogin(false);
    }
  }, [location]);

  const [formData, setFormData] = useState<FormData>({
    email: emailParam || '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [emailValidation, setEmailValidation] = useState<EmailValidationState>({
    isValidating: false,
    result: null,
    showSuggestion: false
  });

  // Real-time email validation
  useEffect(() => {
    if (formData.email && formData.email.length > 3) {
      setEmailValidation(prev => ({ ...prev, isValidating: true }));

      const timeoutId = setTimeout(() => {
        const result = EmailValidator.validate(formData.email);
        setEmailValidation({
          isValidating: false,
          result,
          showSuggestion: result.suggestions ? true : false
        });
      }, 300); // Debounce validation

      return () => clearTimeout(timeoutId);
    } else {
      setEmailValidation({
        isValidating: false,
        result: null,
        showSuggestion: false
      });
    }
  }, [formData.email]);

  // Password strength calculation
  useEffect(() => {
    if (!isLogin && formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      setPasswordStrength(strength);
    }
  }, [formData.password, isLogin]);

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Enhanced email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailResult = EmailValidator.validate(formData.email);
      if (!emailResult.isValid) {
        newErrors.email = EmailValidator.getValidationMessage(emailResult);
      } else if (emailResult.score < 70) {
        newErrors.email = 'Please use a more reliable email address';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
    }

    // Registration-specific validation
    if (!isLogin) {
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let success = false;

      if (isLogin) {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe
          })
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('thorx_auth_token', result.token);
          setUser(result.user);
          navigate('/dashboard');
        } else if (result.status === 'banned' || result.status === 'deactivated') {
          // Handle banned/deactivated users
          navigate('/account-status', { 
            state: { 
              status: result.status,
              message: result.message,
              reason: result.reason,
              contactAllowed: result.contactAllowed
            }
          });
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // Generate username from email (ensure minimum length of 3 characters)
        let username = formData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (username.length < 3) {
          username = username + Math.random().toString(36).substring(2, 5);
        }

        success = await register({
          username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName || '',
          lastName: formData.lastName || ''
        });

        if (success) {
          setNotification({
            type: 'success',
            message: 'Account created successfully! Please check your email for verification.'
          });

          setTimeout(() => {
            setLocation('/dashboard');
          }, 1500);
        } else {
          setNotification({
            type: 'error',
            message: 'Registration failed. This email may already be registered.'
          });
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-400';
    if (passwordStrength < 50) return 'bg-yellow-400';
    if (passwordStrength < 75) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  // Team verification functions removed - now using dedicated team login page

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Interactive Cosmic Illustration Background */}
      <div className="absolute inset-0 z-0">

        {/* Geometric Satellite Network */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="satelliteGrid" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                {/* Satellite nodes */}
                <circle cx="80" cy="80" r="2" fill="#e2e8f0" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="40" r="1.5" fill="#cbd5e1" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="120" cy="120" r="1.5" fill="#cbd5e1" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite" begin="1s" />
                </circle>

                {/* Connection lines */}
                <line x1="40" y1="40" x2="80" y2="80" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3" />
                <line x1="80" y1="80" x2="120" y2="120" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3" />
                <line x1="40" y1="40" x2="120" y2="120" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.2" />

                {/* Orbital paths */}
                <circle cx="80" cy="80" r="25" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.15" strokeDasharray="2,2" />
                <circle cx="80" cy="80" r="35" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.1" strokeDasharray="3,3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#satelliteGrid)"/>
          </svg>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0">
          {/* Interactive hexagons */}
          <div className="absolute top-1/4 left-1/4 opacity-20 hover:opacity-40 transition-opacity duration-300 cursor-pointer">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <polygon points="30,5 50,15 50,35 30,45 10,35 10,15" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points="30,15 40,20 40,30 30,35 20,30 20,20" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
              <circle cx="30" cy="25" r="2" fill="#e2e8f0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div className="absolute top-2/3 right-1/4 opacity-15 hover:opacity-30 transition-opacity duration-300 cursor-pointer">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <polygon points="40,10 60,25 60,45 40,60 20,45 20,25" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points="40,20 50,27 50,37 40,44 30,37 30,27" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
              <circle cx="40" cy="32" r="3" fill="#e2e8f0" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div className="absolute bottom-1/3 left-1/2 opacity-20 hover:opacity-40 transition-opacity duration-300 cursor-pointer">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <polygon points="25,5 40,15 40,30 25,40 10,30 10,15" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="25" cy="22" r="2" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Minimalistic orbital rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <div className="w-96 h-96 rounded-full border border-slate-400 animate-pulse" style={{animationDuration: '4s'}} />
            <div className="absolute inset-8 rounded-full border border-slate-500 animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}} />
            <div className="absolute inset-16 rounded-full border border-slate-600 animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}} />
          </div>

          {/* Scattered minimal dots */}
          <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-slate-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-slate-500 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1.5s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-slate-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '2.5s'}} />
          <div className="absolute bottom-1/5 right-1/3 w-1.5 h-1.5 bg-slate-500 rounded-full opacity-25 animate-pulse" style={{animationDelay: '3s'}} />
          <div className="absolute top-2/5 right-2/5 w-2 h-2 bg-slate-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '4s'}} />

          {/* Interactive line connections */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="80%" y1="30%" x2="20%" y2="70%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3,3">
              <animate attributeName="stroke-dashoffset" values="0;6" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4,4">
              <animate attributeName="stroke-dashoffset" values="0;8" dur="4s" repeatCount="indefinite" />
            </line>
          </svg>

          {/* Subtle data visualization elements */}
          <div className="absolute top-1/4 right-1/5 opacity-15">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <rect x="5" y="25" width="3" height="10" fill="#e2e8f0" opacity="0.6">
                <animate attributeName="height" values="10;15;10" dur="2s" repeatCount="indefinite" />
              </rect>
              <rect x="12" y="20" width="3" height="15" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="height" values="15;20;15" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              </rect>
              <rect x="19" y="15" width="3" height="20" fill="#e2e8f0" opacity="0.6">
                <animate attributeName="height" values="20;25;20" dur="3s" repeatCount="indefinite" begin="1s" />
              </rect>
              <rect x="26" y="22" width="3" height="13" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="height" values="13;18;13" dur="2.2s" repeatCount="indefinite" begin="1.5s" />
              </rect>
            </svg>
          </div>

          <div className="absolute bottom-1/4 left-1/5 opacity-15">
            <svg width="35" height="35" viewBox="0 0 35 35">
              <path d="M5 25 L15 15 L25 20 L30 10" fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.6" />
              <circle cx="5" cy="25" r="2" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="15" cy="15" r="2" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <circle cx="25" cy="20" r="2" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="30" cy="10" r="2" fill="#e2e8f0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
              </circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-300' 
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              <p className="font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-50 flex justify-end items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link 
            href="/" 
            className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">

          {/* Two-column layout for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Column - Branding & Features */}
            <div className="hidden lg:block">
              <div className="max-w-lg mx-auto">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center mb-6">
                    <ThorxLogo size="2xl" className="text-slate-200" />
                  </div>
                  <h1 className="text-4xl font-bold text-slate-200 mb-4">
                    {isLogin ? 'Welcome Back' : 'Join the Cosmic Revolution'}
                  </h1>
                  <p className="text-lg text-slate-400">
                    {isLogin ? 'Continue your journey through the digital universe' : 'Start your journey in the digital earning ecosystem'}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-slate-200 font-medium">Secure Platform</h3>
                      <p className="text-slate-400 text-sm">Bank-level encryption and security</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-slate-200 font-medium">Trusted Community</h3>
                      <p className="text-slate-400 text-sm">Join thousands of active users</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-slate-200 font-medium">Cosmic Experience</h3>
                      <p className="text-slate-400 text-sm">Immersive digital earning journey</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-slate-200">10K+</div>
                    <div className="text-sm text-slate-400">Active Users</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-slate-200">$50K+</div>
                    <div className="text-sm text-slate-400">Total Earnings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">

              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-200 mb-2">
                  {isLogin ? 'Welcome Back' : 'Join the Journey'}
                </h1>
                <p className="text-slate-400 mb-6">
                  {isLogin ? 'Sign in to your cosmic account' : 'Create your account and explore the digital universe'}
                </p>

                {/* Elegant Divider */}
                <div className="flex items-center justify-center space-x-2 mb-8">
                  <div className="h-px w-12 bg-slate-600"></div>
                  <Star className="w-4 h-4 text-slate-500" />
                  <div className="h-px w-12 bg-slate-600"></div>
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-slate-700/50">

            {/* Form Toggle */}
            <div className="flex bg-slate-800/50 rounded-lg p-1 mb-8 gap-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                  isLogin 
                    ? 'bg-slate-700 text-slate-200 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-slate-700 text-slate-200 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name Fields (Sign Up Only) */}
              {!isLogin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input
                        type="text"
                        value={formData.firstName || ''}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                          errors.firstName 
                            ? 'border-red-400' 
                            : 'border-slate-600'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input
                        type="text"
                        value={formData.lastName || ''}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                          errors.lastName 
                            ? 'border-red-400' 
                            : 'border-slate-600'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full pl-10 pr-10 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                      errors.email 
                        ? 'border-red-400' 
                        : emailValidation.result && !emailValidation.result.isValid
                        ? 'border-yellow-400'
                        : emailValidation.result && emailValidation.result.isValid && emailValidation.result.score >= 80
                        ? 'border-green-400'
                        : 'border-slate-600'
                    }`}
                    placeholder="john@example.com"
                  />

                  {/* Email Validation Status Icon */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {emailValidation.isValidating ? (
                      <div className="animate-spin w-4 h-4 border-2 border-slate-500 border-t-slate-300 rounded-full"></div>
                    ) : emailValidation.result && formData.email.length > 3 ? (
                      emailValidation.result.isValid ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )
                    ) : null}
                  </div>
                </div>

                {/* Email Validation Messages */}
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}

                {/* Email Quality Score */}
                {emailValidation.result && !errors.email && formData.email.length > 3 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Email Quality Score</span>
                      <span className={`font-medium ${
                        emailValidation.result.score >= 80 ? 'text-green-400' :
                        emailValidation.result.score >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {emailValidation.result.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          emailValidation.result.score >= 80 ? 'bg-green-400' :
                          emailValidation.result.score >= 60 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${emailValidation.result.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Email Suggestions */}
                {emailValidation.showSuggestion && emailValidation.result.suggestions && (
                  <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-blue-300 text-sm font-medium">Suggestion:</p>
                        <p className="text-blue-200 text-sm">{emailValidation.result.suggestions}</p>
                        <button
                          type="button"
                          onClick={() => {
                            const suggestion = emailValidation.result.suggestions;
                            if (suggestion) {
                              const suggestedEmail = suggestion.split(' ')[3]; // Extract email from "Did you mean email?"
                              if (suggestedEmail) {
                                setFormData({...formData, email: suggestedEmail});
                              }
                            }
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm underline mt-1"
                        >
                          Use this suggestion
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Warnings */}
                {emailValidation.result && emailValidation.result.warnings.length > 0 && !errors.email && (
                  <div className="mt-2">
                    {emailValidation.result.warnings.map((warning, index) => (
                      <p key={index} className="text-yellow-400 text-sm flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {warning}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                      errors.password 
                        ? 'border-red-400' 
                        : 'border-slate-600'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}

                {/* Password Strength Indicator (Sign Up Only) */}
                {!isLogin && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Password Strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength < 25 ? 'text-red-400' :
                        passwordStrength < 50 ? 'text-yellow-400' :
                        passwordStrength < 75 ? 'text-blue-400' :
                        'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword || ''}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                        errors.confirmPassword 
                          ? 'border-red-400' 
                          : 'border-slate-600'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Remember Me (Sign In Only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                      className="w-4 h-4 text-slate-600 bg-slate-700 border-slate-600 rounded focus:ring-slate-500"
                    />
                    <span className="ml-2 text-sm text-slate-300">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded px-2 py-1 text-sm font-medium underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-200 rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {isLogin ? (
                <>
                  <Link
                    href="/team/login"
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 inline-flex items-center gap-3 text-sm font-medium"
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>Are You a Team Member?</span>
                  </Link>
                  <span className="text-slate-400 text-sm">or</span>
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 inline-flex items-center gap-3 text-sm font-medium"
                  >
                    <span>Sign up</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/team/login"
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 inline-flex items-center gap-3 text-sm font-medium"
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>Are You a Team Member?</span>
                  </Link>
                  <span className="text-slate-400 text-sm">or</span>
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 inline-flex items-center gap-3 text-sm font-medium"
                  >
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2 text-slate-500">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Star className="w-4 h-4" />
                <span className="text-xs">Trusted</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">Cosmic</span>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Verification Modal removed - now using dedicated team login page */}
    </div>
  );
};

export default AuthPage;