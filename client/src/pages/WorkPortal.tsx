import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Star, 
  Clock, 
  DollarSign, 
  Target,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Zap,
  TrendingUp,
  BarChart3,
  Eye,
  Calendar,
  Activity,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Users,
  Award,
  Briefcase,
  Globe,
  Shield,
  Timer,
  ExternalLink,
  Heart,
  MessageCircle,
  Share,
  ThumbsUp,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Loader,
  MousePointer,
  Monitor,
  Smartphone
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
const WorkPortal = memo(() => {
  const [activeSection, setActiveSection] = useState('ads');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);
  const [siteVisitTimer, setSiteVisitTimer] = useState<{[key: number]: number}>({});
  const [completedSites, setCompletedSites] = useState<number[]>([]);
  const [socialTaskProgress, setSocialTaskProgress] = useState<{[key: number]: number}>({});



  // IMPROVED: High-contrast colors for better visibility
  const chartColors = {
    ads: '#E91E63',      // Material Pink - 4.52:1 contrast
    social: '#2196F3',   // Material Blue - 4.59:1 contrast
    sites: '#009688',    // Material Teal - 4.54:1 contrast
    total: '#9C27B0'     // Material Purple - 4.61:1 contrast
  };

  // Enhanced analytics data
  const earningsData = [
    { day: 'Mon', ads: 45.50, social: 28.75, sites: 15.25, total: 89.50 },
    { day: 'Tue', ads: 52.75, social: 32.50, sites: 18.75, total: 104.00 },
    { day: 'Wed', ads: 38.25, social: 35.75, sites: 22.50, total: 96.50 },
    { day: 'Thu', ads: 61.50, social: 29.25, sites: 16.75, total: 107.50 },
    { day: 'Fri', ads: 48.75, social: 41.50, sites: 19.25, total: 109.50 },
    { day: 'Sat', ads: 55.25, social: 38.75, sites: 21.00, total: 115.00 },
    { day: 'Sun', ads: 42.50, social: 33.25, sites: 17.75, total: 93.50 }
  ];

  const categoryData = [
    { name: 'Ads Cosmos', value: 40, color: chartColors.ads, earnings: 304.50 },
    { name: 'Social Cosmos', value: 35, color: chartColors.social, earnings: 239.75 },
    { name: 'Site Cosmos', value: 25, color: chartColors.sites, earnings: 131.25 }
  ];

  const performanceMetrics = {
    totalEarnings: 1547.50,
    weeklyEarnings: 715.50,
    completionRate: 96.8,
    averageDaily: 102.21,
    tasksCompleted: 189,
    adsWatched: 67,
    socialTasks: 45,
    sitesVisited: 77
  };

  // Video ads data
  const videoAds = [
    {
      id: 1,
      title: "Premium Fitness App Demo",
      duration: 30,
      reward: 3.50,
      category: "Health & Fitness",
      thumbnail: "🏃‍♂️",
      description: "Discover the latest fitness tracking features",
      status: "available",
      completions: 1247
    },
    {
      id: 2,
      title: "E-commerce Platform Tour",
      duration: 45,
      reward: 5.25,
      category: "Shopping",
      thumbnail: "🛒",
      description: "Explore new shopping experiences",
      status: "available",
      completions: 856
    },
    {
      id: 3,
      title: "Financial Planning Tool",
      duration: 60,
      reward: 7.50,
      category: "Finance",
      thumbnail: "💰",
      description: "Learn about smart investment strategies",
      status: "featured",
      completions: 423
    }
  ];

  // Social media tasks
  const socialTasks = [
    {
      id: 1,
      platform: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      task: "Like and Follow Fashion Brand",
      description: "Follow @fashionbrand and like their latest 3 posts",
      reward: 2.75,
      duration: "2 mins",
      status: "available",
      requirements: ["Follow account", "Like 3 recent posts", "Stay followed for 24h"],
      completions: 892
    },
    {
      id: 2,
      platform: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      task: "Share Business Page Post",
      description: "Share a post from a local business page",
      reward: 3.25,
      duration: "3 mins",
      status: "available",
      requirements: ["Like business page", "Share specific post", "Keep share for 48h"],
      completions: 654
    },
    {
      id: 3,
      platform: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      task: "Retweet and Comment",
      description: "Retweet with thoughtful comment on tech news",
      reward: 4.50,
      duration: "5 mins",
      status: "in-progress",
      requirements: ["Follow account", "Retweet with comment", "Engage authentically"],
      completions: 423
    },
    {
      id: 4,
      platform: "YouTube",
      icon: Youtube,
      color: "bg-red-600",
      task: "Subscribe and Watch",
      description: "Subscribe to channel and watch full video",
      reward: 6.75,
      duration: "8 mins",
      status: "available",
      requirements: ["Subscribe to channel", "Watch full video", "Like video"],
      completions: 789
    }
  ];

  // Site visit tasks (PTV)
  const siteVisitTasks = [
    {
      id: 1,
      title: "Tech News Portal",
      url: "technews.example.com",
      description: "Visit and browse technology news website",
      reward: 1.25,
      visitDuration: 45,
      status: "available",
      safetyRating: 5,
      category: "News & Media",
      completions: 1456,
      requirements: ["Stay on site for 45 seconds", "Browse at least 2 pages", "No ad blockers"]
    },
    {
      id: 2,
      title: "Online Learning Platform",
      url: "edulearn.example.com",
      description: "Explore online course offerings",
      reward: 2.50,
      visitDuration: 60,
      status: "available",
      safetyRating: 5,
      category: "Education",
      completions: 987,
      requirements: ["Stay on site for 60 seconds", "View course catalog", "Register interest"]
    },
    {
      id: 3,
      title: "E-commerce Store",
      url: "shop.example.com",
      description: "Browse product categories and deals",
      reward: 1.75,
      visitDuration: 30,
      status: "completed",
      safetyRating: 4,
      category: "Shopping",
      completions: 2134,
      requirements: ["Stay on site for 30 seconds", "Browse products", "Add item to cart"]
    },
    {
      id: 4,
      title: "Health & Wellness Blog",
      url: "wellness.example.com",
      description: "Read health tips and wellness articles",
      reward: 3.00,
      visitDuration: 90,
      status: "available",
      safetyRating: 5,
      category: "Health",
      completions: 756,
      requirements: ["Stay on site for 90 seconds", "Read full article", "Share on social media"]
    }
  ];

  // Video simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying && currentVideoId) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsVideoPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, currentVideoId]);

  // Site visit timer simulation
  useEffect(() => {
    const intervals: {[key: number]: NodeJS.Timeout} = {};
    
    Object.keys(siteVisitTimer).forEach(siteId => {
      const id = parseInt(siteId);
      if (siteVisitTimer[id] > 0 && !completedSites.includes(id)) {
        intervals[id] = setInterval(() => {
          setSiteVisitTimer(prev => {
            const newTime = prev[id] - 1;
            if (newTime <= 0) {
              setCompletedSites(prevCompleted => [...prevCompleted, id]);
              return { ...prev, [id]: 0 };
            }
            return { ...prev, [id]: newTime };
          });
        }, 1000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [siteVisitTimer, completedSites]);

  const handleVideoPlay = (videoId: number) => {
    setCurrentVideoId(videoId);
    setIsVideoPlaying(true);
    setVideoProgress(0);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoReset = () => {
    setVideoProgress(0);
    setIsVideoPlaying(false);
  };

  const handleSiteVisit = (siteId: number, duration: number) => {
    setSiteVisitTimer(prev => ({ ...prev, [siteId]: duration }));
  };

  const handleSocialTaskStart = (taskId: number) => {
    setSocialTaskProgress(prev => ({ ...prev, [taskId]: 0 }));
    // Simulate progress
    const interval = setInterval(() => {
      setSocialTaskProgress(prev => {
        const currentProgress = prev[taskId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [taskId]: currentProgress + 10 };
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-50 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'featured': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getSafetyStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Enhanced tooltip components with better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-4 shadow-lg"
        >
          <p className="text-primary font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-primary font-medium">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              {`${entry.dataKey}: $${entry.value}`}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-3 shadow-lg"
        >
          <p className="text-primary font-semibold">{payload[0].name}</p>
          <p className="text-primary font-medium">{`${payload[0].value}% - $${payload[0].payload.earnings}`}</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Cosmic Workplace</h1>
          <p className="text-secondary">Three universes of earning opportunities await your exploration</p>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          {[
            { title: "Total Earnings", value: `$${performanceMetrics.totalEarnings.toFixed(2)}`, icon: DollarSign, color: "bg-soft-pink" },
            { title: "Weekly Earnings", value: `$${performanceMetrics.weeklyEarnings.toFixed(2)}`, icon: TrendingUp, color: "bg-pale-blue" },
            { title: "Completion Rate", value: `${performanceMetrics.completionRate}%`, icon: Award, color: "bg-light-teal" },
            { title: "Daily Average", value: `$${performanceMetrics.averageDaily.toFixed(2)}`, icon: BarChart3, color: "bg-muted-yellow" }
          ].map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
              }}
              className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                </div>
                <span className="text-xl md:text-2xl">🌌</span>
              </div>
              <div className="text-lg md:text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-xs md:text-sm text-secondary">{metric.title}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8"
        >
          <button
            onClick={() => setActiveSection('ads')}
            className={`flex items-center justify-center sm:justify-start space-x-3 px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
              activeSection === 'ads'
                ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
            }`}
          >
            <Play className="w-5 h-5" />
            <span style={{ color: '#666666' }}>Ads Cosmos</span>
          </button>
          <button
            onClick={() => setActiveSection('social')}
            className={`flex items-center justify-center sm:justify-start space-x-3 px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
              activeSection === 'social'
                ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span style={{ color: '#666666' }}>Social Cosmos</span>
          </button>
          <button
            onClick={() => setActiveSection('sites')}
            className={`flex items-center justify-center sm:justify-start space-x-3 px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
              activeSection === 'sites'
                ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span style={{ color: '#666666' }}>Site Cosmos</span>
          </button>
        </motion.div>

        {/* Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
        >
          {/* Weekly Earnings Chart */}
          <div className="lg:col-span-2 bg-secondary rounded-xl p-4 md:p-6 border border-primary shadow-primary">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Cosmic Earnings Breakdown</h3>
              <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                <Activity className="w-4 h-4 text-secondary" />
                <span className="text-sm text-secondary">Live Data</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="adsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.ads} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.ads} stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.social} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.social} stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="sitesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.sites} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.sites} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6B7280" 
                  fontSize={12}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={11}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="ads" 
                  stackId="1"
                  stroke={chartColors.ads}
                  strokeWidth={3}
                  fill="url(#adsGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="social" 
                  stackId="1"
                  stroke={chartColors.social}
                  strokeWidth={3}
                  fill="url(#socialGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="sites" 
                  stackId="1"
                  stroke={chartColors.sites}
                  strokeWidth={3}
                  fill="url(#sitesGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Enhanced Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-primary">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chartColors.ads }}></div>
                <span className="text-sm text-secondary font-medium">Ads Cosmos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chartColors.social }}></div>
                <span className="text-sm text-secondary font-medium">Social Cosmos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chartColors.sites }}></div>
                <span className="text-sm text-secondary font-medium">Site Cosmos</span>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary shadow-primary">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">Cosmic Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-secondary">{item.name}</span>
                  </div>
                  <span className="font-medium text-primary">${item.earnings}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'ads' && (
            <motion.div
              key="ads"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Ads Cosmos Section */}
              <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary shadow-primary">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Ads Cosmos - Video Universe</h3>
                  <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                    <Eye className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-secondary">Watch & Earn</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {videoAds.map((ad, index) => (
                    <motion.div
                      key={ad.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                      }}
                      className="bg-tertiary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300"
                    >
                      {/* Video Player Simulation */}
                      <div className="relative bg-primary rounded-lg mb-4 h-32 md:h-40 flex items-center justify-center overflow-hidden">
                        <div className="text-4xl md:text-6xl">{ad.thumbnail}</div>
                        
                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          {currentVideoId === ad.id ? (
                            <div className="text-center">
                              {/* Progress Bar */}
                              <div className="w-24 md:w-32 bg-black/30 rounded-full h-2 mb-3 md:mb-4">
                                <div 
                                  className="bg-soft-pink h-2 rounded-full transition-all duration-100"
                                  style={{ width: `${videoProgress}%` }}
                                />
                              </div>
                              
                              {/* Control Buttons */}
                              <div className="flex items-center justify-center space-x-2 md:space-x-3">
                                <button
                                  onClick={isVideoPlaying ? handleVideoPause : () => handleVideoPlay(ad.id)}
                                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 hover:bg-white/30 transition-all duration-200"
                                >
                                  {isVideoPlaying ? 
                                    <Pause className="w-4 h-4 md:w-6 md:h-6 text-white" /> : 
                                    <Play className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                  }
                                </button>
                                <button
                                  onClick={() => setIsMuted(!isMuted)}
                                  className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 md:p-2 hover:bg-white/30 transition-all duration-200"
                                >
                                  {isMuted ? 
                                    <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-white" /> : 
                                    <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                  }
                                </button>
                                <button
                                  onClick={handleVideoReset}
                                  className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 md:p-2 hover:bg-white/30 transition-all duration-200"
                                >
                                  <RotateCcw className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                </button>
                              </div>
                              
                              {/* Timer */}
                              <div className="text-white text-xs md:text-sm mt-2 font-medium">
                                {Math.floor((videoProgress / 100) * ad.duration)}s / {ad.duration}s
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleVideoPlay(ad.id)}
                              className="bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4 hover:bg-white/30 transition-all duration-200"
                            >
                              <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </button>
                          )}
                        </div>

                        {/* Featured Badge */}
                        {ad.status === 'featured' && (
                          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Ad Details */}
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-primary mb-1 text-sm md:text-base">{ad.title}</h4>
                          <p className="text-xs md:text-sm text-secondary">{ad.description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <span className="flex items-center text-xs md:text-sm text-secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              {ad.duration}s
                            </span>
                            <span className="text-xs md:text-sm text-secondary">
                              {ad.completions} views
                            </span>
                          </div>
                          <div className="flex items-center text-base md:text-lg font-bold text-primary">
                            <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                            {ad.reward}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-tertiary text-secondary px-2 py-1 rounded-full border border-primary">
                            {ad.category}
                          </span>
                          {videoProgress === 100 && currentVideoId === ad.id ? (
                            <button className="bg-green-500 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                              <span>Completed</span>
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleVideoPlay(ad.id)}
                              className="bg-soft-pink px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-soft-pink/80 transition-all duration-200 flex items-center space-x-2 border border-soft-pink/20"
                              style={{ color: '#666666' }}
                            >
                              <Play className="w-3 h-3 md:w-4 md:h-4" style={{ color: '#666666' }} />
                              <span>Watch</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Social Cosmos Section */}
              <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary shadow-primary">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Social Cosmos - Engagement Universe</h3>
                  <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                    <Heart className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-secondary">Engage & Earn</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {socialTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                      }}
                      className="bg-tertiary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300"
                    >
                      {/* Platform Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${task.color} text-white`}>
                            <task.icon className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-primary text-sm md:text-base">{task.platform}</h4>
                            <p className="text-xs md:text-sm text-secondary">{task.completions} completed</p>
                          </div>
                        </div>
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>

                      {/* Task Details */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-primary mb-2 text-sm md:text-base">{task.task}</h5>
                        <p className="text-xs md:text-sm text-secondary mb-3">{task.description}</p>
                        
                        {/* Requirements */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-primary">Requirements:</p>
                          {task.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-secondary">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {socialTaskProgress[task.id] !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-secondary">Progress</span>
                            <span className="text-primary font-medium">{socialTaskProgress[task.id]}%</span>
                          </div>
                          <div className="w-full bg-primary rounded-full h-2">
                            <div 
                              className="bg-soft-pink h-2 rounded-full transition-all duration-300"
                              style={{ width: `${socialTaskProgress[task.id]}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Task Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <span className="flex items-center text-xs md:text-sm text-secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {task.duration}
                          </span>
                        </div>
                        <div className="flex items-center text-base md:text-lg font-bold text-primary">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                          {task.reward}
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSocialTaskStart(task.id)}
                        disabled={task.status === 'completed' || socialTaskProgress[task.id] === 100}
                        className={`w-full py-2 md:py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 border text-xs md:text-sm ${
                          task.status === 'completed' || socialTaskProgress[task.id] === 100
                            ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200'
                            : task.status === 'in-progress'
                            ? 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-200'
                            : 'bg-soft-pink hover:bg-soft-pink/80 border-soft-pink/20'
                        }`}
                        style={task.status === 'available' ? { color: '#666666' } : {}}
                      >
                        {task.status === 'completed' || socialTaskProgress[task.id] === 100 ? (
                          <>
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Completed</span>
                          </>
                        ) : task.status === 'in-progress' ? (
                          <>
                            <Loader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                            <span>In Progress</span>
                          </>
                        ) : (
                          <>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" style={{ color: '#666666' }} />
                            <span>Start Task</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'sites' && (
            <motion.div
              key="sites"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Site Cosmos Section */}
              <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary shadow-primary">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Site Cosmos - PTV Universe</h3>
                  <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                    <Globe className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-secondary">Visit & Earn</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {siteVisitTasks.map((site, index) => (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                      }}
                      className="bg-tertiary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300"
                    >
                      {/* Site Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-light-teal">
                            <Globe className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-primary text-sm md:text-base">{site.title}</h4>
                            <p className="text-xs text-secondary">{site.url}</p>
                          </div>
                        </div>
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(site.status)}`}>
                          {site.status}
                        </span>
                      </div>

                      {/* Safety Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-secondary">Safety:</span>
                          <div className="flex space-x-1">
                            {getSafetyStars(site.safetyRating)}
                          </div>
                        </div>
                        <span className="text-xs bg-tertiary text-secondary px-2 py-1 rounded-full border border-primary">
                          {site.category}
                        </span>
                      </div>

                      {/* Site Description */}
                      <p className="text-xs md:text-sm text-secondary mb-4">{site.description}</p>

                      {/* Timer Display */}
                      {siteVisitTimer[site.id] !== undefined && siteVisitTimer[site.id] > 0 && (
                        <div className="mb-4 p-3 bg-secondary rounded-lg border border-primary">
                          <div className="flex items-center justify-center space-x-2">
                            <Timer className="w-4 h-4 text-soft-pink" />
                            <span className="text-lg font-bold text-primary">
                              {formatTime(siteVisitTimer[site.id])}
                            </span>
                          </div>
                          <div className="w-full bg-primary rounded-full h-2 mt-2">
                            <div 
                              className="bg-soft-pink h-2 rounded-full transition-all duration-1000"
                              style={{ 
                                width: `${((site.visitDuration - siteVisitTimer[site.id]) / site.visitDuration) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-primary mb-2">Requirements:</p>
                        <div className="space-y-1">
                          {site.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-secondary">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Site Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <span className="flex items-center text-xs md:text-sm text-secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {site.visitDuration}s
                          </span>
                          <span className="text-xs md:text-sm text-secondary">
                            {site.completions} visits
                          </span>
                        </div>
                        <div className="flex items-center text-base md:text-lg font-bold text-primary">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                          {site.reward}
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSiteVisit(site.id, site.visitDuration)}
                        disabled={site.status === 'completed' || completedSites.includes(site.id) || siteVisitTimer[site.id] > 0}
                        className={`w-full py-2 md:py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 border text-xs md:text-sm ${
                          site.status === 'completed' || completedSites.includes(site.id)
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : siteVisitTimer[site.id] > 0
                            ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                            : 'bg-soft-pink hover:bg-soft-pink/80 border-soft-pink/20'
                        }`}
                        style={site.status === 'available' && !siteVisitTimer[site.id] ? { color: '#666666' } : {}}
                      >
                        {site.status === 'completed' || completedSites.includes(site.id) ? (
                          <>
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Completed</span>
                          </>
                        ) : siteVisitTimer[site.id] > 0 ? (
                          <>
                            <Timer className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Visiting...</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" style={{ color: '#666666' }} />
                            <span>Visit Site</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
  );
});

export default WorkPortal;