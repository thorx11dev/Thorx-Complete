import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Filter,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Clock,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';


const EarningsInterface = memo(() => {
  const [viewType, setViewType] = useState('chart');
  const [activeTab, setActiveTab] = useState('overview');



  // Synchronized with Work page and Dashboard data
  const earningsData = [
    { date: '2024-01-15', amount: 89.50, tasks: 25, type: 'mixed', ads: 45.50, social: 28.75, sites: 15.25 },
    { date: '2024-01-16', amount: 104.00, tasks: 28, type: 'mixed', ads: 52.75, social: 32.50, sites: 18.75 },
    { date: '2024-01-17', amount: 96.50, tasks: 26, type: 'mixed', ads: 38.25, social: 35.75, sites: 22.50 },
    { date: '2024-01-18', amount: 107.50, tasks: 31, type: 'mixed', ads: 61.50, social: 29.25, sites: 16.75 },
    { date: '2024-01-19', amount: 109.50, tasks: 33, type: 'mixed', ads: 48.75, social: 41.50, sites: 19.25 },
    { date: '2024-01-20', amount: 115.00, tasks: 35, type: 'mixed', ads: 55.25, social: 38.75, sites: 21.00 },
    { date: '2024-01-21', amount: 93.50, tasks: 27, type: 'mixed', ads: 42.50, social: 33.25, sites: 17.75 }
  ];

  // IMPROVED: High-contrast colors for better visibility
  const chartColors = {
    ads: '#E91E63',      // Material Pink - 4.52:1 contrast
    social: '#2196F3',   // Material Blue - 4.59:1 contrast
    sites: '#009688',    // Material Teal - 4.54:1 contrast
    total: '#9C27B0'     // Material Purple - 4.61:1 contrast
  };

  const pieData = [
    { name: 'Ads Cosmos', value: 40, color: chartColors.ads, earnings: 304.50 },
    { name: 'Social Cosmos', value: 35, color: chartColors.social, earnings: 239.75 },
    { name: 'Site Cosmos', value: 25, color: chartColors.sites, earnings: 131.25 }
  ];

  // Updated metrics to match Work page
  const totalEarnings = 715.50; // Weekly total from Work page
  const averageDaily = 102.21; // From Work page
  const totalTasks = 189; // From Work page

  // Performance metrics synchronized with Work page
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

  // Single week detailed daily breakdown
  const singleWeekData = [
    { 
      day: 'Monday', 
      short: 'Mon',
      date: 'Jan 15',
      ads: 52.75, 
      social: 38.50, 
      sites: 21.25, 
      total: 112.50,
      tasks: 28,
      efficiency: 94.2,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Tuesday', 
      short: 'Tue',
      date: 'Jan 16',
      ads: 48.25, 
      social: 42.75, 
      sites: 19.50, 
      total: 110.50,
      tasks: 31,
      efficiency: 96.8,
      topUniverse: 'Social Cosmos'
    },
    { 
      day: 'Wednesday', 
      short: 'Wed',
      date: 'Jan 17',
      ads: 61.50, 
      social: 35.25, 
      sites: 24.75, 
      total: 121.50,
      tasks: 26,
      efficiency: 92.3,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Thursday', 
      short: 'Thu',
      date: 'Jan 18',
      ads: 44.75, 
      social: 49.25, 
      sites: 22.00, 
      total: 116.00,
      tasks: 33,
      efficiency: 98.1,
      topUniverse: 'Social Cosmos'
    },
    { 
      day: 'Friday', 
      short: 'Fri',
      date: 'Jan 19',
      ads: 58.50, 
      social: 41.75, 
      sites: 26.25, 
      total: 126.50,
      tasks: 29,
      efficiency: 95.7,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Saturday', 
      short: 'Sat',
      date: 'Jan 20',
      ads: 67.25, 
      social: 44.50, 
      sites: 28.75, 
      total: 140.50,
      tasks: 35,
      efficiency: 97.4,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Sunday', 
      short: 'Sun',
      date: 'Jan 21',
      ads: 39.75, 
      social: 32.25, 
      sites: 16.50, 
      total: 88.50,
      tasks: 22,
      efficiency: 89.6,
      topUniverse: 'Ads Cosmos'
    }
  ];

  // Enhanced tooltip component with better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-4 shadow-lg"
        >
          <p className="text-primary font-semibold mb-2">{new Date(label).toLocaleDateString()}</p>
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'breakdown', label: 'Breakdown', icon: PieChart }
  ];

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
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Cosmic Earnings Analytics</h1>
            <p className="text-secondary">Track your performance across all cosmic universes</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center sm:justify-start space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                  : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* MOBILE-OPTIMIZED: Summary Cards - 2x2 Grid on Mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-soft-pink mb-2 md:mb-4">
                    <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    ${performanceMetrics.totalEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Total Earnings</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +15.2%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-pale-blue mb-2 md:mb-4">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    ${performanceMetrics.weeklyEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Weekly Earnings</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +12.8%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-light-teal mb-2 md:mb-4">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    {performanceMetrics.tasksCompleted}
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Tasks Completed</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +8.7%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted-yellow mb-2 md:mb-4">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    {performanceMetrics.completionRate}%
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Success Rate</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +3.1%
                  </span>
                </div>
              </motion.div>
            </div>

            {/* MOBILE-OPTIMIZED: Charts - Stacked Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
                }}
                className="lg:col-span-2 bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Cosmic Earnings Trend</h3>
                  <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                    <Activity className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                    <span className="text-xs md:text-sm text-secondary">Live Analytics</span>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={220} className="md:!h-[300px]">
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
                      dataKey="date" 
                      stroke="#6B7280"
                      fontSize={12}
                      fontWeight={500}
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 pt-4 border-t border-primary">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: chartColors.ads }}></div>
                    <span className="text-xs md:text-sm text-secondary font-medium">Ads Cosmos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: chartColors.social }}></div>
                    <span className="text-xs md:text-sm text-secondary font-medium">Social Cosmos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: chartColors.sites }}></div>
                    <span className="text-xs md:text-sm text-secondary font-medium">Site Cosmos</span>
                  </div>
                </div>
              </motion.div>

              {/* MOBILE-OPTIMIZED: Performance Breakdown - Card Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
              >
                <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">Cosmic Performance</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { name: 'Ads Cosmos', value: performanceMetrics.adsWatched, color: 'bg-soft-pink', icon: '📺', earnings: 304.50, chartColor: chartColors.ads },
                    { name: 'Social Cosmos', value: performanceMetrics.socialTasks, color: 'bg-pale-blue', icon: '❤️', earnings: 239.75, chartColor: chartColors.social },
                    { name: 'Site Cosmos', value: performanceMetrics.sitesVisited, color: 'bg-light-teal', icon: '🌐', earnings: 131.25, chartColor: chartColors.sites }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ 
                        scale: 1.02,
                        y: -2
                      }}
                      className="earnings-performer-row flex items-center justify-between p-3 md:p-4 rounded-lg cursor-pointer min-h-[64px]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                          <span className="text-[#2D2D2D] text-sm md:text-lg font-bold">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-primary text-sm md:text-base">{item.name}</span>
                          <div className="text-xs md:text-sm text-secondary">{item.value} completed</div>
                          <div className="w-12 md:w-16 h-1 rounded-full mt-1" style={{ backgroundColor: item.chartColor }}></div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-primary font-bold text-sm md:text-base">${item.earnings}</span>
                        <div className="text-xs text-secondary">Total earned</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'breakdown' && (
          <motion.div
            key="breakdown"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Cosmic Daily Earnings Constellation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Cosmic Background Environment */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {/* Starfield Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Nebula Clouds */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-blue-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-radial from-pink-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-600/50 shadow-2xl">
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center space-x-3 mb-4"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                      <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                        Cosmic Weekly Journey
                      </h3>
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </motion.div>
                    <p className="text-slate-300 text-lg">January 15-21, 2024 • Daily Universe Exploration</p>
                  </div>

                  {/* Constellation Chart */}
                  <div className="relative h-80 md:h-96 mb-8">
                    <svg className="w-full h-full" viewBox="0 0 800 300">
                      <defs>
                        {/* Gradients for each universe */}
                        <radialGradient id="adsGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2"/>
                        </radialGradient>
                        <radialGradient id="socialGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2"/>
                        </radialGradient>
                        <radialGradient id="sitesGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.2"/>
                        </radialGradient>
                        
                        {/* Connection Lines */}
                        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
                          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.3"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Connection Lines Between Days */}
                      {singleWeekData.map((day, index) => {
                        if (index === singleWeekData.length - 1) return null;
                        const x1 = 80 + (index * 100);
                        const y1 = 250 - (day.total * 1.2);
                        const x2 = 80 + ((index + 1) * 100);
                        const y2 = 250 - (singleWeekData[index + 1].total * 1.2);
                        
                        return (
                          <motion.line
                            key={`connection-${index}`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="url(#connectionGrad)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                        );
                      })}

                      {/* Planet-like Day Nodes */}
                      {singleWeekData.map((day, index) => {
                        const x = 80 + (index * 100);
                        const baseY = 250 - (day.total * 1.2);
                        const maxRadius = 35;
                        const radius = Math.max(15, (day.total / 150) * maxRadius);
                        
                        return (
                          <g key={day.day}>
                            {/* Planet Glow */}
                            <motion.circle
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                              cx={x}
                              cy={baseY}
                              r={radius + 8}
                              fill={day.topUniverse === 'Ads Cosmos' ? 'url(#adsGlow)' : 
                                    day.topUniverse === 'Social Cosmos' ? 'url(#socialGlow)' : 
                                    'url(#sitesGlow)'}
                              className="animate-pulse"
                            />
                            
                            {/* Main Planet */}
                            <motion.circle
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.5 + index * 0.1, type: "spring" }}
                              cx={x}
                              cy={baseY}
                              r={radius}
                              fill={day.topUniverse === 'Ads Cosmos' ? '#EC4899' : 
                                    day.topUniverse === 'Social Cosmos' ? '#3B82F6' : 
                                    '#10B981'}
                              className="cursor-pointer hover:brightness-110 transition-all duration-300"
                            />
                            
                            {/* Planet Rings */}
                            <motion.ellipse
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 0.6 }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              cx={x}
                              cy={baseY}
                              rx={radius + 12}
                              ry="3"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1"
                              strokeOpacity="0.4"
                            />
                            
                            {/* Day Label */}
                            <motion.text
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                              x={x}
                              y={baseY + radius + 25}
                              textAnchor="middle"
                              fill="#E2E8F0"
                              fontSize="12"
                              fontWeight="600"
                            >
                              {day.short}
                            </motion.text>
                            
                            {/* Earnings Amount */}
                            <motion.text
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                              x={x}
                              y={baseY - radius - 10}
                              textAnchor="middle"
                              fill="#F1F5F9"
                              fontSize="14"
                              fontWeight="bold"
                            >
                              ${day.total}
                            </motion.text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Universe Legend */}
                  <div className="flex flex-wrap justify-center gap-6 mb-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 animate-pulse"></div>
                      <span className="text-slate-200 font-medium">Ads Cosmos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      <span className="text-slate-200 font-medium">Social Cosmos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      <span className="text-slate-200 font-medium">Site Cosmos</span>
                    </div>
                  </div>

                  {/* Daily Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {singleWeekData.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 15px 35px rgba(45, 58, 74, 0.2)"
                        }}
                        className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-slate-600/30 transition-all duration-300"
                      >
                        <div className="text-center">
                          <div className="text-xs font-bold text-slate-300 mb-1">{day.short}</div>
                          <div className="text-xs text-slate-400 mb-2">{day.date}</div>
                          <div className="text-lg font-bold text-white mb-2">${day.total}</div>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between text-slate-300">
                              <span>Tasks:</span>
                              <span className="font-medium">{day.tasks}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Efficiency:</span>
                              <span className="font-medium text-green-400">{day.efficiency}%</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Detailed Earnings Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
              }}
              className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Detailed Cosmic Earnings</h3>
                <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                  <Filter className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                  <span className="text-xs md:text-sm text-secondary">Filter & Sort</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary">
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Date</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Universe</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Tasks</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Amount</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base hidden sm:table-cell">Breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningsData.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.01,
                          y: -1
                        }}
                        className="table-row-base border-b border-secondary cursor-pointer"
                      >
                        <td className="py-3 px-2 md:px-4 text-primary font-medium text-sm md:text-base">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <span className="px-2 md:px-3 py-1 bg-soft-pink/20 text-primary rounded-full text-xs md:text-sm font-medium border border-soft-pink/20">
                            All Cosmos
                          </span>
                        </td>
                        <td className="py-3 px-2 md:px-4 text-primary font-medium text-sm md:text-base">{item.tasks}</td>
                        <td className="py-3 px-2 md:px-4 font-bold text-primary text-sm md:text-base">${item.amount}</td>
                        <td className="py-3 px-2 md:px-4 hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1 md:gap-2 text-xs">
                            <span className="px-2 py-1 rounded text-white font-medium" style={{ backgroundColor: chartColors.ads }}>
                              Ads: ${item.ads}
                            </span>
                            <span className="px-2 py-1 rounded text-white font-medium" style={{ backgroundColor: chartColors.social }}>
                              Social: ${item.social}
                            </span>
                            <span className="px-2 py-1 rounded text-white font-medium" style={{ backgroundColor: chartColors.sites }}>
                              Sites: ${item.sites}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
        </div>
      </div>
  );
});

export default EarningsInterface;