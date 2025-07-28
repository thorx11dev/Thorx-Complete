import { ReactNode } from 'react';
import { TeamAuthContext, useTeamAuthState } from '@/hooks/useTeamAuth';

interface TeamAuthProviderProps {
  children: ReactNode;
}

export const TeamAuthProvider = ({ children }: TeamAuthProviderProps) => {
  const authState = useTeamAuthState();
  
  return (
    <TeamAuthContext.Provider value={authState}>
      {children}
    </TeamAuthContext.Provider>
  );
};