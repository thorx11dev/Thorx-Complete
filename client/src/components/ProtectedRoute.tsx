import { useLocation, Redirect } from 'wouter';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [location] = useLocation();
  
  // Check for authentication token
  const isAuthenticated = localStorage.getItem('thorx_auth_token');
  
  if (!isAuthenticated) {
    // Redirect to auth page
    return <Redirect to="/auth" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;