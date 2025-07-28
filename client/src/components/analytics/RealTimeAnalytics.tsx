import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Calendar, 
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  RefreshCw,
  Zap,
  Target,
  Award,
  Clock,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Minus,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  ComposedChart,
  ReferenceLine
} from 'recharts';

interface AnalyticsData {
  timestamp: string;
  date: string;
  time: string;
  adsEarnings: number;
  socialEarnings: number;
  sitesEarnings: number;
  totalEarnings: number;
  tasksCompleted: number;
  activeUsers: number;
  conversionRate: number;
  peakHour: boolean;
}

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  trend: number[];
}

const RealTimeAnalytics: React.FC = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [timeframe, setTimeframe] = useState('24h');
  const [viewType, setViewType] = useState('combined');
  const [selectedMetric, setSelectedMetric] = useState('totalEarnings');
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Generate realistic time-series data
  const generateDataPoint = useCallback((baseTime: Date, index: number): AnalyticsData => {
    const time = new Date(baseTime.getTime() + index * 60000); // 1-minute intervals
    const hour = time.getHours();
    const isPeakHour = hour >= 18 && hour <= 22; // Peak earning hours
    
    // Base earnings with realistic fluctuations
    const baseAds = 2.5 + Math.sin(index * 0.1) * 0.8 + (isPeakHour ? 1.2 : 0);
    const baseSocial = 1.8 + Math.cos(index * 0.15) * 0.6 + (isPeakHour ? 0.8 : 0);
    const baseSites = 1.2 + Math.sin(index * 0.08) * 0.4 + (isPeakHour ? 0.5 : 0);
    
    // Add random variations
    const adsEarnings = Math.max(0, baseAds + (Math.random() - 0.5) * 1.0);
    const socialEarnings = Math.max(0, baseSocial + (Math.random() - 0.5) * 0.8);
    const sitesEarnings = Math.max(0, baseSites + (Math.random() - 0.5) * 0.6);
    
    return {
      timestamp: time.toISOString(),
      date: time.toLocaleDateString(),
      time: time.toLocaleTimeString(),
      adsEarnings: Number(adsEarnings.toFixed(2)),
      socialEarnings: Number(socialEarnings.toFixed(2)),
      sitesEarnings: Number(sitesEarnings.toFixed(2)),
      totalEarnings: Number((adsEarnings + socialEarnings + sitesEarnings).toFixed(2)),
      tasksCompleted: Math.floor(8 + Math.random() * 12),
      activeUsers: Math.floor(150 + Math.random() * 50),
      conversionRate: Number((85 + Math.random() * 10).toFixed(1)),
      peakHour: isPeakHour
    };
  }, []);

  // Initialize data
  useEffect(() => {
    const now = new Date();
    const initialData: AnalyticsData[] = [];
    
    // Generate last 24 hours of data (1440 minutes)
    for (let i = -1440; i <= 0; i++) {
      initialData.push(generateDataPoint(now, i));
    }
    
    setData(initialData);
  }, [generateDataPoint]);

  // Real-time data updates
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint = generateDataPoint(now, 0);
      
      setData(prevData => {
        const newData = [...prevData.slice(1), newDataPoint];
        return newData;
      });
      
      setLastUpdate(now);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isRealTime, generateDataPoint]);

  // Calculate metrics
  const calculateMetrics = useCallback((): MetricCard[] => {
    if (data.length === 0) return [];

    const recent = data.slice(-60); // Last hour
    const previous = data.slice(-120, -60); // Previous hour
    
    const currentTotal = recent.reduce((sum, d) => sum + d.totalEarnings, 0);
    const previousTotal = previous.reduce((sum, d) => sum + d.totalEarnings, 0);
    const totalChange = ((currentTotal - previousTotal) / previousTotal) * 100;

    const currentAds = recent.reduce((sum, d) => sum + d.adsEarnings, 0);
    const previousAds = previous.reduce((sum, d) => sum + d.adsEarnings, 0);
    const adsChange = ((currentAds - previousAds) / previousAds) * 100;

    const currentTasks = recent.reduce((sum, d) => sum + d.tasksCompleted, 0);
    const previousTasks = previous.reduce((sum, d) => sum + d.tasksCompleted, 0);
    const tasksChange = ((currentTasks - previousTasks) / previousTasks) * 100;

    const avgConversion = recent.reduce((sum, d) => sum + d.conversionRate, 0) / recent.length;
    const prevAvgConversion = previous.reduce((sum, d) => sum + d.conversionRate, 0) / previous.length;
    const conversionChange = ((avgConversion - prevAvgConversion) / prevAvgConversion) * 100;

    return [
      {
        title: "Hourly Earnings",
        value: `$${currentTotal.toFixed(2)}`,
        change: totalChange,
        changeType: totalChange > 0 ? 'increase' : totalChange < 0 ? 'decrease' : 'neutral',
        icon: DollarSign,
        color: "bg-soft-pink",
        trend: recent.slice(-10).map(d => d.totalEarnings)
      },
      {
        title: "Ads Performance",
        value: `$${currentAds.toFixed(2)}`,
        change: adsChange,
        changeType: adsChange > 0 ? 'increase' : adsChange < 0 ? 'decrease' : 'neutral',
        icon: TrendingUp,
        color: "bg-pale-blue",
        trend: recent.slice(-10).map(d => d.adsEarnings)
      },
      {
        title: "Tasks Completed",
        value: currentTasks.toString(),
        change: tasksChange,
        changeType: tasksChange > 0 ? 'increase' : tasksChange < 0 ? 'decrease' : 'neutral',
        icon: Target,
        color: "bg-light-teal",
        trend: recent.slice(-10).map(d => d.tasksCompleted)
      },
      {
        title: "Conversion Rate",
        value: `${avgConversion.toFixed(1)}%`,
        change: conversionChange,
        changeType: conversionChange > 0 ? 'increase' : conversionChange < 0 ? 'decrease' : 'neutral',
        icon: Award,
        color: "bg-muted-yellow",
        trend: recent.slice(-10).map(d => d.conversionRate)
      }
    ];
  }, [data]);

  const metrics = calculateMetrics();

  // Filter data based on timeframe
  const getFilteredData = () => {
    const now = new Date();
    let filterTime: number;
    
    switch (timeframe) {
      case '1h':
        filterTime = 60;
        break;
      case '6h':
        filterTime = 360;
        break;
      case '24h':
        filterTime = 1440;
        break;
      case '7d':
        filterTime = 10080;
        break;
      default:
        filterTime = 1440;
    }
    
    return data.slice(-filterTime);
  };

  const filteredData = getFilteredData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border border-primary rounded-lg p-4 shadow-primary"
        >
          <p className="text-primary font-semibold mb-2">{data.time}</p>
          <div className="space-y-1">
            <p className="text-secondary font-medium">
              <span className="inline-block w-3 h-3 bg-soft-pink rounded-full mr-2"></span>
              Ads: ${data.adsEarnings}
            </p>
            <p className="text-secondary font-medium">
              <span className="inline-block w-3 h-3 bg-pale-blue rounded-full mr-2"></span>
              Social: ${data.socialEarnings}
            </p>
            <p className="text-secondary font-medium">
              <span className="inline-block w-3 h-3 bg-light-teal rounded-full mr-2"></span>
              Sites: ${data.sitesEarnings}
            </p>
            <div className="border-t border-primary pt-1 mt-2">
              <p className="text-primary font-bold">
                Total: ${data.totalEarnings}
              </p>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const handleExport = () => {
    const csvData = [
      ['Timestamp', 'Ads Earnings', 'Social Earnings', 'Sites Earnings', 'Total Earnings', 'Tasks Completed'],
      ...filteredData.map(d => [
        d.timestamp,
        d.adsEarnings,
        d.socialEarnings,
        d.sitesEarnings,
        d.totalEarnings,
        d.tasksCompleted
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cosmic-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return ArrowUp;
      case 'decrease': return ArrowDown;
      default: return Minus;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">Real-time Cosmic Analytics</h3>
          <div className="flex items-center space-x-4 text-sm text-secondary">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span>{isRealTime ? 'Live' : 'Paused'}</span>
            </div>
            <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Real-time Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRealTime(!isRealTime)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${
              isRealTime 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-gray-50 text-gray-800 border-gray-200'
            }`}
          >
            {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRealTime ? 'Pause' : 'Resume'}</span>
          </motion.button>

          {/* Timeframe Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-secondary border border-primary rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-soft-pink/50"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>

          {/* View Type Selector */}
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="bg-secondary border border-primary rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-soft-pink/50"
          >
            <option value="combined">Combined View</option>
            <option value="stacked">Stacked Areas</option>
            <option value="individual">Individual Lines</option>
          </select>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="bg-soft-pink hover:bg-soft-pink/80 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 border border-soft-pink/20 transition-all duration-200"
            style={{ color: '#2D2D2D' }}
          >
            <Download className="w-4 h-4" style={{ color: '#2D2D2D' }} />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Real-time Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const ChangeIcon = getChangeIcon(metric.changeType);
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
              }}
              className="bg-secondary rounded-xl p-6 border border-primary transition-all duration-300 shadow-primary cursor-pointer"
              onClick={() => setSelectedMetric(metric.title.toLowerCase().replace(' ', ''))}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-6 h-6 text-[#2D2D2D]" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  <ChangeIcon className="w-3 h-3" />
                  <span>{Math.abs(metric.change).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-secondary mb-3">{metric.title}</div>
              
              {/* Mini Trend Chart */}
              <div className="h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.trend.map((value, i) => ({ value, index: i }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={metric.color.includes('soft-pink') ? '#FADADD' : 
                             metric.color.includes('pale-blue') ? '#D6EAF8' :
                             metric.color.includes('light-teal') ? '#D1F2EB' : '#FCF3CF'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-secondary rounded-xl p-6 border border-primary shadow-primary"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-primary">Cosmic Distribution Analytics</h4>
          <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
            <Activity className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">
              {filteredData.length} data points
            </span>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'stacked' ? (
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="adsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FADADD" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FADADD" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6EAF8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D6EAF8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="sitesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D1F2EB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D1F2EB" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="adsEarnings" 
                  stackId="1"
                  stroke="#FADADD" 
                  fill="url(#adsGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="socialEarnings" 
                  stackId="1"
                  stroke="#D6EAF8" 
                  fill="url(#socialGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="sitesEarnings" 
                  stackId="1"
                  stroke="#D1F2EB" 
                  fill="url(#sitesGradient)" 
                />
              </AreaChart>
            ) : viewType === 'individual' ? (
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="adsEarnings" 
                  stroke="#FADADD" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="socialEarnings" 
                  stroke="#D6EAF8" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="sitesEarnings" 
                  stroke="#D1F2EB" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="totalEarnings" 
                  fill="url(#totalGradient)" 
                  stroke="#FADADD"
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="adsEarnings" 
                  stroke="#FADADD" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="socialEarnings" 
                  stroke="#D6EAF8" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="sitesEarnings" 
                  stroke="#D1F2EB" 
                  strokeWidth={2}
                  dot={false}
                />
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FADADD" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FADADD" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-primary">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-soft-pink rounded-full"></div>
            <span className="text-sm text-secondary">Ads Cosmos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pale-blue rounded-full"></div>
            <span className="text-sm text-secondary">Social Cosmos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-light-teal rounded-full"></div>
            <span className="text-sm text-secondary">Site Cosmos</span>
          </div>
        </div>
      </motion.div>

      {/* Peak Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Peak Hours Analysis */}
        <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
          <h4 className="text-lg font-bold text-primary mb-4">Peak Performance Hours</h4>
          <div className="space-y-3">
            {[
              { time: "6:00 PM - 10:00 PM", performance: "Peak", earnings: "$45.50", color: "bg-green-500" },
              { time: "12:00 PM - 2:00 PM", performance: "High", earnings: "$32.25", color: "bg-yellow-500" },
              { time: "8:00 AM - 10:00 AM", performance: "Medium", earnings: "$28.75", color: "bg-blue-500" },
              { time: "10:00 PM - 6:00 AM", performance: "Low", earnings: "$15.50", color: "bg-gray-500" }
            ].map((period, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-tertiary rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${period.color}`}></div>
                  <div>
                    <div className="font-medium text-primary">{period.time}</div>
                    <div className="text-sm text-secondary">{period.performance} Activity</div>
                  </div>
                </div>
                <div className="font-bold text-primary">{period.earnings}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparative Analysis */}
        <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
          <h4 className="text-lg font-bold text-primary mb-4">Period Comparison</h4>
          <div className="space-y-4">
            <div className="p-4 bg-tertiary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">vs. Previous Hour</span>
                <span className="text-green-600 font-medium flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +12.5%
                </span>
              </div>
              <div className="text-lg font-bold text-primary">$89.50 → $100.75</div>
            </div>
            
            <div className="p-4 bg-tertiary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">vs. Same Time Yesterday</span>
                <span className="text-green-600 font-medium flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +8.3%
                </span>
              </div>
              <div className="text-lg font-bold text-primary">$93.00 → $100.75</div>
            </div>
            
            <div className="p-4 bg-tertiary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">vs. Weekly Average</span>
                <span className="text-red-600 font-medium flex items-center">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  -2.1%
                </span>
              </div>
              <div className="text-lg font-bold text-primary">$102.90 → $100.75</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RealTimeAnalytics;