import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { ThorxLogo } from './ThorxLogo';
import { 
  Home, 
  Users, 
  Mail, 
  MessageCircle, 
  Settings, 
  TrendingUp, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const TeamNavbar = () => {
  const { teamMember, logout } = useTeamAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-500';
      case 'marketing': return 'bg-green-500';
      case 'social_media': return 'bg-pink-500';
      case 'admin': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'CEO';
      case 'marketing': return 'Marketing';
      case 'social_media': return 'Social Media';
      case 'admin': return 'Admin';
      default: return 'Team';
    }
  };

  const getNavigationItems = () => {
    const items = [
      { path: '/team/dashboard', label: 'Dashboard', icon: Home },
      { path: '/team/inbox', label: 'Inbox', icon: Mail },
      { path: '/team/chat', label: 'Linkage', icon: MessageCircle },
      { path: '/team/market', label: 'Digital Market', icon: TrendingUp }
    ];

    // Add role-specific items
    if (teamMember?.role === 'ceo' || teamMember?.role === 'admin') {
      items.splice(2, 0, { path: '/team/users', label: 'User Care', icon: Users });
    }

    if (teamMember?.role === 'ceo') {
      items.push({ path: '/team/hub', label: 'Team Hub', icon: Settings });
    }

    return items;
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/team/dashboard" className="flex items-center space-x-3">
            <ThorxLogo size="md" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-slate-200">Team Portal</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {getNavigationItems().map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    location === item.path
                      ? 'bg-slate-700 text-slate-200'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">
                  {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
                </span>
              </div>
              <div className="text-sm">
                <p className="text-slate-200 font-medium">{teamMember?.name}</p>
                <p className="text-slate-400">{getRoleTitle(teamMember?.role || '')}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-md transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {getNavigationItems().map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                  location === item.path
                    ? 'bg-slate-700 text-slate-200'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-slate-200'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile User Info */}
          <div className="pt-4 pb-3 border-t border-slate-700">
            <div className="flex items-center px-5 space-x-3">
              <div className={`w-10 h-10 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center`}>
                <span className="text-white font-bold">
                  {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
                </span>
              </div>
              <div>
                <p className="text-base font-medium text-slate-200">{teamMember?.name}</p>
                <p className="text-sm text-slate-400">{getRoleTitle(teamMember?.role || '')}</p>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-slate-200 hover:bg-slate-700 transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TeamNavbar;