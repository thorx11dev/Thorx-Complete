import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { 
  TrendingUp, Share2, Users, Award, ExternalLink, 
  Facebook, Twitter, Instagram, Youtube, MessageCircle,
  Star, Calendar, Play, ArrowRight, Eye, Heart, 
  BarChart3, Globe, Zap, Crown, Trophy, Target
} from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, AsymmetricGrid, CosmicModule, CosmicParticles } from '@/components/CosmicAdvancedLayout';

const DigitalMarketPage = () => {
  const { teamMember } = useTeamAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'feeds' | 'mvp' | 'analytics'>('overview');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Social Media MVP Data
  const socialMediaMVP = {
    currentMonth: 'January 2025',
    winner: {
      name: 'Zohaib Nadeem',
      role: 'Social Media Manager',
      platform: 'Instagram',
      achievement: 'Highest Engagement Growth',
      metrics: {
        engagement: '+287%',
        followers: '+1.2K',
        reach: '15.3K',
        posts: 24
      },
      highlight: 'Revolutionary TikTok campaign that went viral with 50K+ views'
    },
    topPosts: [
      {
        platform: 'Instagram',
        content: 'Thorx Launch Announcement',
        engagement: '2.1K',
        type: 'Reel'
      },
      {
        platform: 'Twitter',
        content: 'Team Introduction Series',
        engagement: '1.8K',
        type: 'Thread'
      },
      {
        platform: 'TikTok',
        content: 'Behind the Scenes',
        engagement: '5.2K',
        type: 'Video'
      }
    ]
  };

  // Social Media Channels
  const socialChannels = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/thorxofficial',
      followers: '2.1K',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/thorxofficial',
      followers: '3.8K',
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/thorxofficial',
      followers: '1.9K',
      color: 'bg-sky-600',
      hoverColor: 'hover:bg-sky-700'
    },
    {
      name: 'TikTok',
      icon: Play,
      url: 'https://tiktok.com/@thorxofficial',
      followers: '5.2K',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@thorxofficial',
      followers: '890',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700'
    },
    {
      name: 'LinkedIn',
      icon: MessageCircle,
      url: 'https://linkedin.com/company/thorx',
      followers: '1.1K',
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800'
    }
  ];

  // Recent Social Media Posts (Mock Live Feed)
  const recentPosts = [
    {
      platform: 'Instagram',
      content: 'New feature spotlight: Advanced Analytics Dashboard now live! 📊',
      timestamp: '2 hours ago',
      engagement: { likes: 124, comments: 18, shares: 7 },
      type: 'post'
    },
    {
      platform: 'Twitter',
      content: 'Thread: How Thorx is revolutionizing the digital economy 🚀',
      timestamp: '4 hours ago',
      engagement: { likes: 89, comments: 12, shares: 23 },
      type: 'thread'
    },
    {
      platform: 'TikTok',
      content: 'Behind the scenes: Team coding session vibes 💻',
      timestamp: '6 hours ago',
      engagement: { likes: 312, comments: 45, shares: 78 },
      type: 'video'
    }
  ];

  const monthlyStats = {
    totalReach: '125.8K',
    engagement: '8.2%',
    newFollowers: '+2.4K',
    topPlatform: 'TikTok'
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen cosmic-parallax-container" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
      <TeamSidebar />
      <div className="flex-1 p-6 relative">
        {/* Advanced Cosmic Background with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cosmic-parallax-layer cosmic-parallax-slow">
            <div className="absolute top-20 right-20 w-32 h-32 bg-[#EF4B4C]/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#3D619B]/5 rounded-full blur-lg"></div>
          </div>
        </div>
        <CosmicParticles count={35} />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-200">Digital Market</h1>
                  <p className="text-slate-400">Social Media Integration Hub</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Total Reach</div>
                  <div className="text-lg font-semibold text-slate-200">{monthlyStats.totalReach}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Engagement</div>
                  <div className="text-lg font-semibold text-green-400">{monthlyStats.engagement}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
              {[
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'feeds', label: 'Live Feeds', icon: Share2 },
                { id: 'mvp', label: 'MVP Awards', icon: Trophy },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Social Media Channels */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Official Social Media Channels</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {socialChannels.map((channel) => (
                    <a
                      key={channel.name}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${channel.color} ${channel.hoverColor} rounded-lg p-4 text-center transition-all transform hover:scale-105`}
                    >
                      <channel.icon className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="text-white font-medium text-sm">{channel.name}</div>
                      <div className="text-white/80 text-xs">{channel.followers}</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Reach</p>
                      <p className="text-2xl font-bold text-slate-200">{monthlyStats.totalReach}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2">+23% from last month</div>
                </div>

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Engagement Rate</p>
                      <p className="text-2xl font-bold text-slate-200">{monthlyStats.engagement}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2">+15% from last month</div>
                </div>

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">New Followers</p>
                      <p className="text-2xl font-bold text-slate-200">{monthlyStats.newFollowers}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2">+41% from last month</div>
                </div>

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Top Platform</p>
                      <p className="text-2xl font-bold text-slate-200">{monthlyStats.topPlatform}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-blue-400 mt-2">5.2K followers</div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-4">Share Thorx</h2>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Facebook className="w-4 h-4" />
                    <span>Share on Facebook</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors">
                    <Twitter className="w-4 h-4" />
                    <span>Tweet about Thorx</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                    <Instagram className="w-4 h-4" />
                    <span>Share on Instagram</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Live Feeds Tab */}
          {activeTab === 'feeds' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Live Social Media Feed</h2>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <Share2 className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-200">{post.platform}</div>
                            <div className="text-xs text-slate-400">{post.timestamp}</div>
                          </div>
                        </div>
                        <span className="text-xs bg-slate-600 px-2 py-1 rounded text-slate-300">
                          {post.type}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-6 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.engagement.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.engagement.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-4 h-4" />
                          <span>{post.engagement.shares}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MVP Awards Tab */}
          {activeTab === 'mvp' && (
            <div className="space-y-6">
              {/* MVP Winner */}
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Crown className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Social Media MVP</h2>
                      <p className="text-yellow-100">{socialMediaMVP.currentMonth}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{socialMediaMVP.winner.name}</div>
                    <div className="text-yellow-100">{socialMediaMVP.winner.role}</div>
                  </div>
                </div>
              </div>

              {/* Achievement Details */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Achievement Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-300 mb-3">Platform: {socialMediaMVP.winner.platform}</h4>
                    <p className="text-slate-400 mb-4">{socialMediaMVP.winner.highlight}</p>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-400">Engagement</div>
                          <div className="text-lg font-semibold text-green-400">{socialMediaMVP.winner.metrics.engagement}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">New Followers</div>
                          <div className="text-lg font-semibold text-blue-400">{socialMediaMVP.winner.metrics.followers}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Total Reach</div>
                          <div className="text-lg font-semibold text-purple-400">{socialMediaMVP.winner.metrics.reach}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Posts Created</div>
                          <div className="text-lg font-semibold text-orange-400">{socialMediaMVP.winner.metrics.posts}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-300 mb-3">Top Performing Posts</h4>
                    <div className="space-y-3">
                      {socialMediaMVP.topPosts.map((post, index) => (
                        <div key={index} className="bg-slate-700 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-slate-200">{post.content}</div>
                              <div className="text-xs text-slate-400">{post.platform} • {post.type}</div>
                            </div>
                            <div className="text-green-400 font-semibold">{post.engagement}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Analytics Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-200">Platform Performance</h3>
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">TikTok</span>
                        <span className="text-green-400">+45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Instagram</span>
                        <span className="text-green-400">+32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Twitter</span>
                        <span className="text-green-400">+18%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-200">Content Types</h3>
                      <Target className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Videos</span>
                        <span className="text-purple-400">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Images</span>
                        <span className="text-purple-400">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Text</span>
                        <span className="text-purple-400">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-200">Best Posting Times</h3>
                      <Calendar className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">2:00 PM</span>
                        <span className="text-orange-400">Peak</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">7:00 PM</span>
                        <span className="text-orange-400">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">9:00 AM</span>
                        <span className="text-orange-400">Good</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UTM Tracking */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">UTM Campaign Tracking</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-slate-300 mb-2">Social Media Referrals</h4>
                    <div className="text-2xl font-bold text-green-400">1,247</div>
                    <div className="text-sm text-slate-400">visitors this month</div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-slate-300 mb-2">Conversion Rate</h4>
                    <div className="text-2xl font-bold text-blue-400">12.3%</div>
                    <div className="text-sm text-slate-400">from social traffic</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketPage;