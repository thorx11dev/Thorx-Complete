import React from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-medium text-primary mb-1">Theme Preference</h4>
          <p className="text-sm text-secondary">Thorx uses cosmic dark mode for the best experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <motion.div
          className="p-4 rounded-xl border-2 border-soft-pink bg-soft-pink/10 shadow-lg"
          style={{
            boxShadow: "0 8px 20px rgba(250, 173, 221, 0.2)"
          }}
        >
          {/* Theme Preview */}
          <div className="w-full h-16 rounded-lg mb-3 relative overflow-hidden bg-gray-800 border-2 border-gray-600">
            {/* Preview content */}
            <div className="absolute inset-2 space-y-1">
              <div className="h-2 rounded bg-gray-600" />
              <div className="h-1 w-3/4 rounded bg-gray-700" />
              <div className="h-1 w-1/2 rounded bg-gray-700" />
            </div>
            
            {/* Selection indicator */}
            <div className="absolute top-2 right-2 w-5 h-5 bg-soft-pink rounded-full flex items-center justify-center">
              <Moon className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Theme Info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-soft-pink transition-colors duration-300">
              <Moon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary">Dark Mode</div>
              <div className="text-xs text-secondary">Optimized for cosmic experience</div>
            </div>
          </div>

          {/* Active indicator */}
          <div className="h-0.5 bg-soft-pink rounded-full mt-3" />
        </motion.div>
      </div>

      {/* Additional Theme Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-tertiary rounded-lg border border-border-secondary"
      >
        <div className="flex items-center space-x-2 text-sm text-secondary">
          <div className="w-2 h-2 bg-soft-pink rounded-full" />
          <span>
            Thorx is designed specifically for dark mode to provide the best cosmic experience
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;