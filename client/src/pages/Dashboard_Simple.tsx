import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target,
  Activity,
  Clock,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { CosmicDollarSign } from '../components/icons/CosmicIcons';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalEarnings: 1547.50,
    todayEarnings: 102.21,
    totalTasks: 189,
    completedTasks: 183,
    activeUsers: 12847,
    successRate: 96.8
  });

  const chartColors = {
    ads: '#E91E63',
    social: '#2196F3',
    sites: '#009688',
    total: '#9C27B0'
  };

  const [earningsData] = useState([
    { name: 'Mon', earnings: 89.50 },
    { name: 'Tue', earnings: 104.00 },
    { name: 'Wed', earnings: 96.50 },
    { name: 'Thu', earnings: 107.50 },
    { name: 'Fri', earnings: 109.50 },
    { name: 'Sat', earnings: 115.00 },
    { name: 'Sun', earnings: 93.50 }
  ]);

  const [taskData] = useState([
    { name: 'Ads Cosmos', completed: 67, pending: 8 },
    { name: 'Social Cosmos', completed: 45, pending: 3 },
    { name: 'Site Cosmos', completed: 77, pending: 6 },
    { name: 'Other Tasks', completed: 12, pending: 2 }
  ]);

  const statCards = useMemo(() => [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toFixed(2)}`,
      icon: CosmicDollarSign,
      bgColor: "bg-soft-pink",
      trend: "+15.2%"
    },
    {
      title: "Today's Earnings",
      value: `$${stats.todayEarnings.toFixed(2)}`,
      icon: TrendingUp,
      bgColor: "bg-pale-blue",
      trend: "+12.8%"
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks.toLocaleString(),
      icon: Target,
      bgColor: "bg-light-teal",
      trend: "+8.7%"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: Award,
      bgColor: "bg-muted-yellow",
      trend: "+3.1%"
    }
  ], [stats]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary border border-primary rounded-lg p-3 shadow-lg">
          <p className="text-primary font-medium">{`${label}: $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary border border-primary rounded-lg p-3 shadow-lg">
          <p className="text-primary font-medium">{label}</p>
          <p className="text-secondary">{`Completed: ${payload[0].value}`}</p>
          <p className="text-secondary">{`Pending: ${payload[1]?.value || 0}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-secondary">Welcome back! Here's your cosmic earning overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${card.bgColor}`}>
                  <card.icon className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" color="#2D2D2D" />
                </div>
                <span className="text-xs md:text-sm font-medium text-green-600 bg-green-50 px-2 md:px-3 py-1 rounded-full border border-green-100">
                  {card.trend}
                </span>
              </div>
              <div className="text-lg md:text-2xl font-bold text-primary mb-1">{card.value}</div>
              <div className="text-xs md:text-sm text-secondary">{card.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Weekly Earnings Chart */}
          <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Weekly Cosmic Earnings</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke={chartColors.ads}
                  strokeWidth={3}
                  fill={chartColors.ads}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Task Completion Chart */}
          <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Cosmic Task Completion</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="completed" fill={chartColors.sites} radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill={chartColors.total} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-secondary rounded-xl p-4 md:p-6 border border-primary shadow-primary">
          <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">Recently Cosmic Activity</h3>
          <div className="space-y-3 md:space-y-4">
            {[
              { action: 'Completed Social Media Task', time: '2 minutes ago', amount: '$12.50', status: 'completed', type: 'social' },
              { action: 'Viewed Advertisement', time: '8 minutes ago', amount: '$3.25', status: 'completed', type: 'ads' },
              { action: 'Site Visit Task', time: '15 minutes ago', amount: '$8.75', status: 'pending', type: 'sites' },
              { action: 'Social Engagement', time: '23 minutes ago', amount: '$5.00', status: 'completed', type: 'social' },
              { action: 'Advertisement Click', time: '31 minutes ago', amount: '$2.50', status: 'completed', type: 'ads' }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 md:p-4 bg-tertiary rounded-lg border border-primary hover:bg-quaternary transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                  <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg ${
                    activity.type === 'social' ? 'bg-pale-blue' :
                    activity.type === 'ads' ? 'bg-soft-pink' : 'bg-light-teal'
                  }`}>
                    <span className="text-[#2D2D2D] text-xs md:text-sm font-bold">
                      {activity.type === 'ads' ? '📺' :
                       activity.type === 'social' ? '❤️' : '🌐'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-medium text-primary text-sm md:text-base truncate">{activity.action}</div>
                    <div className="text-xs md:text-sm text-secondary">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2 min-w-0">
                  <div className="font-bold text-primary text-sm md:text-base mb-1">{activity.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${
                    activity.status === 'completed' 
                      ? 'bg-green-50 text-green-800 border-green-200' 
                      : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;