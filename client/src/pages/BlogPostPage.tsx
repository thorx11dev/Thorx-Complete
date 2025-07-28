import { Link, useParams } from 'wouter';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Rocket, Satellite, Globe, TrendingUp, Star, Shield, Zap, Target, Award, Briefcase, Calculator, Users, X, MessageCircle, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThorxLogo from '../components/ThorxLogo';

const BlogPostPage = () => {
  const params = useParams();
  const [showSocialModal, setShowSocialModal] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]); // Re-run when the article ID changes

  const handleSocialShare = (platform: string) => {
    const currentPost = blogPosts[params.id as keyof typeof blogPosts];
    if (!currentPost) return;
    
    const postUrl = `${window.location.origin}/blog/${currentPost.id}`;
    const shareText = `Check out this article: ${currentPost.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`,
      instagram: `https://www.instagram.com/`, // Note: Instagram doesn't support direct URL sharing
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + postUrl)}`,
      tiktok: `https://www.tiktok.com/`, // Note: TikTok doesn't support direct URL sharing
      telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(postUrl);
      setShowSocialModal(false);
      return;
    }
    
    const url = shareUrls[platform as keyof typeof shareUrls];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleContactRedirect = () => {
    window.location.href = '/contact#contact-form';
  };

  const handleEmailRedirect = () => {
    window.location.href = '/contact#contact-form';
  };

  const blogPosts = {
    "1": {
      id: 1,
      title: "The Future of Digital Earning: Trends to Watch in 2025",
      author: "Aon Imran",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "Industry Insights",
      tags: ["Digital Economy", "Future Trends", "AI"],
      icon: TrendingUp,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>The digital earning landscape is rapidly evolving, driven by technological advancements, changing work patterns, and new economic models. As we progress through 2025, several key trends are reshaping how individuals generate income online.</p>
          
          <h2>1. AI-Powered Task Optimization</h2>
          <p>Artificial Intelligence is revolutionizing task matching and optimization. Platforms are now using sophisticated algorithms to:</p>
          <ul>
            <li>Match users with tasks based on their skills, preferences, and performance history</li>
            <li>Predict optimal task sequences for maximum earnings</li>
            <li>Provide real-time feedback and suggestions for improvement</li>
            <li>Automate routine processes, allowing users to focus on high-value activities</li>
          </ul>

          <h2>2. Decentralized Earning Platforms</h2>
          <p>Blockchain technology is enabling new models of decentralized earning platforms that offer:</p>
          <ul>
            <li>Greater transparency in payment processing</li>
            <li>Reduced platform fees through smart contracts</li>
            <li>Global accessibility without traditional banking barriers</li>
            <li>Token-based reward systems with additional earning potential</li>
          </ul>

          <h2>3. Micro-Learning and Skill Monetization</h2>
          <p>The ability to quickly acquire and monetize new skills is becoming increasingly important. Key developments include:</p>
          <ul>
            <li>Just-in-time learning platforms integrated with earning opportunities</li>
            <li>Certification systems that immediately unlock new task categories</li>
            <li>Skill marketplaces where expertise becomes a tradeable commodity</li>
            <li>Collaborative learning communities with shared earning opportunities</li>
          </ul>

          <h2>4. Real-Time Analytics and Performance Tracking</h2>
          <p>Data-driven insights are becoming essential for optimizing digital earning strategies:</p>
          <ul>
            <li>Comprehensive dashboards showing earning patterns and trends</li>
            <li>Predictive analytics for future earning potential</li>
            <li>Benchmarking against top performers in similar categories</li>
            <li>Automated reporting and tax preparation features</li>
          </ul>

          <h2>5. Cross-Platform Integration</h2>
          <p>The future of digital earning lies in seamless integration across multiple platforms:</p>
          <ul>
            <li>Universal profiles that work across different earning platforms</li>
            <li>Consolidated payment systems and portfolio management</li>
            <li>Cross-platform reputation and rating systems</li>
            <li>Unified analytics and performance tracking</li>
          </ul>

          <h2>Conclusion</h2>
          <p>The digital earning landscape of 2025 promises unprecedented opportunities for those who adapt to these emerging trends. Success will depend on embracing technology, continuously developing skills, and leveraging data-driven insights to optimize earning potential.</p>
          
          <p>At Thorx, we're committed to staying at the forefront of these developments, ensuring our platform incorporates the latest innovations to maximize our users' earning potential.</p>
        </div>
      `
    },
    "2": {
      id: 2,
      title: "Maximizing Your Earning Potential: Advanced Strategies",
      author: "Zain Abbas",
      date: "January 12, 2025",
      readTime: "12 min read",
      category: "Strategy",
      tags: ["Earning Tips", "Productivity", "Success"],
      icon: Star,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>Maximizing your earning potential on digital platforms requires more than just completing tasks. It demands strategic thinking, continuous optimization, and a deep understanding of the platform dynamics.</p>
          
          <h2>1. Strategic Task Selection</h2>
          <p>Not all tasks are created equal. Smart earners focus on:</p>
          <ul>
            <li><strong>High-value tasks:</strong> Prioritize tasks with better hourly rates</li>
            <li><strong>Skill-building opportunities:</strong> Choose tasks that develop valuable capabilities</li>
            <li><strong>Batch processing:</strong> Group similar tasks to improve efficiency</li>
            <li><strong>Long-term relationships:</strong> Build connections with regular clients</li>
          </ul>

          <h2>2. Time Management Excellence</h2>
          <p>Effective time management is crucial for maximizing earnings:</p>
          <ul>
            <li><strong>Peak hours optimization:</strong> Identify when premium tasks are available</li>
            <li><strong>Productivity tracking:</strong> Monitor your performance across different times</li>
            <li><strong>Break scheduling:</strong> Maintain consistent performance with proper rest</li>
            <li><strong>Multi-tasking strategies:</strong> Handle multiple tasks without quality loss</li>
          </ul>

          <h2>3. Skill Development Pipeline</h2>
          <p>Continuous learning ensures access to higher-paying opportunities:</p>
          <ul>
            <li><strong>Market research:</strong> Identify high-demand skills in your field</li>
            <li><strong>Structured learning:</strong> Create learning plans with measurable goals</li>
            <li><strong>Practice projects:</strong> Build portfolio pieces while learning</li>
            <li><strong>Certification pursuit:</strong> Obtain recognized credentials</li>
          </ul>

          <h2>4. Performance Optimization</h2>
          <p>Small improvements compound over time:</p>
          <ul>
            <li><strong>Quality consistency:</strong> Maintain high standards across all tasks</li>
            <li><strong>Speed improvements:</strong> Develop efficient workflows and shortcuts</li>
            <li><strong>Communication skills:</strong> Build strong relationships with task providers</li>
            <li><strong>Feedback implementation:</strong> Actively use feedback to improve</li>
          </ul>

          <h2>5. Financial Management</h2>
          <p>Smart financial management amplifies your earning success:</p>
          <ul>
            <li><strong>Diversification:</strong> Don't rely on a single income stream</li>
            <li><strong>Reinvestment:</strong> Use earnings to upgrade tools and skills</li>
            <li><strong>Emergency fund:</strong> Build financial security for consistency</li>
            <li><strong>Tax optimization:</strong> Understand and leverage applicable deductions</li>
          </ul>

          <h2>6. Technology Leverage</h2>
          <p>Use technology to gain competitive advantages:</p>
          <ul>
            <li><strong>Automation tools:</strong> Streamline repetitive processes</li>
            <li><strong>Analytics platforms:</strong> Track and analyze your performance</li>
            <li><strong>Collaboration software:</strong> Improve team-based task efficiency</li>
            <li><strong>Mobile optimization:</strong> Earn on-the-go with mobile strategies</li>
          </ul>

          <h2>Conclusion</h2>
          <p>The future of digital earning is bright and full of opportunities for those who stay informed and adapt to emerging trends. By embracing these developments and preparing for the changes ahead, you can position yourself for success in the evolving digital economy.</p>
        </div>
      `
    },
    "7": {
      id: 7,
      title: "Maximizing Your Earning Potential: Advanced Strategies",
      author: "Zain Abbas",
      date: "January 12, 2025",
      readTime: "12 min read",
      category: "Strategy",
      tags: ["Earning Tips", "Productivity", "Success"],
      icon: Star,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>Maximizing your earning potential in the digital space requires a strategic approach that goes beyond simply completing tasks. This comprehensive guide explores advanced strategies used by top earners to optimize their income streams.</p>
          
          <h2>1. Task Optimization Techniques</h2>
          <p>Successful digital earners understand that not all tasks are created equal. Here's how to optimize your task selection:</p>
          <ul>
            <li>Calculate your effective hourly rate for different task types</li>
            <li>Focus on high-value tasks that match your skill set</li>
            <li>Batch similar tasks to reduce context switching</li>
            <li>Track your performance metrics to identify improvement areas</li>
          </ul>

          <h2>2. Skill Development Strategy</h2>
          <p>Continuous learning is essential for maintaining competitive earning potential:</p>
          <ul>
            <li>Identify emerging skills in high demand</li>
            <li>Invest time in learning new technologies and tools</li>
            <li>Obtain relevant certifications to validate your expertise</li>
            <li>Practice on low-stakes projects before taking on premium work</li>
          </ul>
        </div>
      `
    },
    "3": {
      id: 3,
      title: "Security Best Practices for Digital Earners",
      author: "Prof. Muhammad Awais",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Security",
      tags: ["Security", "Privacy", "Best Practices"],
      icon: Shield,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>As digital earning becomes more prevalent, protecting your digital assets and personal information is crucial. This guide covers essential security practices every digital earner should implement.</p>
          
          <h2>1. Account Security</h2>
          <p>Securing your earning platform accounts is the first line of defense:</p>
          <ul>
            <li>Use unique, strong passwords for each platform</li>
            <li>Enable two-factor authentication wherever possible</li>
            <li>Regularly review account activity for suspicious behavior</li>
            <li>Keep your contact information updated</li>
          </ul>

          <h2>2. Financial Security</h2>
          <p>Protect your financial information and earnings:</p>
          <ul>
            <li>Use secure payment methods and avoid sharing sensitive financial data</li>
            <li>Monitor your bank and payment accounts regularly</li>
            <li>Set up alerts for transactions and account changes</li>
            <li>Keep detailed records of all earnings and transactions</li>
          </ul>
        </div>
      `
    },
    "4": {
      id: 4,
      title: "Building Your Digital Portfolio",
      author: "Zain Abbas",
      date: "December 24, 2024",
      readTime: "10 min read",
      category: "Portfolio",
      tags: ["Portfolio", "Skills", "Presentation"],
      icon: Briefcase,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>A compelling digital portfolio is essential for attracting high-paying opportunities and showcasing your expertise. This guide covers how to create a portfolio that stands out in the competitive digital marketplace.</p>
          
          <h2>1. Portfolio Structure</h2>
          <p>Organize your portfolio for maximum impact:</p>
          <ul>
            <li>Start with a compelling personal brand statement</li>
            <li>Showcase your best work prominently</li>
            <li>Include case studies that demonstrate problem-solving skills</li>
            <li>Provide clear contact information and next steps</li>
          </ul>

          <h2>2. Content Strategy</h2>
          <p>Choose and present your work strategically:</p>
          <ul>
            <li>Quality over quantity - select your best projects</li>
            <li>Include diverse examples that show your range</li>
            <li>Write compelling project descriptions</li>
            <li>Update regularly with new work and achievements</li>
          </ul>
        </div>
      `
    },
    "5": {
      id: 5,
      title: "Tax Considerations for Digital Earners",
      author: "Prof. Muhammad Awais",
      date: "December 14, 2024",
      readTime: "12 min read",
      category: "Finance",
      tags: ["Taxes", "Finance", "Legal"],
      icon: Calculator,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>Understanding tax obligations is crucial for digital earners to maximize after-tax income and remain compliant with regulations. This comprehensive guide covers key tax considerations for online income.</p>
          
          <h2>1. Income Classification</h2>
          <p>Different types of digital earnings have different tax implications:</p>
          <ul>
            <li>Freelance income vs. employee wages</li>
            <li>Business income and deductible expenses</li>
            <li>International income and tax treaties</li>
            <li>Cryptocurrency and digital asset taxation</li>
          </ul>

          <h2>2. Record Keeping</h2>
          <p>Maintaining proper records is essential for tax compliance:</p>
          <ul>
            <li>Track all income sources and amounts</li>
            <li>Document business-related expenses</li>
            <li>Keep receipts and transaction records</li>
            <li>Use accounting software for organization</li>
          </ul>
        </div>
      `
    },
    "6": {
      id: 6,
      title: "Community Building for Digital Success",
      author: "Zohaib Nadeem",
      date: "December 16, 2024",
      readTime: "8 min read",
      category: "Community",
      tags: ["Community", "Networking", "Support"],
      icon: Users,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>Building meaningful connections and communities can significantly impact your digital earning success. This guide explores strategies for networking and community building in the digital space.</p>
          
          <h2>1. Finding Your Community</h2>
          <p>Identify and join communities that align with your goals:</p>
          <ul>
            <li>Research industry-specific forums and groups</li>
            <li>Participate in professional social media platforms</li>
            <li>Attend virtual events and webinars</li>
            <li>Join local digital earner meetups</li>
          </ul>

          <h2>2. Contributing Value</h2>
          <p>Build relationships by providing value to your community:</p>
          <ul>
            <li>Share knowledge and insights generously</li>
            <li>Help others solve problems and overcome challenges</li>
            <li>Collaborate on projects and initiatives</li>
            <li>Mentor newcomers to the field</li>
          </ul>
        </div>
      `
    }
  };

  const postId = params.id || "1";
  const post = blogPosts[postId as keyof typeof blogPosts] || blogPosts["1"];

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
              <pattern id="constellation-post" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-post)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-3/4 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
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
            to="/blog" 
            className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-200 mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {post.tags.map((tag, index) => (
                <span key={index} className="flex items-center gap-1 px-3 py-1 text-xs text-slate-400 bg-slate-800/50 rounded-full border border-slate-700">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            
            <button 
              onClick={() => setShowSocialModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-600 rounded-xl text-white hover:from-slate-600 hover:to-slate-500 transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Share2 className="w-4 h-4" />
              Share Article
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 p-8 lg:p-12 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div 
              className="text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}
            />
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-8 text-center">Continue Reading</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {Object.values(blogPosts).filter(p => p.id !== post.id).slice(0, 4).map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                to={`/blog/${relatedPost.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="block"
              >
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                    <relatedPost.icon className="w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-200 mb-3 group-hover:text-white transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span>{relatedPost.author}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold hover:from-slate-100 hover:to-white transition-all duration-300 group-hover:scale-105 transform active:scale-95">
                      Read Article
                      <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Social Sharing Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full mx-4 relative">
            <button 
              onClick={() => setShowSocialModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-slate-200 mb-6">Share Article</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleSocialShare('facebook')}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <Facebook className="w-6 h-6 text-blue-400" />
                <span className="text-slate-200 font-medium">Facebook</span>
              </button>
              
              <button 
                onClick={() => handleSocialShare('twitter')}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <Twitter className="w-6 h-6 text-blue-400" />
                <span className="text-slate-200 font-medium">Twitter</span>
              </button>
              
              <button 
                onClick={() => handleSocialShare('whatsapp')}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 text-green-400" />
                <span className="text-slate-200 font-medium">WhatsApp</span>
              </button>
              
              <button 
                onClick={() => handleSocialShare('telegram')}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <Send className="w-6 h-6 text-blue-400" />
                <span className="text-slate-200 font-medium">Telegram</span>
              </button>
              
              <button 
                onClick={() => handleSocialShare('instagram')}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <Instagram className="w-6 h-6 text-pink-400" />
                <span className="text-slate-200 font-medium">Instagram</span>
              </button>
              
              <button 
                onClick={() => handleSocialShare('tiktok')}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <Star className="w-6 h-6 text-red-400" />
                <span className="text-slate-200 font-medium">TikTok</span>
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700">
              <button 
                onClick={() => handleSocialShare('copy')}
                className="w-full flex items-center justify-center gap-2 p-4 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-5 h-5 text-slate-300" />
                <span className="text-slate-200 font-medium">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

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

export default BlogPostPage;