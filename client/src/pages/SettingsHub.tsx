import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { 
  User, 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  QrCode,
  History,
  Monitor,
  Volume2,
  VolumeX,
  Check,
  X,
  AlertTriangle,
  Copy,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { 
  CosmicBell, 
  CosmicShield, 
  CosmicGlobe 
} from '../components/icons/CosmicIcons';
const SettingsHub = memo(() => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState<{qrCode: string; backupCodes: string[]} | null>(null);


  
  const { user, updateProfile, updatePreferences, changePassword, enableTwoFactor, verifyTwoFactor } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Digital entrepreneur passionate about earning through innovative platforms.'
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [preferences, setPreferences] = useState(user?.preferences || {
    language: 'en',
    timezone: 'UTC-5',
    notifications: {
      email: true,
      push: true,
      sms: false,
      types: {
        earnings: true,
        tasks: true,
        payouts: true,
        mentions: true,
        updates: false,
        security: true
      }
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: CosmicBell },
    { id: 'security', label: 'Security', icon: CosmicShield }
  ];

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && tabs.find(tab => tab.id === hash)) {
        setActiveTab(hash);
      }
    };

    // Check hash on mount and location changes
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const success = await updateProfile(profileData);
      if (success) {
        showNotification('success', 'Profile updated successfully!');
      } else {
        showNotification('error', 'Failed to update profile');
      }
    } catch (error) {
      showNotification('error', 'An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setIsLoading(true);
    try {
      const success = await updatePreferences(preferences);
      if (success) {
        showNotification('success', 'Preferences updated successfully!');
      } else {
        showNotification('error', 'Failed to update preferences');
      }
    } catch (error) {
      showNotification('error', 'An error occurred while updating preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      showNotification('error', 'New passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      showNotification('error', 'Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const success = await changePassword(passwordData.current, passwordData.new);
      if (success) {
        showNotification('success', 'Password changed successfully!');
        setPasswordData({ current: '', new: '', confirm: '' });
      } else {
        showNotification('error', 'Failed to change password');
      }
    } catch (error) {
      showNotification('error', 'An error occurred while changing password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setIsLoading(true);
    try {
      const data = await enableTwoFactor();
      setTwoFactorData(data);
      setShow2FASetup(true);
      showNotification('success', '2FA setup initiated. Please scan the QR code.');
    } catch (error) {
      showNotification('error', 'Failed to setup 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Copied to clipboard!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Profile Information</h3>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                placeholder="Tell us about yourself..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProfileUpdate}
              disabled={isLoading}
              className="bg-soft-pink hover:bg-soft-pink/80 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 border border-soft-pink/20"
              style={{ color: '#2D2D2D' }}
            >
              <Save className="w-4 h-4" style={{ color: '#2D2D2D' }} />
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </motion.button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Notification Preferences</h3>
            
            {/* Notification Methods */}
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 bg-tertiary rounded-lg border border-primary hover:border-soft-pink/30 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="font-medium text-primary">Email Notifications</div>
                    <div className="text-sm text-secondary">Receive updates via email</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.email}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, email: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-soft-pink/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soft-pink"></div>
                </label>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 bg-tertiary rounded-lg border border-primary hover:border-soft-pink/30 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="font-medium text-primary">Push Notifications</div>
                    <div className="text-sm text-secondary">Get notified on your device</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.push}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, push: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-soft-pink/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soft-pink"></div>
                </label>
              </motion.div>

            </div>

            {/* Notification Types */}
            <h4 className="text-md font-medium text-primary mt-6 mb-4">Notification Types</h4>
            <div className="space-y-4">
              {Object.entries(preferences.notifications.types).map(([key, value]) => (
                <motion.div 
                  key={key} 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-tertiary rounded-lg border border-primary hover:border-soft-pink/30 transition-all duration-200"
                >
                  <div>
                    <div className="font-medium text-primary capitalize">{key} Notifications</div>
                    <div className="text-sm text-secondary">
                      {key === 'earnings' && 'New earnings and payments'}
                      {key === 'tasks' && 'New tasks and completions'}
                      {key === 'payouts' && 'Payout status updates'}
                      {key === 'mentions' && 'When someone mentions you'}
                      {key === 'updates' && 'Platform updates and news'}
                      {key === 'security' && 'Security alerts and warnings'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        notifications: {
                          ...preferences.notifications,
                          types: { ...preferences.notifications.types, [key]: e.target.checked }
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-soft-pink/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soft-pink"></div>
                  </label>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePreferencesUpdate}
              disabled={isLoading}
              className="bg-soft-pink hover:bg-soft-pink/80 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 border border-soft-pink/20"
              style={{ color: '#2D2D2D' }}
            >
              <Save className="w-4 h-4" style={{ color: '#2D2D2D' }} />
              <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
            </motion.button>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Security Settings</h3>
            
            {/* Change Password */}
            <div className="p-4 bg-tertiary rounded-lg border border-primary">
              <h4 className="font-medium text-primary mb-3">Change Password</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                      className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary pr-10 bg-secondary"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                    className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                    className="w-full px-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-secondary"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                  className="bg-light-teal hover:bg-light-teal/80 font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 border border-light-teal/20"
                  style={{ color: '#2D2D2D' }}
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
                </motion.button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-4 bg-tertiary rounded-lg border border-primary">
              <h4 className="font-medium text-primary mb-3">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-secondary">Add an extra layer of security to your account</div>
                  <div className="text-xs text-tertiary mt-1">Status: Not Enabled</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnable2FA}
                  disabled={isLoading}
                  className="bg-light-teal hover:bg-light-teal/80 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 border border-light-teal/20"
                  style={{ color: '#2D2D2D' }}
                >
                  <QrCode className="w-4 h-4" style={{ color: '#2D2D2D' }} />
                  <span>{isLoading ? 'Setting up...' : 'Enable 2FA'}</span>
                </motion.button>
              </div>

              {/* 2FA Setup Modal */}
              {show2FASetup && twoFactorData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-secondary rounded-lg border border-primary"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-primary">Setup Two-Factor Authentication</h5>
                    <button
                      onClick={() => setShow2FASetup(false)}
                      className="text-secondary hover:text-primary"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 bg-tertiary rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-secondary" />
                    </div>
                    <p className="text-sm text-secondary mb-4">
                      Scan this QR code with your authenticator app
                    </p>
                  </div>
                  <div className="mb-4">
                    <h6 className="font-medium text-primary mb-2">Backup Codes</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {twoFactorData.backupCodes.map((code, index) => (
                        <div key={index} className="flex items-center justify-between bg-tertiary p-2 rounded text-sm">
                          <span className="font-mono">{code}</span>
                          <button
                            onClick={() => copyToClipboard(code)}
                            className="text-secondary hover:text-primary"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-tertiary mt-2">
                      Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Login History */}
            <div className="p-4 bg-tertiary rounded-lg border border-primary">
              <h4 className="font-medium text-primary mb-3 flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>Recent Login Activity</span>
              </h4>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New York, US', time: '2 hours ago', current: true },
                  { device: 'Safari on iPhone', location: 'New York, US', time: '1 day ago', current: false },
                  { device: 'Firefox on Mac', location: 'Los Angeles, US', time: '3 days ago', current: false }
                ].map((session, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-3 bg-secondary rounded border border-primary hover:border-soft-pink/30 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-4 h-4 text-secondary" />
                      <div>
                        <div className="font-medium text-primary text-sm">{session.device}</div>
                        <div className="text-xs text-secondary">{session.location} • {session.time}</div>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full border border-green-200">Current</span>
                    ) : (
                      <button className="text-xs text-red-600 hover:text-red-800">Revoke</button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance_removed':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Appearance Settings</h3>
            
            {/* Theme Selection */}
            <div className="p-4 bg-tertiary rounded-lg border border-primary">
              <ThemeSwitcher />
            </div>





            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePreferencesUpdate}
              disabled={isLoading}
              className="bg-soft-pink hover:bg-soft-pink/80 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 border border-soft-pink/20"
              style={{ color: '#2D2D2D' }}
            >
              <Save className="w-4 h-4" style={{ color: '#2D2D2D' }} />
              <span>{isLoading ? 'Saving...' : 'Save Removed'}</span>
            </motion.button>
          </div>
        );



      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-primary transition-all duration-300">
        <div className="max-w-7xl mx-auto">
        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 right-4 z-50 max-w-md"
          >
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
            style={{
              boxShadow: "0 8px 20px rgba(45, 58, 74, 0.08)"
            }}
            >
              <div className="flex items-center space-x-3">
                {notification.type === 'success' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                <p className="font-medium">{notification.message}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Settings Hub</h1>
          <p className="text-secondary">Customize your Thorx cosmic experience</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary transition-all duration-300 shadow-primary">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.location.hash = tab.id;
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 border ${
                      activeTab === tab.id
                        ? 'bg-soft-pink/20 text-primary border-soft-pink/30'
                        : 'text-secondary hover:bg-tertiary hover:text-primary border-transparent'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" color="currentColor" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary transition-all duration-300 shadow-primary">
              {renderTabContent()}
            </div>
          </motion.div>
        </div>
        </div>
      </div>
  );
});

export default SettingsHub;