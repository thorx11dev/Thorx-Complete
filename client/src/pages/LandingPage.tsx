import { Link } from 'wouter';
import { ArrowRight, Globe, Shield, Users, TrendingUp, DollarSign, Activity, ChevronDown, Satellite, Rocket, Target, Star, Gem, Headphones, Sparkles, Trophy, Zap } from 'lucide-react';
import { useEffect, useState, memo } from 'react';
import ThorxLogo from '../components/ThorxLogo';




const LandingPage = memo(() => {
  useEffect(() => {
    // Immediate DOM operations
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">

      
      {/* Hero Section - Mobile Optimized Container */}
      <div className="relative h-screen cosmic-gradient-primary min-h-[100dvh] sm:min-h-screen hero-mobile-container">
        {/* Professional Cosmic Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Elegant orbital rings */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-slate-700/30 animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full border border-slate-600/20 animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 rounded-full border border-slate-500/15 animate-pulse" style={{animationDelay: '2s'}} />
          
          {/* Sophisticated gradient orbs */}
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl animate-pulse" style={{animationDelay: '1.5s'}} />
          
          {/* Refined constellation pattern */}
          <div className="absolute inset-0 opacity-25">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="professionalConstellation" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                  <circle cx="75" cy="75" r="1.5" fill="#e2e8f0" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="225" cy="150" r="1" fill="#cbd5e1" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="1s" />
                  </circle>
                  <circle cx="150" cy="225" r="1.2" fill="#e2e8f0" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
                  </circle>
                  <line x1="75" y1="75" x2="225" y2="150" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.15" />
                  <line x1="225" y1="150" x2="150" y2="225" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.15" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#professionalConstellation)"/>
            </svg>
          </div>
          
          {/* Elegant light rays */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-slate-400/20 to-transparent transform -translate-x-1/2 rotate-12" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-400/15 to-transparent transform -translate-x-1/2 -rotate-12" />
        </div>

        {/* Professional Floating Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 opacity-30 animate-spin" style={{ animationDuration: '60s' }}>
            <Satellite className="w-8 h-8 text-slate-400" />
          </div>
          
          <div className="absolute top-3/4 right-1/4 opacity-25 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
            <Globe className="w-12 h-12 text-slate-400" />
          </div>
          
          {/* Refined geometric shapes */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute opacity-15 animate-pulse"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 15)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            >
              <div className="w-4 h-4 border border-slate-500 rounded-sm" />
            </div>
          ))}
          
          {/* Additional professional elements */}
          <div className="absolute top-1/2 right-1/4 opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>
            <Star className="w-4 h-4 text-slate-300" />
          </div>
          
          <div className="absolute bottom-1/3 right-1/2 opacity-25 animate-pulse" style={{ animationDelay: '2s' }}>
            <Sparkles className="w-5 h-5 text-slate-300" />
          </div>
        </div>

        {/* Professional Navigation - Mobile Optimized */}
        <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 hero-mobile-nav">
          <div className="cosmic-fade-in">
            <ThorxLogo size="md" logoColor="#e2e8f0" />
          </div>
          {/* Mobile-optimized navigation buttons with improved touch targets */}
          <div className="flex items-center gap-2 sm:gap-6 cosmic-fade-in" style={{animationDelay: '0.3s'}}>
            <Link 
              to="/auth" 
              className="text-slate-300 hover:text-white transition-all duration-300 relative group text-sm sm:text-base font-medium px-2 py-2 sm:px-0 sm:py-0"
            >
              Sign In
              <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/auth" 
              className="cosmic-btn-primary px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold min-h-[40px] flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Professional Hero Content - Mobile Optimized Layout */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 -mt-12 sm:-mt-16 md:-mt-20 hero-mobile-content">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
            {/* Left side - Content - Mobile Layout Optimization */}
            <div className="text-center lg:text-left px-2 sm:px-0">
              {/* Mobile-optimized title section with improved spacing */}
              <div className="mb-6 sm:mb-8 md:mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight cosmic-slide-up text-slate-200 font-semibold hero-mobile-title">
                  <span className="block mb-2">Explore the</span>
                  <span className="block font-medium">Digital Universe</span>
                </h1>
              </div>
              
              {/* Mobile-optimized subtitle with better line height and spacing */}
              <p className="text-lg sm:text-xl md:text-xl text-slate-300 mb-8 sm:mb-10 md:mb-8 max-w-lg mx-auto lg:mx-0 cosmic-slide-up leading-relaxed px-4 sm:px-0 hero-mobile-subtitle" style={{animationDelay: '0.3s'}}>
                Navigate through cosmic earning opportunities with Thorx. A professional platform designed for the modern digital explorer.
              </p>
              
              {/* Mobile-optimized button layout with enhanced spacing and touch targets */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center lg:justify-start cosmic-scale-in px-4 sm:px-0 hero-mobile-buttons" style={{animationDelay: '0.6s'}}>
                <Link 
                  to="/auth" 
                  className="cosmic-btn-primary px-8 sm:px-8 py-4 sm:py-4 rounded-xl font-bold inline-flex items-center justify-center gap-3 sm:gap-3 group text-base sm:text-base min-h-[56px] w-full sm:w-auto"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 sm:w-5 h-5 sm:h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
                </Link>
                
                <Link 
                  to="/auth" 
                  className="cosmic-btn-secondary px-8 sm:px-8 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-base text-center min-h-[56px] w-full sm:w-auto"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-60 md:w-72 lg:w-80 h-60 md:h-72 lg:h-80 opacity-60">
                  <defs>
                    <pattern id="starPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="#64748b" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="25" cy="15" r="0.5" fill="#64748b" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
                      </circle>
                    </pattern>
                    <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  
                  <rect width="100%" height="100%" fill="url(#starPattern)" opacity="0.3"/>
                  
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="80" 
                    fill="none" 
                    stroke="#475569" 
                    strokeWidth="1" 
                    opacity="0.5"
                  >
                    <animate 
                      attributeName="stroke-dasharray" 
                      values="0 502;502 0;0 502" 
                      dur="8s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  
                  <circle cx="200" cy="200" r="4" fill="url(#centralGlow)">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1;1.5;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 200 200;360 200 200"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                    <circle cx="280" cy="200" r="2" fill="#64748b" opacity="0.8"/>
                  </g>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '60s' }}>
                  <Rocket className="w-8 h-8 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer">
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </div>

      {/* RECREATED FEATURES SECTION - Neo-Cosmic Design */}
      <div className="relative py-32 bg-slate-800 overflow-hidden">

        
        {/* Neo-Cosmic Background Environment */}
        <div className="absolute inset-0">
          {/* Quantum field grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {[...Array(96)].map((_, i) => (
                <div
                  key={i}
                  className="border-r border-b border-slate-600/30 relative"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {Math.random() > 0.85 && (
                    <div className="absolute inset-0 bg-slate-500/20 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Floating holographic elements */}
          <div className="absolute top-16 left-20 w-40 h-40 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '30s' }}>
              <defs>
                <linearGradient id="holoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              <polygon points="50,10 90,90 10,90" fill="url(#holoGrad1)" stroke="#64748b" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#64748b" strokeWidth="0.5" opacity="0.6" />
            </svg>
          </div>
          
          <div className="absolute bottom-24 right-16 w-32 h-32 opacity-15">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
              <defs>
                <radialGradient id="holoGrad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#holoGrad2)" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </div>
          
          {/* Cosmic energy streams */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-slate-600/30 opacity-60"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-slate-500/20 opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Professional Title Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6 cosmic-slide-up">
              <h2 className="text-5xl md:text-6xl mb-4 relative text-slate-200 font-semibold">
                Cosmic Features
              </h2>
            </div>
            <p className="text-xl max-w-3xl mx-auto text-slate-300 cosmic-slide-up leading-relaxed" style={{animationDelay: '0.2s'}}>
              Discover the next-generation tools that make digital earning effortless and intuitive
            </p>
            
            {/* Elegant accent line */}
            <div className="mt-8 cosmic-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-24 h-px bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>
          </div>

          {/* Professional Features Grid - Mobile Layout Matched to Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-16">
            {[
              {
                icon: Satellite,
                title: "Task Orchestration",
                description: "Advanced AI-powered task management with intelligent prioritization and automated workflows",
                delay: "0.8s",
                badge: "AI-Powered"
              },
              {
                icon: Globe,
                title: "Global Analytics", 
                description: "Real-time insights and comprehensive reporting across all your earning channels worldwide",
                delay: "1s",
                badge: "Real-Time"
              },
              {
                icon: Shield,
                title: "Quantum Security",
                description: "Military-grade encryption and quantum-resistant protocols protecting your valuable data",
                delay: "1.2s",
                badge: "Enterprise"
              },
              {
                icon: Zap,
                title: "Instant Rewards",
                description: "Get paid instantly upon task completion with our lightning-fast payment processing system",
                delay: "1.4s",
                badge: "Fast Pay"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="cosmic-scale-in group"
                style={{ animationDelay: feature.delay }}
              >
                {/* Professional Cosmic Feature Card */}
                <div className="relative cosmic-hover-lift">
                  
                  {/* Main Card Structure - Mobile Responsive */}
                  <div className="relative p-6 sm:p-10 rounded-3xl overflow-hidden cosmic-glass min-h-[300px] sm:min-h-[400px] flex flex-col justify-between mobile-card-container">
                    
                    {/* Elegant background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    {/* Professional particle effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                      <div className="absolute top-0 left-0 w-full h-full">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: '3s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Professional Icon Container - Mobile Responsive */}
                    <div className="relative mb-6 sm:mb-8 z-10">
                      <div className="relative mx-auto w-16 h-16 sm:w-24 sm:h-24 mobile-card-icon">
                        {/* Main icon container */}
                        <div className="w-16 h-16 sm:w-24 sm:h-24 cosmic-glass-light rounded-full 
                                      flex items-center justify-center 
                                      transition-all duration-500 group-hover:bg-slate-700/90 
                                      shadow-2xl group-hover:shadow-blue-500/20
                                      transform-gpu group-hover:scale-110 group-hover:rotate-6
                                      border-2 border-slate-600/40 group-hover:border-blue-400/60
                                      relative overflow-hidden">
                          
                          {/* Main icon */}
                          <feature.icon className="w-8 h-8 sm:w-12 sm:h-12 text-slate-300 group-hover:text-white 
                                                 transition-all duration-500 relative z-10
                                                 group-hover:scale-110 group-hover:drop-shadow-lg" />
                          
                          {/* Elegant orbital ring */}
                          <div className="absolute inset-0 border border-blue-400/30 rounded-full 
                                        scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 
                                        transition-all duration-500"></div>
                        </div>
                        
                        {/* Professional badge */}
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 
                                      transition-all duration-300 delay-200">
                          <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500/20 backdrop-blur-sm text-blue-300 
                                         text-xs font-medium rounded-full border border-blue-400/40">
                            {feature.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Professional Content - Mobile Responsive */}
                    <div className="space-y-4 sm:space-y-6 relative z-10 text-center mobile-card-content">
                      <h3 className="text-lg sm:text-2xl font-bold text-white relative
                                   transition-all duration-500 group-hover:text-blue-100
                                   group-hover:scale-105 cosmic-text-shadow mobile-card-title">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-lg
                                  transition-all duration-500 group-hover:text-slate-200
                                  group-hover:scale-105 mobile-card-description">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Elegant accent line */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
                                  from-transparent via-blue-400/50 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* CORNER ACCENTS */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-slate-600/40 
                                  opacity-0 group-hover:opacity-100 group-hover:border-slate-500/60 
                                  transition-all duration-1000"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-slate-600/40 
                                  opacity-0 group-hover:opacity-100 group-hover:border-slate-500/60 
                                  transition-all duration-1000"></div>
                  </div>
                  

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        {/* Enhanced Background with Cosmic Elements */}
        <div className="absolute inset-0">
          {/* Animated constellation pattern */}
          <div className="stars absolute inset-0 opacity-20"></div>
          <div className="stars2 absolute inset-0 opacity-15"></div>
          
          {/* Floating cosmic debris */}
          <div className="absolute top-10 right-20 w-2 h-2 bg-slate-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-slate-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
          
          {/* Large cosmic ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin" style={{ animationDuration: '60s' }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="#64748b" strokeWidth="0.5" strokeDasharray="5,5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#64748b" strokeWidth="0.3" strokeDasharray="3,3" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 cosmic-slide-up">
              <h2 className="text-4xl md:text-5xl mb-4 relative text-slate-200 font-semibold">
                Why Choose Thorx?
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-slate-300 cosmic-slide-up" style={{animationDelay: '0.2s'}}>
              Experience the advantages that set us apart
            </p>
          </div>

          {/* NEW COSMIC FEATURES GRID - Mobile Layout Matched to Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Rocket,
                title: "Lightning Fast",
                description: "Complete tasks in record time with our optimized workflow",
                delay: "0.6s",
                color: "bg-yellow-500/15",
                accentColor: "yellow",
                constellation: "🚀"
              },
              {
                icon: Gem,
                title: "Premium Quality",
                description: "Access to high-paying, verified opportunities only",
                delay: "0.8s",
                color: "bg-blue-500/15",
                accentColor: "blue",
                constellation: "💎"
              },
              {
                icon: Trophy,
                title: "Certified Success",
                description: "Join thousands of successful earners in our community",
                delay: "1s",
                color: "bg-green-500/15",
                accentColor: "green",
                constellation: "🏆"
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Round-the-clock assistance whenever you need help",
                delay: "1.2s",
                color: "bg-purple-500/15",
                accentColor: "purple",
                constellation: "🎧"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="cosmic-scale-in group"
                style={{ animationDelay: feature.delay }}
              >
                {/* Professional benefit card */}
                <div className="relative cosmic-hover-lift">
                  
                  {/* Main card container - Mobile Responsive */}
                  <div className="p-6 sm:p-8 rounded-2xl relative overflow-hidden cosmic-glass text-center min-h-[250px] sm:min-h-[300px] flex flex-col justify-center mobile-card-container">
                    
                    {/* Elegant background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Professional icon - Mobile Responsive */}
                    <div className="relative mb-4 sm:mb-6 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 cosmic-glass-light rounded-full 
                                    flex items-center justify-center mx-auto 
                                    transition-all duration-500 
                                    shadow-lg group-hover:shadow-blue-500/20
                                    transform-gpu group-hover:scale-110 group-hover:rotate-6
                                    relative overflow-hidden border-2 border-slate-600/30 
                                    group-hover:border-blue-400/50 mobile-card-icon">
                        
                        {/* Energy field */}
                        <div className="absolute inset-0 bg-blue-500/20 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        {/* Clean icon */}
                        <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 group-hover:text-white 
                                             transition-all duration-500 relative z-10" />
                        
                        {/* Elegant ring */}
                        <div className="absolute inset-0 border border-blue-400/30 rounded-full 
                                      scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 
                                      transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Professional content - Mobile Responsive */}
                    <div className="space-y-3 sm:space-y-4 relative z-10 mobile-card-content">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 relative
                                   transition-all duration-500 group-hover:text-blue-100
                                   group-hover:scale-105 cosmic-text-shadow mobile-card-title">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm leading-relaxed
                                  transition-all duration-500 group-hover:text-slate-200
                                  group-hover:scale-105 mobile-card-description">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Elegant accent line */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
                                  from-transparent via-blue-400/50 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-24 bg-slate-800 overflow-hidden">

        {/* Enhanced Background with Data Visualization Effects */}
        <div className="absolute inset-0">
          {/* Matrix-style data streams */}
          <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-slate-600/30 to-transparent"></div>
          <div className="absolute top-0 left-32 w-px h-full bg-gradient-to-b from-transparent via-slate-500/20 to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 right-20 w-px h-full bg-gradient-to-b from-transparent via-slate-600/25 to-transparent" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating data points */}
          <div className="absolute top-16 left-1/4 w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(90deg, #64748b 1px, transparent 1px),
              linear-gradient(#64748b 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
          
          {/* Animated bar chart silhouette */}
          <div className="absolute bottom-10 left-20 opacity-10">
            <svg width="100" height="40" viewBox="0 0 100 40">
              <rect x="10" y="20" width="8" height="20" fill="#64748b" className="animate-pulse" />
              <rect x="25" y="10" width="8" height="30" fill="#64748b" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <rect x="40" y="15" width="8" height="25" fill="#64748b" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <rect x="55" y="5" width="8" height="35" fill="#64748b" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              <rect x="70" y="12" width="8" height="28" fill="#64748b" className="animate-pulse" style={{ animationDelay: '2s' }} />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 cosmic-slide-up">
              <h2 className="text-4xl md:text-5xl mb-4 relative text-slate-200 font-semibold">
                Trusted by Thousands
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-slate-300 cosmic-slide-up" style={{animationDelay: '0.2s'}}>
              Join our growing community of successful earners
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { 
                value: "10K+", 
                label: "Active Users", 
                icon: Users, 
                delay: "0.6s",
                color: "from-emerald-500/20 to-green-500/20",
                accentColor: "emerald"
              },
              { 
                value: "$2M+", 
                label: "Total Earnings", 
                icon: DollarSign, 
                delay: "0.8s",
                color: "from-yellow-500/20 to-orange-500/20",
                accentColor: "yellow"
              },
              { 
                value: "50K+", 
                label: "Tasks Completed", 
                icon: Activity, 
                delay: "1s",
                color: "from-blue-500/20 to-cyan-500/20",
                accentColor: "blue"
              },
              { 
                value: "99.9%", 
                label: "Uptime", 
                icon: Shield, 
                delay: "1.2s",
                color: "from-purple-500/20 to-pink-500/20",
                accentColor: "purple"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="cosmic-scale-in group"
                style={{ animationDelay: stat.delay }}
              >
                {/* Professional stat card */}
                <div className="relative cosmic-hover-lift">
                  
                  {/* Main card container */}
                  <div className="p-8 rounded-2xl relative overflow-hidden cosmic-glass text-center">
                    
                    {/* Elegant background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Professional icon */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 cosmic-glass-light rounded-2xl 
                                    flex items-center justify-center mx-auto 
                                    transition-all duration-500 
                                    shadow-lg group-hover:shadow-blue-500/20
                                    transform-gpu group-hover:scale-110 group-hover:rotate-6
                                    relative overflow-hidden border border-slate-600/30">
                        
                        <stat.icon className="w-8 h-8 text-slate-300 group-hover:text-white 
                                           transition-all duration-500 relative z-10" />
                        
                        {/* Elegant ring */}
                        <div className="absolute inset-0 border border-blue-400/30 rounded-2xl 
                                      scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 
                                      transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Clean value display */}
                    <div className="text-3xl font-bold text-white mb-3 relative z-10
                                  group-hover:text-blue-100 transition-all duration-500
                                  group-hover:scale-110 cosmic-text-shadow">
                      {stat.value}
                    </div>
                    
                    <div className="text-slate-300 group-hover:text-slate-200 transition-all duration-500 relative z-10
                                  group-hover:scale-105">
                      {stat.label}
                    </div>
                    
                    {/* Elegant accent line */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
                                  from-transparent via-blue-400/50 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">

        
        {/* Enhanced Background with Call-to-Action Energy */}
        <div className="absolute inset-0">
          {/* Radial energy waves */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border border-slate-700/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-4 border border-slate-600/15 rounded-full animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
            <div className="absolute inset-8 border border-slate-500/10 rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Floating action indicators */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-500/40 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-32 right-24 w-2 h-2 bg-blue-500/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-24 left-32 w-2.5 h-2.5 bg-purple-500/35 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-20 w-1.5 h-1.5 bg-yellow-500/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Gradient spotlight effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] 
                        bg-gradient-radial from-slate-800/20 via-slate-700/10 to-transparent rounded-full blur-3xl 
                        animate-pulse opacity-60"></div>
          
          {/* Cosmic particle trails */}
          <div className="absolute top-1/4 left-10 w-px h-20 bg-gradient-to-b from-slate-500/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 right-10 w-px h-16 bg-gradient-to-t from-slate-400/25 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Professional heading */}
          <div className="mb-6 cosmic-slide-up">
            <h2 className="text-4xl md:text-5xl relative text-slate-200 font-semibold">
              Ready to Start Your Journey?
            </h2>
          </div>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto cosmic-slide-up" style={{animationDelay: '0.2s'}}>
            Join thousands of users who have already discovered the power of Thorx
          </p>
          
          {/* Professional CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center cosmic-scale-in" style={{animationDelay: '0.4s'}}>
            {/* Primary CTA Button */}
            <div className="relative group">
              
              <Link 
                to="/auth" 
                className="relative cosmic-btn-primary 
                         px-10 py-4 rounded-2xl font-bold 
                         transition-all duration-500 inline-flex items-center justify-center gap-3 
                         group-hover:scale-105 group-hover:-translate-y-1
                         transform-gpu"
              >
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  Get Started Free
                </span>
                
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                
                {/* Success particles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 
                               group-hover:opacity-60 group-hover:animate-ping"
                      style={{
                        left: `${Math.cos((i * Math.PI) / 3) * 50}px`,
                        top: `${Math.sin((i * Math.PI) / 3) * 30}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '2s'
                      }}
                    ></div>
                  ))}
                </div>
              </Link>
            </div>
            
            {/* Secondary CTA Button */}
            <div className="relative group">
              
              <Link 
                to="/features" 
                className="relative cosmic-btn-secondary 
                         px-10 py-4 rounded-2xl font-semibold 
                         transition-all duration-500 inline-flex items-center justify-center gap-3
                         group-hover:scale-105 group-hover:-translate-y-1
                         transform-gpu"
              >
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 cosmic-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Start in 2 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="inline-block group">
                <div className="mb-4 group-hover:scale-105 transition-transform duration-300">
                  <ThorxLogo size="md" logoColor="#e2e8f0" />
                </div>
              </Link>
              <p className="text-slate-400 text-sm">
                Navigate the digital universe with confidence
              </p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Updates"] },
              { title: "Support", links: ["Help Center", "Contact"] },
              { title: "Company", links: ["About", "Blog"] }
            ].map((section, index) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-slate-200 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => {
                    const linkMap = {
                      "Features": "/features",
                      "Updates": "/updates",
                      "Help Center": "/help",
                      "Contact": "/contact",
                      "About": "/about",
                      "Blog": "/blog"
                    };
                    const linkPath = linkMap[link] || "#";
                    
                    return (
                      <li key={link}>
                        <Link 
                          to={linkPath} 
                          className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:translate-x-1 hover:scale-105 inline-block relative group"
                        >
                          <span className="relative z-10">{link}</span>
                          <span className="absolute inset-0 bg-slate-700/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -inset-1"></span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 Thorx. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default LandingPage;