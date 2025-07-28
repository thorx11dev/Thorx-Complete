import { useState, useEffect, createContext, useContext } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'ceo' | 'marketing' | 'social_media' | 'admin';
  isActive: boolean;
  createdAt: string;
}

interface TeamAuthContextType {
  teamMember: TeamMember | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  getAccessiblePages: () => string[];
}

const TeamAuthContext = createContext<TeamAuthContextType | undefined>(undefined);

export const useTeamAuth = () => {
  const context = useContext(TeamAuthContext);
  if (context === undefined) {
    throw new Error('useTeamAuth must be used within a TeamAuthProvider');
  }
  return context;
};

export const useTeamAuthState = () => {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing team authentication on mount
    const token = localStorage.getItem('thorx_team_auth_token');
    const memberData = localStorage.getItem('thorx_team_member_data');
    
    if (token && memberData) {
      try {
        const parsedMember = JSON.parse(memberData);
        setTeamMember(parsedMember);
      } catch (error) {
        console.error('Error parsing team member data:', error);
        localStorage.removeItem('thorx_team_auth_token');
        localStorage.removeItem('thorx_team_member_data');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/team/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        console.log('Team login response:', data);
        
        if (data.token && data.teamMember) {
          localStorage.setItem('thorx_team_auth_token', data.token);
          localStorage.setItem('thorx_team_member_data', JSON.stringify(data.teamMember));
          
          setTeamMember(data.teamMember);
          return true;
        } else {
          console.error('Missing token or teamMember in response:', data);
          return false;
        }
      } else {
        const error = await response.json();
        console.error('Team login error:', error);
        return false;
      }
    } catch (error) {
      console.error('Team login network error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('thorx_team_auth_token');
    localStorage.removeItem('thorx_team_member_data');
    setTeamMember(null);
  };

  const getAccessiblePages = (): string[] => {
    if (!teamMember) return [];

    const commonPages = ['dashboard', 'user-care', 'inbox', 'linkage', 'work', 'settings'];
    
    switch (teamMember.role) {
      case 'ceo':
        return [...commonPages, 'team-hub', 'digital-market'];
      case 'marketing':
        return commonPages;
      case 'social_media':
        return [...commonPages, 'digital-market'];
      case 'admin':
        return commonPages;
      default:
        return commonPages;
    }
  };

  return {
    teamMember,
    isLoading,
    login,
    logout,
    isAuthenticated: !!teamMember,
    getAccessiblePages
  };
};

export { TeamAuthContext };
export type { TeamMember, TeamAuthContextType };