import { Link } from 'wouter';
import { ArrowLeft, Target, Users, Globe, Award, Heart, Rocket, Satellite, ChevronRight, Star, Shield, Zap } from 'lucide-react';
import { useEffect } from 'react';
import ThorxLogo from '../components/ThorxLogo';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in digital earning platforms, introducing cutting-edge features and technologies."
    },
    {
      icon: Users,
      title: "Community",
      description: "Our users are at the heart of everything we do. We build features based on real feedback and genuine needs."
    },
    {
      icon: Shield,
      title: "Security",
      description: "We prioritize the safety and security of our users' data and earnings above all else, implementing industry-leading protection."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our platform, from user experience to customer support."
    }
  ];

  const team = [
    {
      name: "Aon Imran",
      role: "CEO & Founder of Thorx",
      description: "Visionary leader driving the future of digital earning platforms. Passionate about empowering individuals through innovative technology solutions.",
      image: "AI"
    },
    {
      name: "Zohaib Nadeem",
      role: "Social Media Ambassador",
      description: "Expert in building online communities and driving engagement across all social platforms. Connects Thorx with users worldwide.",
      image: "ZN"
    },
    {
      name: "Zain Abbas",
      role: "Marketing Maestro of Thorx",
      description: "Strategic marketing leader focused on growth and brand development. Specializes in digital marketing and user acquisition strategies.",
      image: "ZA"
    },
    {
      name: "Prof. Muhammad Jahangeer",
      role: "Admin of Thorx",
      description: "Administrative leader ensuring smooth operations and platform excellence. Academic background with extensive management experience.",
      image: "MJ"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/4 right-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-about" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-about)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-2/3 right-1/3 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Globe className="w-12 h-12 text-slate-600" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <ThorxLogo size="md" className="text-slate-200 group-hover:text-white transition-colors" />
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
            <span className="block text-slate-400">About</span>
            <span>Thorx</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            We're on a mission to revolutionize digital earning opportunities and empower individuals worldwide to achieve financial independence through technology.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 p-12 rounded-2xl border border-slate-700 backdrop-blur-sm text-center">
            <h2 className="text-3xl font-bold text-slate-200 mb-6">Our Mission</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              To create a cosmic-scale platform that democratizes access to digital earning opportunities, 
              providing tools, resources, and community support that enable everyone to build sustainable 
              income streams in the digital economy. We believe that with the right platform and guidance, 
              anyone can navigate the digital universe and achieve their financial goals.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-200 mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <value.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 mb-4 group-hover:text-white transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-200 mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 text-center"
              >
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <span className="text-2xl font-bold text-slate-300 group-hover:text-white transition-colors">
                    {member.image}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-slate-400 font-semibold mb-4 group-hover:text-slate-300 transition-colors">
                  {member.role}
                </p>
                
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MVP Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-200 mb-6">
              Minimum Viable Product
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our MVP represents the foundation of Thorx - a carefully crafted set of core features designed to deliver immediate value while paving the way for future innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* MVP Vision */}
            <div className="space-y-8">
              <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-200">Core Vision</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  To create a seamless, intuitive platform that connects opportunity seekers with digital earning possibilities. Our MVP focuses on essential functionality that delivers real value from day one.
                </p>
              </div>

              <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-200">Launch Strategy</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Built with scalability in mind, our MVP establishes the foundation for rapid feature expansion while maintaining performance and user experience excellence.
                </p>
              </div>
            </div>

            {/* MVP Features Grid */}
            <div className="relative">
              <div className="absolute inset-0 bg-slate-800/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">Core Features</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Users, title: "User Management", desc: "Secure authentication & profiles" },
                    { icon: Award, title: "Task System", desc: "Intuitive task creation & tracking" },
                    { icon: Shield, title: "Secure Payments", desc: "Reliable payout processing" },
                    { icon: Globe, title: "Global Access", desc: "Worldwide platform availability" }
                  ].map((feature, index) => (
                    <div key={index} className="group">
                      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-900/70 hover:scale-105">
                        <feature.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors mb-4" />
                        <h4 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MVP Progress Timeline */}
          <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">Development Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  phase: "Phase 1",
                  title: "Foundation",
                  status: "Completed",
                  progress: 100,
                  features: ["User Authentication", "Basic Dashboard", "Profile Management"],
                  color: "bg-green-500"
                },
                {
                  phase: "Phase 2",
                  title: "Core Features",
                  status: "In Progress",
                  progress: 85,
                  features: ["Task Management", "Earning System", "Payment Integration"],
                  color: "bg-blue-500"
                },
                {
                  phase: "Phase 3",
                  title: "Enhancement",
                  status: "Planning",
                  progress: 25,
                  features: ["Analytics Dashboard", "Mobile App", "Advanced Features"],
                  color: "bg-slate-500"
                }
              ].map((phase, index) => (
                <div key={index} className="group">
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-900/70 hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {phase.phase}
                        </h4>
                        <p className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">
                          {phase.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                          {phase.status}
                        </div>
                        <div className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                          {phase.progress}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${phase.color}`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                    
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${phase.progress > 50 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                          <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-200 mb-12 text-center">By the Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "$2M+", label: "Total Earnings" },
              { value: "50K+", label: "Tasks Completed" },
              { value: "99.9%", label: "Platform Uptime" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Join Our Mission
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Be part of the cosmic revolution in digital earning. Start your journey with Thorx today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth" 
              className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 inline-flex items-center justify-center gap-3 group hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95"
            >
              <span>Get Started Free</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
            </Link>
            
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 px-8 py-4 rounded-xl font-bold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-700/30 transform active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-800/50 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-4 hover:scale-105 transition-all duration-300">
              <ThorxLogo size="lg" className="text-slate-200 group-hover:text-white transition-colors" />
            </Link>
            <p className="text-slate-400">Navigate the digital universe with confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;