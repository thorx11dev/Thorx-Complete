import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, Home, BarChart3, DollarSign, Briefcase, CreditCard, Bell, Shield, HelpCircle, Star, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ThorxLogo } from './ThorxLogo';


const Navbar = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/work', label: 'Work', icon: Briefcase },
    { path: '/payout', label: 'Payouts', icon: CreditCard },
  ];

  const isActive = (path: string) => location === path;

  const handleSignOut = () => {
    setShowSignOutConfirm(true);
    setShowUserMenu(false);
  };

  const confirmSignOut = () => {
    logout();
    setShowSignOutConfirm(false);
  };

  const cancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200">
            <ThorxLogo size="md" className="text-slate-900 dark:text-slate-100" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      active
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <motion.div
                      animate={active ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.6, repeat: active ? Infinity : 0, repeatDelay: 3 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg -z-10"
                        initial={false}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* User Menu / Sign In */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <motion.div 
                      className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{
                        boxShadow: showUserMenu 
                          ? "0 0 20px rgba(59, 130, 246, 0.4)" 
                          : "0 4px 15px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      <User className="w-5 h-5 text-white" />
                    </motion.div>
                    <motion.div 
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{user.firstName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="dropdown-menu py-2"
                      style={{
                        zIndex: 9999,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                        position: "absolute",
                        top: "100%",
                        right: "0"
                      }}
                    >
                      {/* User Profile Header */}
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-slate-600 dark:text-slate-400">Premium Member</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">$1,234</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Earnings</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">89</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Tasks</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">42</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Streak</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <Link
                            to="/settings"
                            className="dropdown-menu-item flex items-center space-x-3 px-4 py-3 text-sm"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Account Settings</span>
                          </Link>
                        </motion.div>
                        
                        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <a
                            href="/settings#notifications"
                            className="dropdown-menu-item flex items-center space-x-3 px-4 py-3 text-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowUserMenu(false);
                              if (window.location.pathname === '/settings') {
                                window.location.hash = 'notifications';
                              } else {
                                window.location.href = '/settings#notifications';
                              }
                            }}
                          >
                            <Bell className="w-4 h-4" />
                            <span>Notifications</span>
                            <div className="ml-auto w-2 h-2 bg-red-500 rounded-full notification-pulse"></div>
                          </a>
                        </motion.div>
                        
                        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <a
                            href="/settings#security"
                            className="dropdown-menu-item flex items-center space-x-3 px-4 py-3 text-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowUserMenu(false);
                              if (window.location.pathname === '/settings') {
                                window.location.hash = 'security';
                              } else {
                                window.location.href = '/settings#security';
                              }
                            }}
                          >
                            <Shield className="w-4 h-4" />
                            <span>Security & Privacy</span>
                          </a>
                        </motion.div>
                        

                        
                        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <Link
                            to="/help"
                            className="dropdown-menu-item flex items-center space-x-3 px-4 py-3 text-sm"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help & Support</span>
                          </Link>
                        </motion.div>
                      </div>

                      {/* Sign Out */}
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-1">
                        <motion.button
                          onClick={handleSignOut}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: showMobileMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-700 py-2"
            >
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          active
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <motion.div
                          animate={active ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5, repeat: active ? Infinity : 0, repeatDelay: 2 }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {!user && (
                <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                  <Link
                    to="/auth"
                    className="block px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Sign Out
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Are you sure you want to sign out?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelSignOut}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSignOut}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;