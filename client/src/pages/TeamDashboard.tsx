import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Users, Mail, Shield, Settings, TrendingUp, Activity, MessageCircle, Bell } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, AsymmetricGrid, CosmicModule, CosmicParticles } from '@/components/CosmicAdvancedLayout';

const TeamDashboard = () => {
  const { teamMember } = useTeamAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    unreadMessages: 0,
    teamMessages: 0,
    onlineMembers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      
      // Load stats from various endpoints
      const [usersResponse, messagesResponse, teamResponse, chatResponse] = await Promise.all([
        fetch('/api/team/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/team/messages', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/team/members', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => ({ ok: false })), // CEO only, handle gracefully
        fetch('/api/team/chat', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const users = usersResponse.ok ? await usersResponse.json() : [];
      const messages = messagesResponse.ok ? await messagesResponse.json() : [];
      const teamMembers = teamResponse.ok && typeof teamResponse.json === 'function' ? await teamResponse.json() : [];
      const chats = chatResponse.ok ? await chatResponse.json() : [];

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter((user: any) => user.isActive && !user.isBanned).length,
        bannedUsers: users.filter((user: any) => user.isBanned).length,
        unreadMessages: messages.filter((msg: any) => !msg.isRead).length,
        teamMessages: chats.length,
        onlineMembers: teamMembers.filter((member: any) => member.isActive).length
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Chief Executive Officer';
      case 'marketing': return 'Marketing Specialist';
      case 'social_media': return 'Social Media Manager';
      case 'admin': return 'Administrator';
      default: return 'Team Member';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-[#EF4B4C]'; // Docks Red - EF4B4C
      case 'marketing': return 'bg-[#3D619B]'; // Docks Blue - 3D619B  
      case 'social_media': return 'bg-[#EF4B4C]'; // Docks Red - EF4B4C
      case 'admin': return 'bg-[#3D619B]'; // Docks Blue - 3D619B
      default: return 'bg-[#43506C]'; // Docks Dark - 43506C
    }
  };

  const getAccessiblePages = () => {
    const pages = [
      { name: 'Inbox', description: 'Contact messages', icon: Mail },
      { name: 'Linkage', description: 'Team chat', icon: MessageCircle },
      { name: 'Digital Market', description: 'Marketplace', icon: TrendingUp }
    ];

    if (teamMember?.role === 'ceo' || teamMember?.role === 'admin') {
      pages.push({ name: 'User Care', description: 'User management', icon: Users });
    }

    if (teamMember?.role === 'ceo') {
      pages.push({ name: 'Team Hub', description: 'Team settings', icon: Settings });
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF4B4C]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen cosmic-parallax-container" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
      <TeamSidebar />
      <div className="flex-1 p-6 space-y-6 relative">
        {/* Advanced Cosmic Background with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cosmic-parallax-layer cosmic-parallax-slow">
            <div className="absolute top-20 right-20 w-32 h-32 bg-[#EF4B4C]/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-[#3D619B]/5 rounded-full blur-lg"></div>
          </div>
          <div className="cosmic-parallax-layer cosmic-parallax-medium">
            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-[#E9E9EB] rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#EF4B4C] rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-[#3D619B] rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
        <CosmicParticles count={30} />
      {/* Command Center Header */}
      <CosmicEntrance type="stellar" delay={0.1}>
        <CosmicModule effect="glass" className="border border-[#EF4B4C]/20 p-6 relative z-10" 
             style={{boxShadow: '0 8px 32px rgba(239, 75, 76, 0.1)'}}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center`}>
            <span className="font-bold text-lg" style={{ color: '#E9E9EB !important' }}>
              {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#E9E9EB !important' }}>
              Welcome to the Cosmic Command Center, {teamMember?.name}
            </h2>
            <p style={{ color: 'rgba(233, 233, 235, 0.7) !important' }}>{getRoleTitle(teamMember?.role || '')}</p>
          </div>
        </div>
        </CosmicModule>
      </CosmicEntrance>

      {/* Asymmetric Statistics Layout with Stellar Entrance */}
      <AsymmetricGrid className="relative z-10">
        <CosmicEntrance type="stellar" delay={0.2}>
          <CosmicModule effect="glass" className="border border-[#3D619B]/30 p-6 relative cosmic-overlapping-section" 
               style={{boxShadow: '0 8px 32px rgba(61, 97, 155, 0.1)'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#E9E9EB]/60 text-sm">Total Cosmic Users</p>
                <p className="text-2xl font-bold text-[#E9E9EB]">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-[#3D619B] rounded-full flex items-center justify-center shadow-lg shadow-[#3D619B]/20 cosmic-magnetic-hover">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-[#E9E9EB] rounded-full opacity-40"></div>
          </CosmicModule>
        </CosmicEntrance>

        <div className="bg-[#43506C]/80 backdrop-blur-sm rounded-lg border border-[#EF4B4C]/30 p-6 relative" 
             style={{boxShadow: '0 8px 32px rgba(239, 75, 76, 0.1)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E9E9EB]/60 text-sm">Active Voyagers</p>
              <p className="text-2xl font-bold text-[#E9E9EB]">{stats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-[#EF4B4C] rounded-full flex items-center justify-center shadow-lg shadow-[#EF4B4C]/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-[#EF4B4C] rounded-full opacity-40"></div>
        </div>

        <div className="bg-[#43506C]/80 backdrop-blur-sm rounded-lg border border-[#EF4B4C]/30 p-6 relative" 
             style={{boxShadow: '0 8px 32px rgba(239, 75, 76, 0.1)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E9E9EB]/60 text-sm">Restricted Users</p>
              <p className="text-2xl font-bold text-[#E9E9EB]">{stats.bannedUsers}</p>
            </div>
            <div className="w-12 h-12 bg-[#EF4B4C] rounded-full flex items-center justify-center shadow-lg shadow-[#EF4B4C]/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-[#EF4B4C] rounded-full opacity-40"></div>
        </div>

        <div className="bg-[#43506C]/80 backdrop-blur-sm rounded-lg border border-[#3D619B]/30 p-6 relative" 
             style={{boxShadow: '0 8px 32px rgba(61, 97, 155, 0.1)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E9E9EB]/60 text-sm">Cosmic Messages</p>
              <p className="text-2xl font-bold text-[#E9E9EB]">{stats.unreadMessages}</p>
            </div>
            <div className="w-12 h-12 bg-[#3D619B] rounded-full flex items-center justify-center shadow-lg shadow-[#3D619B]/20">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-[#3D619B] rounded-full opacity-40"></div>
        </div>

        <div className="bg-[#43506C]/80 backdrop-blur-sm rounded-lg border border-[#EF4B4C]/30 p-6 relative" 
             style={{boxShadow: '0 8px 32px rgba(239, 75, 76, 0.1)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E9E9EB]/60 text-sm">Team Communications</p>
              <p className="text-2xl font-bold text-[#E9E9EB]">{stats.teamMessages}</p>
            </div>
            <div className="w-12 h-12 bg-[#EF4B4C] rounded-full flex items-center justify-center shadow-lg shadow-[#EF4B4C]/20">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-[#EF4B4C] rounded-full opacity-40"></div>
        </div>

        <div className="bg-[#43506C]/80 backdrop-blur-sm rounded-lg border border-[#3D619B]/30 p-6 relative" 
             style={{boxShadow: '0 8px 32px rgba(61, 97, 155, 0.1)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E9E9EB]/60 text-sm">Online Cosmic Crew</p>
              <p className="text-2xl font-bold text-[#E9E9EB]">{stats.onlineMembers}</p>
            </div>
            <div className="w-12 h-12 bg-[#3D619B] rounded-full flex items-center justify-center shadow-lg shadow-[#3D619B]/20">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-[#3D619B] rounded-full opacity-40"></div>
        </div>
      </AsymmetricGrid>

      {/* Cosmic Quick Actions */}
      <div className="bg-[#43506C]/60 backdrop-blur-sm rounded-lg border border-[#EF4B4C]/20 p-6 relative z-10" 
           style={{boxShadow: '0 8px 32px rgba(239, 75, 76, 0.1)'}}>
        <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4">Cosmic Navigation Hub</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getAccessiblePages().map((page, index) => (
            <div
              key={page.name}
              className="bg-[#43506C]/40 rounded-lg p-4 hover:bg-[#3D619B]/20 transition-all duration-300 cursor-pointer border border-[#E9E9EB]/10 hover:border-[#EF4B4C]/30 relative"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${index % 2 === 0 ? 'bg-[#EF4B4C]' : 'bg-[#3D619B]'} rounded-full flex items-center justify-center shadow-lg ${index % 2 === 0 ? 'shadow-[#EF4B4C]/20' : 'shadow-[#3D619B]/20'}`}>
                  <page.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#E9E9EB]">{page.name}</h4>
                  <p className="text-sm text-[#E9E9EB]/60">{page.description}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 w-1 h-1 bg-[#E9E9EB] rounded-full opacity-30"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic Recent Activity */}
      <div className="bg-[#43506C]/60 backdrop-blur-sm rounded-lg border border-[#3D619B]/20 p-6 relative z-10" 
           style={{boxShadow: '0 8px 32px rgba(61, 97, 155, 0.1)'}}>
        <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4 flex items-center">
          <span>Cosmic Activity Stream</span>
          <div className="ml-2 w-2 h-2 bg-[#EF4B4C] rounded-full animate-pulse"></div>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-[#EF4B4C] rounded-full animate-pulse"></div>
            <span className="text-[#E9E9EB]/90">Cosmic Command Center initialized</span>
            <span className="text-[#E9E9EB]/50">Just now</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-[#3D619B] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-[#E9E9EB]/90">Stellar statistics synchronized</span>
            <span className="text-[#E9E9EB]/50">2 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-[#EF4B4C] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-[#E9E9EB]/90">New cosmic voyager joined</span>
            <span className="text-[#E9E9EB]/50">1 hour ago</span>
          </div>
        </div>
        {/* Cosmic Decoration */}
        <div className="absolute bottom-2 right-4 w-8 h-8 bg-[#3D619B]/10 rounded-full"></div>
        <div className="absolute bottom-3 right-5 w-4 h-4 bg-[#EF4B4C]/10 rounded-full"></div>
      </div>
      </div>
    </div>
  );
};

export default TeamDashboard;