import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  preferences?: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'cosmic';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  sound: boolean;
  frequency: 'immediate' | 'hourly' | 'daily';
  types: {
    earnings: boolean;
    tasks: boolean;
    payouts: boolean;
    mentions: boolean;
    updates: boolean;
    security: boolean;
  };
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEarnings: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  contentFiltering: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  enableTwoFactor: () => Promise<{ qrCode: string; backupCodes: string[] }>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const token = localStorage.getItem('thorx_auth_token');
    const userData = localStorage.getItem('thorx_user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('thorx_auth_token');
        localStorage.removeItem('thorx_user_data');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Login error:', error);
        return false;
      }
      
      const data = await response.json();
      
      // Store authentication data
      localStorage.setItem('thorx_auth_token', data.token);
      localStorage.setItem('thorx_user_data', JSON.stringify(data.user));
      
      if (rememberMe) {
        localStorage.setItem('thorx_remember_me', 'true');
      }
      
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Registration error:', error);
        return false;
      }
      
      const data = await response.json();
      
      // Store authentication data
      localStorage.setItem('thorx_auth_token', data.token);
      localStorage.setItem('thorx_user_data', JSON.stringify(data.user));
      
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('thorx_auth_token');
    localStorage.removeItem('thorx_user_data');
    localStorage.removeItem('thorx_remember_me');
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { ...user, ...data };
      localStorage.setItem('thorx_user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      localStorage.setItem('thorx_user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Preferences update error:', error);
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    }
  };

  const enableTwoFactor = async (): Promise<{ qrCode: string; backupCodes: string[] }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        qrCode: 'data:image/png;base64,mock_qr_code_data',
        backupCodes: ['123456', '789012', '345678', '901234', '567890']
      };
    } catch (error) {
      console.error('2FA setup error:', error);
      throw error;
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return code === '123456'; // Mock verification
    } catch (error) {
      console.error('2FA verification error:', error);
      return false;
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    updatePreferences,
    changePassword,
    enableTwoFactor,
    verifyTwoFactor,
    isAuthenticated: !!user
  };
};

export { AuthContext };
export type { User, AuthContextType, RegisterData, UserPreferences, NotificationSettings, PrivacySettings };