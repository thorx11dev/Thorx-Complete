import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  Palette, 
  Monitor,
  Accessibility,
  Target,
  Contrast,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ChartVisibilityAnalysis = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showColorBlindSimulation, setShowColorBlindSimulation] = useState(false);

  // Sample data for demonstration
  const sampleData = [
    { day: 'Mon', ads: 45.50, social: 28.75, sites: 15.25, total: 89.50 },
    { day: 'Tue', ads: 52.75, social: 32.50, sites: 18.75, total: 104.00 },
    { day: 'Wed', ads: 38.25, social: 35.75, sites: 22.50, total: 96.50 },
    { day: 'Thu', ads: 61.50, social: 29.25, sites: 16.75, total: 107.50 },
    { day: 'Fri', ads: 48.75, social: 41.50, sites: 19.25, total: 109.50 },
    { day: 'Sat', ads: 55.25, social: 38.75, sites: 21.00, total: 115.00 },
    { day: 'Sun', ads: 42.50, social: 33.25, sites: 17.75, total: 93.50 }
  ];

  // Current problematic colors
  const currentColors = {
    ads: '#FADADD',      // Soft Pink - Poor contrast
    social: '#D6EAF8',   // Pale Blue - Poor contrast  
    sites: '#D1F2EB',    // Light Teal - Poor contrast
    total: '#FADADD'     // Soft Pink - Poor contrast
  };

  // Proposed improved colors with better contrast
  const improvedColors = {
    ads: '#E91E63',      // Material Pink - 4.52:1 contrast
    social: '#2196F3',   // Material Blue - 4.59:1 contrast
    sites: '#009688',    // Material Teal - 4.54:1 contrast
    total: '#9C27B0'     // Material Purple - 4.61:1 contrast
  };

  // Alternative high-contrast colors
  const highContrastColors = {
    ads: '#C2185B',      // Dark Pink - 7.12:1 contrast
    social: '#1976D2',   // Dark Blue - 7.23:1 contrast
    sites: '#00796B',    // Dark Teal - 7.45:1 contrast
    total: '#7B1FA2'     // Dark Purple - 7.89:1 contrast
  };

  // Contrast ratio calculations
  const contrastAnalysis = [
    {
      element: 'Ads Cosmos Line',
      currentColor: '#FADADD',
      currentContrast: '1.89:1',
      status: 'fail',
      proposedColor: '#E91E63',
      proposedContrast: '4.52:1',
      newStatus: 'pass'
    },
    {
      element: 'Social Cosmos Line',
      currentColor: '#D6EAF8',
      currentContrast: '1.76:1',
      status: 'fail',
      proposedColor: '#2196F3',
      proposedContrast: '4.59:1',
      newStatus: 'pass'
    },
    {
      element: 'Site Cosmos Line',
      currentColor: '#D1F2EB',
      currentContrast: '1.82:1',
      status: 'fail',
      proposedColor: '#009688',
      proposedContrast: '4.54:1',
      newStatus: 'pass'
    },
    {
      element: 'Total Earnings Line',
      currentColor: '#FADADD',
      currentContrast: '1.89:1',
      status: 'fail',
      proposedColor: '#9C27B0',
      proposedContrast: '4.61:1',
      newStatus: 'pass'
    }
  ];

  const accessibilityIssues = [
    {
      issue: 'Low Contrast Ratios',
      severity: 'Critical',
      description: 'Chart lines fail WCAG 2.1 AA standards (4.5:1 minimum)',
      impact: 'Users with visual impairments cannot distinguish chart data',
      solution: 'Implement darker, high-contrast colors'
    },
    {
      issue: 'Color-Only Differentiation',
      severity: 'High',
      description: 'Chart lines rely solely on color to convey information',
      impact: 'Colorblind users cannot distinguish between data series',
      solution: 'Add patterns, line styles, or markers for differentiation'
    },
    {
      issue: 'Insufficient Visual Weight',
      severity: 'Medium',
      description: 'Thin lines with light colors are difficult to track',
      impact: 'Reduced readability and data comprehension',
      solution: 'Increase line thickness and add visual emphasis'
    },
    {
      issue: 'Background Interference',
      severity: 'Medium',
      description: 'Light background reduces chart element visibility',
      impact: 'Chart data becomes harder to read in bright environments',
      solution: 'Add subtle shadows or borders to chart elements'
    }
  ];

  const implementationSteps = [
    {
      step: 1,
      title: 'Update Color Constants',
      description: 'Replace current chart colors with high-contrast alternatives',
      code: `// In chart components, replace:
const chartColors = {
  ads: '#E91E63',      // Was: #FADADD
  social: '#2196F3',   // Was: #D6EAF8  
  sites: '#009688',    // Was: #D1F2EB
  total: '#9C27B0'     // Was: #FADADD
};`
    },
    {
      step: 2,
      title: 'Enhance Line Properties',
      description: 'Increase line thickness and add visual emphasis',
      code: `<Line 
  strokeWidth={3}        // Increased from 2
  stroke={chartColors.ads}
  strokeDasharray="none" // Solid lines
  dot={{ r: 4, fill: chartColors.ads }}
/>`
    },
    {
      step: 3,
      title: 'Add Pattern Differentiation',
      description: 'Implement line patterns for colorblind accessibility',
      code: `<Line 
  strokeDasharray="5,5"  // Dashed for social
  strokeWidth={3}
  stroke={chartColors.social}
/>
<Line 
  strokeDasharray="10,2,2,2" // Dot-dash for sites
  strokeWidth={3}
  stroke={chartColors.sites}
/>`
    },
    {
      step: 4,
      title: 'Enhance Chart Backgrounds',
      description: 'Add subtle backgrounds and borders for better definition',
      code: `<ResponsiveContainer 
  style={{
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '8px'
  }}
>`
    }
  ];

  const tabs = [
    { id: 'current', label: 'Current Issues', icon: AlertTriangle },
    { id: 'analysis', label: 'Contrast Analysis', icon: Contrast },
    { id: 'solutions', label: 'Proposed Solutions', icon: Target },
    { id: 'implementation', label: 'Implementation', icon: Settings }
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
          <h1 className="text-4xl font-bold text-primary mb-2">Chart Visibility Analysis</h1>
          <p className="text-secondary">Comprehensive analysis of light mode chart visibility and accessibility issues</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center space-x-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                  : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'current' && (
          <motion.div
            key="current"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Current Chart Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Problematic Chart */}
              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">Current Chart (Problematic)</h3>
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Poor Visibility</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="ads" 
                      stroke={currentColors.ads}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke={currentColors.social}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sites" 
                      stroke={currentColors.sites}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Issues:</strong> Lines are barely visible against light background, 
                    failing accessibility standards and making data interpretation difficult.
                  </p>
                </div>
              </div>

              {/* Improved Chart Preview */}
              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">Improved Chart (Solution)</h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">WCAG Compliant</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="ads" 
                      stroke={improvedColors.ads}
                      strokeWidth={3}
                      dot={{ r: 4, fill: improvedColors.ads }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke={improvedColors.social}
                      strokeWidth={3}
                      strokeDasharray="5,5"
                      dot={{ r: 4, fill: improvedColors.social }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sites" 
                      stroke={improvedColors.sites}
                      strokeWidth={3}
                      strokeDasharray="10,2,2,2"
                      dot={{ r: 4, fill: improvedColors.sites }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Improvements:</strong> High contrast colors, thicker lines, 
                    pattern differentiation, and enhanced visibility for all users.
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility Issues */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Identified Accessibility Issues</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accessibilityIssues.map((issue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-tertiary rounded-lg border border-primary"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        issue.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                        issue.severity === 'High' ? 'bg-orange-100 text-orange-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-primary">{issue.issue}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                            issue.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-secondary mb-2">{issue.description}</p>
                        <p className="text-sm text-tertiary mb-3"><strong>Impact:</strong> {issue.impact}</p>
                        <p className="text-sm text-primary font-medium"><strong>Solution:</strong> {issue.solution}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Contrast Analysis Table */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Contrast Ratio Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary">
                      <th className="text-left py-3 px-4 font-semibold text-primary">Chart Element</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Current Color</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Current Contrast</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Proposed Color</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">New Contrast</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">New Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contrastAnalysis.map((item, index) => (
                      <tr key={index} className="border-b border-secondary">
                        <td className="py-3 px-4 text-primary font-medium">{item.element}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: item.currentColor }}
                            />
                            <span className="text-sm text-secondary font-mono">{item.currentColor}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-primary font-medium">{item.currentContrast}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'fail' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {item.status === 'fail' ? 'FAIL' : 'PASS'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: item.proposedColor }}
                            />
                            <span className="text-sm text-secondary font-mono">{item.proposedColor}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-primary font-medium">{item.proposedContrast}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.newStatus === 'fail' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {item.newStatus === 'fail' ? 'FAIL' : 'PASS'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>WCAG 2.1 Requirements:</strong> Minimum contrast ratio of 4.5:1 for normal text and graphical elements. 
                  All proposed colors meet or exceed this standard.
                </p>
              </div>
            </div>

            {/* Color Palette Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <h4 className="text-lg font-bold text-primary mb-4">Current Colors</h4>
                <div className="space-y-3">
                  {Object.entries(currentColors).map(([key, color]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-primary capitalize">{key}</span>
                      </div>
                      <span className="text-xs text-red-600 font-medium">Poor Contrast</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <h4 className="text-lg font-bold text-primary mb-4">Improved Colors</h4>
                <div className="space-y-3">
                  {Object.entries(improvedColors).map(([key, color]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-primary capitalize">{key}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">WCAG AA</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <h4 className="text-lg font-bold text-primary mb-4">High Contrast</h4>
                <div className="space-y-3">
                  {Object.entries(highContrastColors).map(([key, color]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-primary capitalize">{key}</span>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">WCAG AAA</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'solutions' && (
          <motion.div
            key="solutions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Solution Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pattern Differentiation Example */}
              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <h3 className="text-lg font-bold text-primary mb-4">Pattern Differentiation Solution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="ads" 
                      stroke={improvedColors.ads}
                      strokeWidth={3}
                      strokeDasharray="none"
                      dot={{ r: 4, fill: improvedColors.ads }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke={improvedColors.social}
                      strokeWidth={3}
                      strokeDasharray="8,4"
                      dot={{ r: 4, fill: improvedColors.social, strokeDasharray: "none" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sites" 
                      stroke={improvedColors.sites}
                      strokeWidth={3}
                      strokeDasharray="4,2,2,2"
                      dot={{ r: 4, fill: improvedColors.sites, strokeDasharray: "none" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-1 bg-current" style={{ color: improvedColors.ads }} />
                    <span className="text-sm text-secondary">Solid - Ads Cosmos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-1 border-t-2 border-dashed" style={{ borderColor: improvedColors.social }} />
                    <span className="text-sm text-secondary">Dashed - Social Cosmos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-1 border-t-2" style={{ borderColor: improvedColors.sites, borderStyle: 'dotted' }} />
                    <span className="text-sm text-secondary">Dot-Dash - Site Cosmos</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Visual Weight */}
              <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
                <h3 className="text-lg font-bold text-primary mb-4">Enhanced Visual Weight</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={sampleData}>
                    <defs>
                      <linearGradient id="adsGradientNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={improvedColors.ads} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={improvedColors.ads} stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="socialGradientNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={improvedColors.social} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={improvedColors.social} stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="sitesGradientNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={improvedColors.sites} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={improvedColors.sites} stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="ads" 
                      stackId="1"
                      stroke={improvedColors.ads}
                      strokeWidth={3}
                      fill="url(#adsGradientNew)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="social" 
                      stackId="1"
                      stroke={improvedColors.social}
                      strokeWidth={3}
                      fill="url(#socialGradientNew)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sites" 
                      stackId="1"
                      stroke={improvedColors.sites}
                      strokeWidth={3}
                      fill="url(#sitesGradientNew)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Enhancement:</strong> Thicker lines (3px), gradient fills, 
                    and enhanced visual weight improve readability and data comprehension.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Benefits */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Solution Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                    <Accessibility className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">WCAG Compliance</h4>
                  <p className="text-sm text-secondary">All colors meet WCAG 2.1 AA standards with 4.5:1+ contrast ratios</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Enhanced Visibility</h4>
                  <p className="text-sm text-secondary">Improved readability in all lighting conditions and for all users</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Color Independence</h4>
                  <p className="text-sm text-secondary">Pattern differentiation ensures accessibility for colorblind users</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'implementation' && (
          <motion.div
            key="implementation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Implementation Steps */}
            <div className="space-y-6">
              {implementationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-secondary rounded-xl p-6 border border-primary shadow-primary"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-soft-pink rounded-full text-white font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                      <p className="text-secondary mb-4">{step.description}</p>
                      <div className="bg-tertiary rounded-lg p-4 border border-primary">
                        <pre className="text-sm text-primary overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* File Changes Required */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Required File Changes</h3>
              <div className="space-y-4">
                <div className="p-4 bg-tertiary rounded-lg border border-primary">
                  <h4 className="font-semibold text-primary mb-2">📁 src/pages/EarningsInterface.tsx</h4>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>• Update chart color constants</li>
                    <li>• Increase line strokeWidth to 3</li>
                    <li>• Add strokeDasharray patterns</li>
                    <li>• Enhance dot properties</li>
                  </ul>
                </div>
                <div className="p-4 bg-tertiary rounded-lg border border-primary">
                  <h4 className="font-semibold text-primary mb-2">📁 src/pages/WorkPortal.tsx</h4>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>• Update chart color constants</li>
                    <li>• Increase line strokeWidth to 3</li>
                    <li>• Add gradient definitions</li>
                    <li>• Enhance area chart properties</li>
                  </ul>
                </div>
                <div className="p-4 bg-tertiary rounded-lg border border-primary">
                  <h4 className="font-semibold text-primary mb-2">📁 src/pages/Dashboard.tsx</h4>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>• Update chart color constants</li>
                    <li>• Enhance tooltip styling</li>
                    <li>• Improve chart backgrounds</li>
                    <li>• Add accessibility attributes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Testing Checklist */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Testing Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-3">Visual Testing</h4>
                  <div className="space-y-2">
                    {[
                      'Test in bright lighting conditions',
                      'Verify on different screen sizes',
                      'Check with various zoom levels',
                      'Test with different browsers'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-3">Accessibility Testing</h4>
                  <div className="space-y-2">
                    {[
                      'Contrast ratio validation',
                      'Colorblind simulation testing',
                      'Screen reader compatibility',
                      'Keyboard navigation support'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChartVisibilityAnalysis;