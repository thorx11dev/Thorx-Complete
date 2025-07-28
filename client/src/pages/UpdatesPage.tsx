import { Link } from 'wouter';
import { ArrowLeft, Calendar, Tag, Rocket, Satellite, Globe, ChevronRight, Star, Zap, Shield, Smartphone, MessageCircle, Gift, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThorxLogo from '../components/ThorxLogo';

const UpdatesPage = () => {
  const [isUpcomingVisible, setIsUpcomingVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animate upcoming section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsUpcomingVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const upcomingSection = document.getElementById('upcoming-section');
    if (upcomingSection) {
      observer.observe(upcomingSection);
    }
    
    return () => {
      if (upcomingSection) {
        observer.unobserve(upcomingSection);
      }
    };
  }, []);

  const handleNewsletterSubscribe = () => {
    // Navigate to auth page with email pre-filled
    window.location.href = `/auth?email=${encodeURIComponent(email)}`;
  };

  const upcomingFeatures = [
    {
      id: 1,
      title: "Thorx Mobile Application",
      description: "Native mobile app with full platform functionality, push notifications, and offline capability for seamless earning on-the-go.",
      icon: Smartphone,
      status: "In Development",
      timeline: "Q2 2025",
      features: [
        "Native iOS and Android apps",
        "Push notifications for new tasks",
        "Offline task completion",
        "Enhanced mobile UI/UX",
        "Biometric authentication"
      ],
      color: "bg-blue-500/15",
      accentColor: "bg-blue-500",
      textColor: "text-blue-300"
    },
    {
      id: 2,
      title: "Thorx Telegram Bot",
      description: "Integrated Telegram bot for instant notifications, quick task management, and seamless communication within the Thorx ecosystem.",
      icon: MessageCircle,
      status: "Coming Soon",
      timeline: "Q3 2025",
      features: [
        "Instant task notifications",
        "Quick task completion",
        "Earnings tracking",
        "Community features",
        "Automated reporting"
      ],
      color: "bg-green-500/15",
      accentColor: "bg-green-500",
      textColor: "text-green-300"
    },
    {
      id: 3,
      title: "Thorx Giveaway Technologies",
      description: "Advanced giveaway platform with automated distribution, fraud prevention, and engaging user participation mechanics.",
      icon: Gift,
      status: "Planning",
      timeline: "Q4 2025",
      features: [
        "Automated prize distribution",
        "Fraud detection system",
        "Social media integration",
        "Participation tracking",
        "Custom giveaway creation"
      ],
      color: "bg-purple-500/15",
      accentColor: "bg-purple-500",
      textColor: "text-purple-300"
    }
  ];

  const updates = [
    {
      version: "v2.4.0",
      date: "January 15, 2025",
      type: "Major Update",
      title: "Enhanced Analytics Dashboard",
      description: "Introducing advanced analytics with real-time insights, predictive modeling, and customizable reporting tools to help you maximize your earning potential.",
      features: [
        "Real-time performance metrics",
        "Predictive earning analytics",
        "Custom report builder",
        "Export capabilities"
      ],
      icon: Star
    },
    {
      version: "v2.3.5",
      date: "January 8, 2025",
      type: "Security Update",
      title: "Advanced Security Enhancements",
      description: "Major security improvements including enhanced encryption, two-factor authentication, and advanced fraud detection systems.",
      features: [
        "Enhanced encryption protocols",
        "Two-factor authentication",
        "Advanced fraud detection",
        "Security audit improvements"
      ],
      icon: Shield
    },
    {
      version: "v2.3.0",
      date: "December 28, 2024",
      type: "Feature Release",
      title: "Lightning-Fast Performance Boost",
      description: "Significant performance improvements with faster load times, optimized algorithms, and enhanced user experience across all platforms.",
      features: [
        "50% faster load times",
        "Optimized task algorithms",
        "Enhanced mobile experience",
        "Improved server response"
      ],
      icon: Zap
    },
    {
      version: "v2.2.8",
      date: "December 20, 2024",
      type: "Bug Fix",
      title: "UI/UX Improvements",
      description: "Various interface improvements and bug fixes to enhance user experience and platform stability.",
      features: [
        "Interface refinements",
        "Navigation improvements",
        "Bug fixes and stability",
        "Mobile optimization"
      ],
      icon: Rocket
    },
    {
      version: "v2.2.0",
      date: "December 12, 2024",
      type: "Major Update",
      title: "Task Management Revolution",
      description: "Complete overhaul of task management system with smart prioritization, automated scheduling, and enhanced productivity tools.",
      features: [
        "Smart task prioritization",
        "Automated scheduling",
        "Progress tracking",
        "Productivity insights"
      ],
      icon: Star
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Major Update':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Feature Release':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Security Update':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Bug Fix':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/3 left-1/3"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-updates" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-updates)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-2/3 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Globe className="w-12 h-12 text-slate-600" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <ThorxLogo size="md" logoColor="#e2e8f0" />
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link 
            to="/" 
            className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-200 mb-6 leading-tight">
            <span className="block text-slate-400">Latest</span>
            <span>Updates</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Stay up to date with the latest features, improvements, and enhancements to the Thorx platform.
          </p>
        </div>
      </div>

      {/* Updates Timeline */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-slate-700 transition-colors shadow-lg">
                      <update.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">
                        {update.version}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(update.type)}`}>
                        {update.type}
                      </span>
                      <div className="flex items-center text-slate-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {update.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-200 mb-3 group-hover:text-white transition-colors">
                      {update.title}
                    </h3>
                    
                    <p className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {update.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {update.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Features Section */}
      <div id="upcoming-section" className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center space-x-3 mb-6 transition-all duration-1000 ${isUpcomingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl border border-slate-600 shadow-lg">
                <Sparkles className="w-6 h-6 text-slate-200" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-200">
                Upcoming Features
              </h2>
            </div>
            
            <p className={`text-xl text-slate-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isUpcomingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Exciting new features coming to Thorx that will revolutionize your digital earning experience. Stay tuned for these game-changing additions.
            </p>
          </div>

          {/* Upcoming Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === feature.id;
              const animationDelay = `${600 + index * 200}ms`;
              
              return (
                <div
                  key={feature.id}
                  className={`relative group transition-all duration-1000 ${isUpcomingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: animationDelay }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Main Card */}
                  <div className={`relative h-full bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 transition-all duration-500 hover:border-slate-600 hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-slate-900/50 hover:scale-[1.02] ${feature.color}`}>
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${feature.accentColor} bg-slate-900/50 border-slate-600 text-slate-300`}>
                        <Clock className="w-3 h-3" />
                        <span>{feature.status}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-all duration-500 ${feature.color} border-slate-600 group-hover:border-slate-500 group-hover:scale-110`}>
                        <Icon className={`w-8 h-8 transition-all duration-500 ${feature.textColor} group-hover:scale-110`} />
                      </div>
                      
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-20 ${feature.accentColor} blur-xl`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      {/* Timeline */}
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className={`font-medium ${feature.textColor}`}>
                          Expected: {feature.timeline}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className={`mt-6 space-y-2 transition-all duration-500 ${isHovered ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                      <div className="border-t border-slate-700 pt-4">
                        <h4 className="text-sm font-medium text-slate-300 mb-3">Key Features:</h4>
                        <div className="space-y-2">
                          {feature.features.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-3">
                              <ChevronRight className="w-3 h-3 text-slate-500" />
                              <span className="text-xs text-slate-400">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Arrow */}
                    <div className={`absolute bottom-6 right-6 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                      <ArrowUpRight className={`w-5 h-5 ${feature.textColor}`} />
                    </div>

                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 ${isHovered ? feature.accentColor.replace('bg-', 'border-') : ''}`} />
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${feature.accentColor} ${isHovered ? 'opacity-60' : 'opacity-0'}`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                          animationDelay: `${i * 0.5}s`,
                          animation: isHovered ? 'float 3s ease-in-out infinite' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isUpcomingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-slate-400 mb-6">
              Want to be the first to know when these features launch?
            </p>
            <div className="text-slate-300">
              Subscribe to our newsletter below to stay updated!
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div id="newsletter" className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Stay Updated
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Never miss an update. Get notified about new features, improvements, and important announcements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
            />
            <button 
              onClick={handleNewsletterSubscribe}
              disabled={!email}
              className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-800/50 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-4 hover:scale-105 transition-all duration-300">
              <ThorxLogo size="md" logoColor="#e2e8f0" />
            </Link>
            <p className="text-slate-400">Navigate the digital universe with confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpdatesPage;