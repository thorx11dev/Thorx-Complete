import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Monitor, 
  Layout, 
  Grid, 
  Layers,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  DollarSign,
  TrendingUp,
  Award,
  Activity,
  Clock,
  Users,
  Star
} from 'lucide-react';

const MobileLayoutAnalysis = () => {
  const [activeSection, setActiveSection] = useState('analysis');

  // Work page mobile layout analysis
  const workPageAnalysis = {
    successFactors: [
      {
        factor: "Icon-First Design",
        description: "Large, colorful icons (48px) lead each component",
        measurement: "48px × 48px icons with 16px spacing",
        impact: "Immediate visual recognition and touch-friendly targets"
      },
      {
        factor: "Vertical Card Stack",
        description: "Single-column layout with consistent card spacing",
        measurement: "16px vertical gaps, 24px horizontal padding",
        impact: "Optimal thumb navigation and content scanning"
      },
      {
        factor: "Grouped Information",
        description: "Related data clustered with clear visual hierarchy",
        measurement: "12px internal spacing, 8px between related items",
        impact: "Reduced cognitive load and faster comprehension"
      },
      {
        factor: "Touch-Optimized Actions",
        description: "Buttons sized for easy thumb interaction",
        measurement: "Minimum 44px touch targets with 8px margins",
        impact: "Improved usability and reduced interaction errors"
      }
    ],
    currentLayout: {
      performanceMetrics: {
        layout: "2×2 grid on mobile",
        spacing: "16px gaps",
        iconSize: "40px",
        touchTarget: "Full card (min 44px height)",
        issues: ["Cramped on small screens", "Text can be hard to read"]
      },
      charts: {
        layout: "Full-width stacked",
        spacing: "24px vertical gaps",
        height: "250px each",
        issues: ["Charts too small on mobile", "Legend text tiny"]
      },
      navigation: {
        layout: "Horizontal tabs",
        spacing: "8px gaps",
        touchTarget: "Full tab width",
        issues: ["Tabs can overflow on small screens"]
      }
    }
  };

  const proposedLayouts = {
    dashboard: {
      title: "Dashboard Mobile Layout Optimization",
      changes: [
        {
          component: "Performance Metrics",
          current: "2×2 grid layout",
          proposed: "Single column stack with large icons",
          specifications: {
            layout: "Vertical stack, full width",
            cardHeight: "80px minimum",
            iconSize: "48px × 48px",
            spacing: "12px between cards",
            padding: "20px internal padding",
            touchTarget: "Full card width × 80px height"
          },
          benefits: ["Easier reading", "Better touch targets", "Clearer hierarchy"]
        },
        {
          component: "Charts Section",
          current: "Side-by-side charts",
          proposed: "Stacked charts with enhanced mobile view",
          specifications: {
            layout: "Single column, full width",
            chartHeight: "200px each (reduced from 250px)",
            spacing: "20px between charts",
            legendPosition: "Bottom, horizontal layout",
            fontSize: "14px minimum for labels",
            touchTarget: "Chart interaction zones 44px minimum"
          },
          benefits: ["Better chart readability", "Larger touch zones", "Optimized legend placement"]
        },
        {
          component: "Recent Activity",
          current: "Table-like rows",
          proposed: "Card-based activity feed",
          specifications: {
            layout: "Vertical card stack",
            cardHeight: "72px minimum",
            iconSize: "32px × 32px",
            spacing: "8px between cards",
            padding: "16px internal",
            touchTarget: "Full card area"
          },
          benefits: ["Improved scannability", "Better touch interaction", "Clearer status indicators"]
        }
      ]
    },
    earnings: {
      title: "Earnings Mobile Layout Optimization",
      changes: [
        {
          component: "Summary Cards",
          current: "4-column grid",
          proposed: "2×2 grid with larger cards",
          specifications: {
            layout: "2×2 grid on mobile",
            cardHeight: "100px minimum",
            iconSize: "48px × 48px",
            spacing: "12px gaps",
            padding: "20px internal",
            touchTarget: "Full card (100px × 160px minimum)"
          },
          benefits: ["Larger touch targets", "Better readability", "Clearer value hierarchy"]
        },
        {
          component: "Earnings Chart",
          current: "Complex multi-line chart",
          proposed: "Simplified mobile chart with toggle",
          specifications: {
            layout: "Full width, single chart",
            chartHeight: "220px",
            lineWidth: "3px (increased from 2px)",
            dotSize: "6px radius",
            spacing: "24px margins",
            touchTarget: "Data point interaction 44px radius"
          },
          benefits: ["Clearer line visibility", "Better data point interaction", "Simplified legend"]
        },
        {
          component: "Performance Breakdown",
          current: "Side panel layout",
          proposed: "Integrated card stack",
          specifications: {
            layout: "Vertical stack below chart",
            cardHeight: "64px minimum",
            iconSize: "40px × 40px",
            spacing: "8px between items",
            padding: "16px internal",
            touchTarget: "Full card width"
          },
          benefits: ["Better integration", "Improved hierarchy", "Enhanced touch interaction"]
        }
      ]
    }
  };

  const implementationSteps = [
    {
      step: 1,
      title: "Update CSS Grid Breakpoints",
      description: "Modify responsive grid layouts for mobile optimization",
      code: `/* Mobile-first responsive grids */
@media (max-width: 768px) {
  .performance-metrics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .earnings-summary-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .chart-container {
    height: 200px;
    margin: 20px 0;
  }
}`
    },
    {
      step: 2,
      title: "Enhance Touch Targets",
      description: "Ensure all interactive elements meet 44px minimum",
      code: `/* Touch-optimized components */
.mobile-card {
  min-height: 80px;
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.mobile-card:active {
  transform: scale(0.98);
}

.mobile-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}`
    },
    {
      step: 3,
      title: "Optimize Typography",
      description: "Improve text readability on mobile screens",
      code: `/* Mobile typography scale */
@media (max-width: 768px) {
  .metric-value {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  .metric-label {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
  }
  
  .chart-label {
    font-size: 14px;
    font-weight: 600;
  }
}`
    },
    {
      step: 4,
      title: "Implement Progressive Enhancement",
      description: "Add mobile-specific interactions and animations",
      code: `/* Mobile-specific enhancements */
@media (max-width: 768px) {
  .mobile-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .chart-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  
  .activity-item {
    scroll-snap-align: start;
  }
}`
    }
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
          <h1 className="text-4xl font-bold text-primary mb-2">Mobile Layout Analysis & Optimization</h1>
          <p className="text-secondary">Analyzing Work page success patterns and optimizing Dashboard/Earnings mobile layouts</p>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center space-x-2 mb-8"
        >
          {[
            { id: 'analysis', label: 'Work Page Analysis', icon: Eye },
            { id: 'dashboard', label: 'Dashboard Optimization', icon: BarChart3 },
            { id: 'earnings', label: 'Earnings Optimization', icon: DollarSign },
            { id: 'implementation', label: 'Implementation', icon: Zap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 border ${
                activeSection === tab.id
                  ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                  : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Sections */}
        {activeSection === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Work Page Success Factors */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Work Page Mobile Success Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workPageAnalysis.successFactors.map((factor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-tertiary rounded-lg border border-primary"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-soft-pink rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-2">{factor.factor}</h4>
                        <p className="text-sm text-secondary mb-2">{factor.description}</p>
                        <div className="text-xs text-tertiary mb-2">
                          <strong>Measurement:</strong> {factor.measurement}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          <strong>Impact:</strong> {factor.impact}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Layout Issues */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Current Dashboard/Earnings Mobile Issues</h3>
              <div className="space-y-6">
                {Object.entries(workPageAnalysis.currentLayout).map(([section, data], index) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-tertiary rounded-lg border border-primary"
                  >
                    <h4 className="font-semibold text-primary mb-3 capitalize">{section.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-primary mb-2">Current Specifications:</h5>
                        <ul className="text-xs text-secondary space-y-1">
                          {Object.entries(data).filter(([key]) => key !== 'issues').map(([key, value]) => (
                            <li key={key}>
                              <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-600 mb-2">Identified Issues:</h5>
                        <ul className="text-xs text-red-600 space-y-1">
                          {data.issues?.map((issue: string, idx: number) => (
                            <li key={idx}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">{proposedLayouts.dashboard.title}</h3>
              <div className="space-y-8">
                {proposedLayouts.dashboard.changes.map((change, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-primary rounded-lg overflow-hidden"
                  >
                    <div className="bg-tertiary p-4 border-b border-primary">
                      <h4 className="font-semibold text-primary">{change.component}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-red-600">
                          <strong>Current:</strong> {change.current}
                        </span>
                        <ArrowRight className="w-4 h-4 text-secondary" />
                        <span className="text-green-600">
                          <strong>Proposed:</strong> {change.proposed}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-primary mb-3">Detailed Specifications:</h5>
                          <div className="space-y-2">
                            {Object.entries(change.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="text-primary font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-primary mb-3">Benefits:</h5>
                          <ul className="space-y-1">
                            {change.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span className="text-secondary">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'earnings' && (
          <motion.div
            key="earnings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">{proposedLayouts.earnings.title}</h3>
              <div className="space-y-8">
                {proposedLayouts.earnings.changes.map((change, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-primary rounded-lg overflow-hidden"
                  >
                    <div className="bg-tertiary p-4 border-b border-primary">
                      <h4 className="font-semibold text-primary">{change.component}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-red-600">
                          <strong>Current:</strong> {change.current}
                        </span>
                        <ArrowRight className="w-4 h-4 text-secondary" />
                        <span className="text-green-600">
                          <strong>Proposed:</strong> {change.proposed}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-primary mb-3">Detailed Specifications:</h5>
                          <div className="space-y-2">
                            {Object.entries(change.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="text-primary font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-primary mb-3">Benefits:</h5>
                          <ul className="space-y-1">
                            {change.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span className="text-secondary">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'implementation' && (
          <motion.div
            key="implementation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Implementation Steps</h3>
              <div className="space-y-6">
                {implementationSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-primary rounded-lg overflow-hidden"
                  >
                    <div className="bg-tertiary p-4 border-b border-primary">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-soft-pink rounded-full text-white font-bold">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">{step.title}</h4>
                          <p className="text-sm text-secondary">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="bg-primary rounded-lg p-4">
                        <pre className="text-sm text-secondary overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Testing Checklist */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Mobile Testing Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-primary mb-3">Touch Interaction Testing</h4>
                  <div className="space-y-2">
                    {[
                      'All touch targets minimum 44px',
                      'Adequate spacing between interactive elements',
                      'Hover states work on touch devices',
                      'Swipe gestures function properly',
                      'Pinch-to-zoom disabled where appropriate'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-3">Visual & Performance Testing</h4>
                  <div className="space-y-2">
                    {[
                      'Text remains readable at all zoom levels',
                      'Charts scale appropriately',
                      'Icons maintain clarity at all sizes',
                      'Animations perform smoothly',
                      'Loading states provide clear feedback'
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

export default MobileLayoutAnalysis;