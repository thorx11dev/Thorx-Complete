import { Link } from 'wouter';
import { ArrowLeft, Calendar, Clock, User, Tag, ChevronRight, Rocket, Satellite, Globe, TrendingUp, Star, Shield, Zap, Target, Award, Calculator, Briefcase, Users, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThorxLogo from '../components/ThorxLogo';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Digital Earning: Trends to Watch in 2025",
      excerpt: "Explore the emerging trends and technologies that are reshaping how people earn money online. From AI-powered task matching to decentralized earning platforms, discover what's next in the digital economy.",
      author: "Aon Imran",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "Industry Insights",
      tags: ["Digital Economy", "Future Trends", "AI"],
      icon: TrendingUp,
      featured: true
    },
    {
      id: 2,
      title: "Maximizing Your Earning Potential: Advanced Strategies",
      excerpt: "Learn proven strategies to increase your income on digital platforms. This comprehensive guide covers task optimization, skill development, and time management techniques that successful earners use.",
      author: "Zain Abbas",
      date: "January 12, 2025",
      readTime: "12 min read",
      category: "Strategy",
      tags: ["Earning Tips", "Productivity", "Success"],
      icon: Star,
      featured: false
    },
    {
      id: 3,
      title: "Security Best Practices for Digital Earners",
      excerpt: "Protect your digital assets and personal information while earning online. This essential guide covers password security, two-factor authentication, and how to identify and avoid common scams.",
      author: "Prof. Muhammad Awais",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Security",
      tags: ["Security", "Privacy", "Best Practices"],
      icon: Shield,
      featured: false
    },
    {
      id: 4,
      title: "Building Sustainable Income Streams in the Digital Age",
      excerpt: "Discover how to create multiple income streams that provide financial stability and growth. Learn about diversification strategies, passive income opportunities, and long-term wealth building.",
      author: "Zohaib Nadeem",
      date: "January 8, 2025",
      readTime: "10 min read",
      category: "Financial Planning",
      tags: ["Income Streams", "Financial Planning", "Sustainability"],
      icon: Target,
      featured: false
    },
    {
      id: 5,
      title: "The Psychology of High Performance: Mindset for Success",
      excerpt: "Understand the mental aspects of achieving success in digital earning. Explore goal setting, motivation techniques, and how to maintain peak performance while working remotely.",
      author: "Aon Imran",
      date: "January 5, 2025",
      readTime: "9 min read",
      category: "Personal Development",
      tags: ["Psychology", "Performance", "Mindset"],
      icon: Zap,
      featured: false
    },
    {
      id: 6,
      title: "From Beginner to Expert: Your Complete Learning Path",
      excerpt: "A comprehensive roadmap for anyone starting their digital earning journey. Learn about skill development, platform selection, and how to accelerate your progress from novice to expert level.",
      author: "Zain Abbas",
      date: "January 3, 2025",
      readTime: "15 min read",
      category: "Education",
      tags: ["Learning", "Beginner Guide", "Career Development"],
      icon: Award,
      featured: false
    },
    {
      id: 7,
      title: "Social Media Marketing for Digital Earners",
      excerpt: "Master social media strategies to build your personal brand and attract more earning opportunities. Learn about content creation, engagement tactics, and platform-specific best practices.",
      author: "Zohaib Nadeem",
      date: "January 1, 2025",
      readTime: "11 min read",
      category: "Marketing",
      tags: ["Social Media", "Branding", "Marketing"],
      icon: Globe,
      featured: false
    },
    {
      id: 8,
      title: "Mobile Earning: Opportunities in Your Pocket",
      excerpt: "Explore the world of mobile earning apps and discover how to make money on-the-go. From micro-tasks to location-based services, learn how to maximize your mobile earning potential.",
      author: "Aon Imran",
      date: "December 28, 2024",
      readTime: "6 min read",
      category: "Mobile",
      tags: ["Mobile Apps", "Convenience", "Flexibility"],
      icon: Rocket,
      featured: false
    },
    {
      id: 9,
      title: "Time Management for Maximum Earnings",
      excerpt: "Learn effective time management techniques to boost your productivity and earning potential. Discover how to prioritize tasks, eliminate distractions, and create efficient workflows.",
      author: "Prof. Muhammad Awais",
      date: "December 26, 2024",
      readTime: "8 min read",
      category: "Productivity",
      tags: ["Time Management", "Efficiency", "Productivity"],
      icon: Clock,
      featured: false
    },
    {
      id: 10,
      title: "Building Your Digital Portfolio",
      excerpt: "Create a compelling digital portfolio that showcases your skills and attracts high-paying opportunities. Learn about portfolio design, project presentation, and personal branding.",
      author: "Zain Abbas",
      date: "December 24, 2024",
      readTime: "10 min read",
      category: "Portfolio",
      tags: ["Portfolio", "Skills", "Presentation"],
      icon: Briefcase,
      featured: false
    },
    {
      id: 11,
      title: "Cryptocurrency and Digital Earning",
      excerpt: "Understanding the intersection of cryptocurrency and digital earning platforms. Learn about crypto payments, blockchain-based opportunities, and future trends in digital currency.",
      author: "Aon Imran",
      date: "December 22, 2024",
      readTime: "13 min read",
      category: "Cryptocurrency",
      tags: ["Crypto", "Blockchain", "Digital Currency"],
      icon: Satellite,
      featured: false
    },
    {
      id: 12,
      title: "Global Markets: Earning Across Borders",
      excerpt: "Navigate international earning opportunities and understand global market dynamics. Learn about cross-border payments, cultural considerations, and international tax implications.",
      author: "Zohaib Nadeem",
      date: "December 20, 2024",
      readTime: "9 min read",
      category: "Global",
      tags: ["International", "Markets", "Opportunities"],
      icon: Globe,
      featured: false
    },
    {
      id: 13,
      title: "AI Tools for Enhanced Productivity",
      excerpt: "Leverage artificial intelligence tools to streamline your workflow and increase earnings. Discover AI-powered solutions for task automation, content creation, and performance optimization.",
      author: "Prof. Muhammad Awais",
      date: "December 18, 2024",
      readTime: "7 min read",
      category: "Technology",
      tags: ["AI", "Automation", "Tools"],
      icon: Zap,
      featured: false
    },
    {
      id: 14,
      title: "Community Building for Digital Success",
      excerpt: "Build meaningful connections and communities that support your digital earning journey. Learn about networking strategies, collaboration opportunities, and building professional relationships.",
      author: "Zohaib Nadeem",
      date: "December 16, 2024",
      readTime: "8 min read",
      category: "Community",
      tags: ["Community", "Networking", "Support"],
      icon: Users,
      featured: false
    },
    {
      id: 15,
      title: "Tax Considerations for Digital Earners",
      excerpt: "Navigate the complex world of taxes for digital income and maximize your after-tax earnings. Learn about deductions, record-keeping, and compliance requirements for online earners.",
      author: "Prof. Muhammad Awais",
      date: "December 14, 2024",
      readTime: "12 min read",
      category: "Finance",
      tags: ["Taxes", "Finance", "Legal"],
      icon: Calculator,
      featured: false
    },
    {
      id: 16,
      title: "Scaling Your Digital Business",
      excerpt: "Transform your individual earning efforts into a scalable digital business model. Learn about delegation, automation, team building, and creating systems for sustainable growth.",
      author: "Aon Imran",
      date: "December 12, 2024",
      readTime: "14 min read",
      category: "Business",
      tags: ["Scaling", "Business", "Growth"],
      icon: TrendingUp,
      featured: false
    }
  ];

  const categories = [
    "All",
    "Industry Insights",
    "Strategy",
    "Security",
    "Financial Planning",
    "Personal Development",
    "Education",
    "Marketing",
    "Mobile",
    "Productivity",
    "Portfolio",
    "Cryptocurrency",
    "Global",
    "Technology",
    "Community",
    "Finance",
    "Business"
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Industry Insights": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "Strategy": "bg-green-500/20 text-green-300 border-green-500/30",
      "Security": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "Financial Planning": "bg-orange-500/20 text-orange-300 border-orange-500/30",
      "Personal Development": "bg-pink-500/20 text-pink-300 border-pink-500/30",
      "Education": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      "Marketing": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      "Mobile": "bg-teal-500/20 text-teal-300 border-teal-500/30",
      "Productivity": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      "Portfolio": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      "Cryptocurrency": "bg-amber-500/20 text-amber-300 border-amber-500/30",
      "Global": "bg-violet-500/20 text-violet-300 border-violet-500/30",
      "Technology": "bg-rose-500/20 text-rose-300 border-rose-500/30",
      "Community": "bg-lime-500/20 text-lime-300 border-lime-500/30",
      "Finance": "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
      "Business": "bg-sky-500/20 text-sky-300 border-sky-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/3 left-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-blog" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-blog)"/>
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
            <span className="block text-slate-400">Thorx</span>
            <span>Blog</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Insights, strategies, and stories from the cosmic frontier of digital earning. Stay informed with expert guidance and industry trends.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, and insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-slate-200">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Showing {filteredPosts.length} of {blogPosts.length} articles
                {selectedCategory !== 'All' && (
                  <span className="ml-2">
                    in <span className="text-slate-300 font-semibold">{selectedCategory}</span>
                  </span>
                )}
                {searchQuery && (
                  <span className="ml-2">
                    matching "<span className="text-slate-300 font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="relative z-10 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.slice(0, 8).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 border-slate-200 shadow-lg' 
                    : 'bg-slate-800/50 text-slate-400 border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-8">Featured Article</h2>
          
          {filteredPosts.filter(post => post.featured).map((post) => (
            <div
              key={post.id}
              className="bg-slate-800/50 p-8 lg:p-12 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-sm">Featured</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-200 mb-4 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
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
                  
                  <Link to={`/blog/${post.id}`}>
                    <button className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 inline-flex items-center gap-3 group/btn hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95">
                      <span>Read Full Article</span>
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:rotate-12 transition-all duration-300" />
                    </button>
                  </Link>
                </div>
                
                <div className="hidden lg:flex justify-center">
                  <div className="w-64 h-64 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-slate-700 transition-colors">
                    <post.icon className="w-24 h-24 text-slate-500 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <div
                key={post.id}
                className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <post.icon className="w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-white transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-400 mb-4 leading-relaxed group-hover:text-slate-300 transition-colors line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="flex items-center gap-1 text-xs text-slate-500">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <button className="w-full bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-6 py-3 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 inline-flex items-center justify-center gap-2 group/btn hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 transform active:scale-95">
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:rotate-12 transition-all duration-300" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Stay Updated
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest insights, strategies, and updates from the Thorx community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
            />
            <button className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95">
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
              <ThorxLogo size="lg" className="text-slate-200 group-hover:text-white transition-colors" />
            </Link>
            <p className="text-slate-400">Navigate the digital universe with confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;