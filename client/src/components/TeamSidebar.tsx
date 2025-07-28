import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { ThorxLogo } from './ThorxLogo';
import { 
  Command, 
  Satellite, 
  Mail, 
  MessageCircle, 
  Star, 
  LogOut,
  Crown,
  Globe,
  Zap
} from 'lucide-react';

export const TeamSidebar = () => {
  const { teamMember, logout } = useTeamAuth();
  const [location] = useLocation();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-[#EF4B4C]'; // Docks Red - EF4B4C
      case 'marketing': return 'bg-[#3D619B]'; // Docks Blue - 3D619B
      case 'social_media': return 'bg-[#EF4B4C]'; // Docks Red - EF4B4C
      case 'admin': return 'bg-[#3D619B]'; // Docks Blue - 3D619B
      default: return 'bg-[#43506C]'; // Docks Dark - 43506C
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

  const getNavigationItems = () => {
    const role = teamMember?.role;
    const name = teamMember?.name;

    // Define all possible navigation items with cosmic theming
    const allItems = [
      { 
        path: '/team/dashboard', 
        label: 'Command Center', 
        icon: Command,
        cosmic: 'Mission Control Hub',
        color: '#3D619B'
      },
      { 
        path: '/team/users', 
        label: 'Cosmic Database', 
        icon: Satellite,
        cosmic: 'User Constellation',
        color: '#EF4B4C'
      },
      { 
        path: '/team/inbox', 
        label: 'Signal Reception', 
        icon: Mail,
        cosmic: 'Incoming Transmissions',
        color: '#3D619B'
      },
      { 
        path: '/team/chat', 
        label: 'Orbital Linkage', 
        icon: MessageCircle,
        cosmic: 'Team Communications',
        color: '#EF4B4C'
      },
      { 
        path: '/team/hub', 
        label: 'Command Bridge', 
        icon: Crown,
        cosmic: 'Executive Override',
        color: '#EF4B4C'
      },
      { 
        path: '/team/market', 
        label: 'Stellar Network', 
        icon: Globe,
        cosmic: 'Digital Cosmos',
        color: '#3D619B'
      }
    ];

    // Role-based access control (Work page removed from all roles)
    let accessibleItems: string[] = [];

    if (name === 'Aon Imran') {
      // CEO: Dashboard, User Care, Inbox, Linkage, Team Hub, Digital Market
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat', '/team/hub', '/team/market'];
    } else if (name === 'Zain Abbas') {
      // Marketing: Dashboard, User Care, Inbox, Linkage
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat'];
    } else if (name === 'Zohaib Nadeem') {
      // Social Media: Dashboard, User Care, Inbox, Linkage, Digital Market
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat', '/team/market'];
    } else if (name === 'Prof. Muhammad Jahangeer') {
      // Admin: Dashboard, User Care, Inbox, Linkage
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat'];
    } else {
      // Default fallback for any other team member
      accessibleItems = ['/team/dashboard', '/team/inbox', '/team/chat'];
    }

    // Filter items based on access
    return allItems.filter(item => accessibleItems.includes(item.path));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div 
      className="team-sidebar-container bg-[#43506C] h-screen flex flex-col w-64 relative"
      style={{
        background: `linear-gradient(135deg, #43506C 0%, #3a4356 100%)`,
        boxShadow: 'inset 0 0 50px rgba(239, 75, 76, 0.1)'
      }}
    >
      {/* Cosmic Command Header */}
      <div className="relative p-6 border-b border-[#3D619B]/30 overflow-hidden">
        {/* Animated Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#43506C] via-[#3D619B]/20 to-[#43506C]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-2 right-4 w-2 h-2 bg-[#EF4B4C] rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-6 left-8 w-1 h-1 bg-[#3D619B] rounded-full animate-pulse opacity-40 animation-delay-500"></div>
          <div className="absolute bottom-3 right-12 w-1.5 h-1.5 bg-[#E9E9EB] rounded-full animate-pulse opacity-30 animation-delay-1000"></div>
        </div>

        <div className="flex items-center transition-all duration-300 relative z-10">
          <div className="flex items-center transition-all duration-300 space-x-4">
            <div className="flex-shrink-0 relative group mx-auto">
              <div className="absolute inset-0 bg-[#EF4B4C]/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <ThorxLogo size="lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4B4C] rounded-full animate-pulse shadow-lg shadow-[#EF4B4C]/50"></div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Cosmic User Profile Section */}
      <div className="p-6 border-b border-[#3D619B]/30 relative overflow-hidden">
        {/* Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#43506C] via-[#3D619B]/20 to-[#43506C]"></div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#EF4B4C]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#3D619B]/20 rounded-full blur-lg"></div>

        <div className="flex items-center transition-all duration-300 relative z-10 space-x-4">
          <div className="relative flex-shrink-0 group">
            <div className="absolute inset-0 bg-[#EF4B4C]/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className={`w-12 h-12 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center relative z-10 shadow-lg`}>
              <span className="text-[#E9E9EB] font-bold text-sm" style={{ color: '#E9E9EB' }}>
                {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#EF4B4C] rounded-full animate-pulse shadow-lg shadow-[#EF4B4C]/50"></div>
          </div>

          <div className="min-w-0 flex-1 relative z-10">
            <p className="font-semibold text-sm truncate" style={{ color: '#E9E9EB' }}>{teamMember?.name}</p>
            <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(233, 233, 235, 0.7)' }}>{getRoleTitle(teamMember?.role || '')}</p>
            <div className="flex items-center mt-1 space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs" style={{ color: 'rgba(233, 233, 235, 0.6)' }}>Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cosmic Navigation Portal */}
      <nav className="flex-1 py-6 px-4 space-y-3 overflow-y-auto relative">
        {/* Cosmic Navigation Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-2 w-1 h-1 bg-[#3D619B]/40 rounded-full animate-pulse"></div>
          <div className="absolute top-32 left-3 w-0.5 h-0.5 bg-[#EF4B4C]/30 rounded-full animate-pulse animation-delay-700"></div>
          <div className="absolute bottom-20 right-4 w-1.5 h-1.5 bg-[#E9E9EB]/20 rounded-full animate-pulse animation-delay-1400"></div>
        </div>
        {getNavigationItems().map((item, index) => {
          const Icon = item.icon;
          // Better active detection logic
          const isActive = location === item.path || 
                           (item.path !== '/team/dashboard' && location.startsWith(item.path));

          // Debug logging
          console.log('Navigation Active Check:', {
            itemPath: item.path,
            currentLocation: location,
            isActive: isActive,
            label: item.label
          });

          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'active' : 'hover:bg-[#43506C]/50'
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-70">{item.cosmic}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Cosmic Logout Section */}
      <div className="p-6 border-t border-[#3D619B]/30 relative overflow-hidden">
        {/* Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#43506C]/50 to-transparent"></div>
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#3D619B]/50 to-transparent"></div>

        <button
          onClick={handleLogout}
          className="group relative flex items-center w-full rounded-xl transition-all duration-300 overflow-hidden space-x-4 px-5 py-4"
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-[#43506C]/40 rounded-xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#EF4B4C]/30 group-hover:to-[#3D619B]/20"></div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E9E9EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-all duration-300 relative z-10" style={{ color: 'rgba(233, 233, 235, 0.7) !important' }} />
          <span className="font-semibold text-sm transition-all duration-300 relative z-10" style={{ color: 'rgba(233, 233, 235, 0.7) !important' }}>
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default TeamSidebar;