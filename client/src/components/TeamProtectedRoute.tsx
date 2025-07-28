import { useLocation, Redirect } from 'wouter';
import { useTeamAuth } from '@/hooks/useTeamAuth';

interface TeamProtectedRouteProps {
  children: React.ReactNode;
}

const TeamProtectedRoute: React.FC<TeamProtectedRouteProps> = ({ children }) => {
  const [location] = useLocation();
  const { isAuthenticated, isLoading } = useTeamAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-300 mt-4">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to team login page
    return <Redirect to="/team/login" />;
  }
  
  return <>{children}</>;
};

export default TeamProtectedRoute;