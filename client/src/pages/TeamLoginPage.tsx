import { useState } from 'react';
import { useLocation } from 'wouter';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { ThorxLogo } from '@/components/ThorxLogo';
import { Eye, EyeOff, AlertCircle, ChevronDown, Users } from 'lucide-react';

const TeamLoginPage = () => {
  const [_, setLocation] = useLocation();
  const { login, isLoading } = useTeamAuth();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Team members data from database
  const teamMembers = [
    { id: 1, name: 'Aon Imran', role: 'CEO' },
    { id: 2, name: 'Zain Abbas', role: 'Marketing' },
    { id: 3, name: 'Zohaib Nadeem', role: 'Social Media' },
    { id: 4, name: 'Prof. Muhammad Jahangeer', role: 'Admin' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.password) {
      setError('Please select your name and enter password');
      return;
    }

    console.log('Attempting login with:', { name: formData.name, passwordLength: formData.password.length });
    const success = await login(formData.name, formData.password);
    console.log('Login result:', success);
    
    if (success) {
      console.log('Login successful, redirecting to dashboard');
      setLocation('/team/dashboard');
    } else {
      console.log('Login failed, showing error');
      setError('Invalid credentials. Please check your password.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 w-full max-w-md border border-slate-700">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ThorxLogo size="xl" className="text-slate-200" />
          </div>
          <h1 className="text-2xl font-bold text-slate-200 mb-2">Team Access Portal</h1>
          <p className="text-slate-400 text-sm">Sign in to access the team dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Select Team Member
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <select
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-10 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Choose your name...</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.name}>
                    {member.name} ({member.role})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.name && (
              <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500/20 rounded-lg flex items-center justify-between">
                <p className="text-blue-300 text-xs">
                  <strong>Password:</strong> {teamMembers.find(m => m.name === formData.name)?.passwordHint}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const password = teamMembers.find(m => m.name === formData.name)?.passwordHint;
                    if (password) {
                      navigator.clipboard.writeText(password);
                      setFormData(prev => ({ ...prev, password }));
                    }
                  }}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                >
                  Copy & Fill
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Contact CEO for account issues
          </p>
          <button
            onClick={() => setLocation('/')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline"
          >
            ← Back to Main Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamLoginPage;