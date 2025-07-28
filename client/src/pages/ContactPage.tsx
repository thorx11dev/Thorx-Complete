import { Link } from 'wouter';
import { ArrowLeft, Mail, MapPin, Clock, Send, Rocket, Satellite, Globe, MessageCircle, Users, Shield, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThorxLogo from '../components/ThorxLogo';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash === '#contact-form') {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      details: "support@thorx.live",
      description: "Get detailed assistance via email",
      availability: "24/7 Response"
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: "Tahir Street, just off Gojra Road, in the heart of Jhang, Pakistan",
      description: "Visit us for in-person meetings",
      availability: "By Appointment"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Community",
      details: "https://chat.whatsapp.com/J7Jvr6XBYs82rlF9RGGlTa",
      description: "Join our vibrant WhatsApp community for updates and support",
      availability: "Active Community"
    }
  ];

  const departments = [
    {
      icon: Users,
      title: "General Support",
      email: "support@thorx.live",
      description: "Account help, technical issues, and general inquiries"
    },
    {
      icon: Star,
      title: "Team Inquiries",
      email: "team@thorx.live",
      description: "Partnerships, enterprise solutions, and collaborations"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/4 left-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-contact" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-contact)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-3/4 right-1/3 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
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
            <span className="block text-slate-400">Get in</span>
            <span>Touch</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Have questions, need support, or want to share feedback? We're here to help you succeed.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-200 mb-12 text-center">How to Reach Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 text-center"
              >
                {/* Icon container */}
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <info.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                  {info.title}
                </h3>
                
                {/* Dynamic display based on card type */}
                {info.title === "Email Support" ? (
                  <div className="mb-3">
                    <button 
                      onClick={() => {
                        const contactForm = document.getElementById('contact-form');
                        if (contactForm) {
                          contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold bg-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-600/50 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      {info.details}
                    </button>
                  </div>
                ) : info.title === "WhatsApp Community" ? (
                  <div className="mb-3">
                    <a 
                      href={info.details}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold bg-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-600/50 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Community
                    </a>
                  </div>
                ) : (
                  <p className="text-slate-300 font-semibold mb-3">
                    {info.details}
                  </p>
                )}
                
                <p className="text-slate-400 text-sm mb-3 group-hover:text-slate-300 transition-colors">
                  {info.description}
                </p>
                
                {/* Availability display */}
                <div className="flex items-center justify-center text-slate-500 text-xs mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{info.availability}</span>
                </div>
                
                {/* Call-to-action buttons */}
                {info.title === "Email Support" && (
                  <button 
                    onClick={() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300 hover:scale-105 transform active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  </button>
                )}
                
                {info.title === "WhatsApp Community" && (
                  <button 
                    onClick={() => window.open(info.details, '_blank')}
                    className="w-full bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300 hover:scale-105 transform active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Join Community
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form and Departments */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div id="contact-form" className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-200 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 inline-flex items-center justify-center gap-3 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
              </button>
            </form>
          </div>
          
          {/* Departments */}
          <div>
            <h3 className="text-2xl font-bold text-slate-200 mb-8">Contact Departments</h3>
            
            <div className="space-y-6">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-slate-700 transition-colors shadow-lg">
                        <dept.icon className="w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-colors" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-200 mb-2 group-hover:text-white transition-colors">
                        {dept.title}
                      </h4>
                      
                      <p className="text-slate-300 font-medium mb-2">
                        {dept.email}
                      </p>
                      
                      <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                        {dept.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Our Response Times
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            We're committed to providing fast, helpful responses to all your inquiries.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { method: "Email Support", time: "< 4 hours", description: "Detailed responses during business hours" },
              { method: "Phone Support", time: "< 1 minute", description: "Direct connection to our team" }
            ].map((response, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-200 mb-2">{response.time}</div>
                <div className="text-lg font-semibold text-slate-300 mb-2">{response.method}</div>
                <div className="text-slate-400 text-sm">{response.description}</div>
              </div>
            ))}
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

export default ContactPage;