import { useState, useEffect, createContext, useContext } from 'react';

export type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Thorx now uses only dark mode for the best cosmic experience
    return 'dark';
  });

  const setTheme = (newTheme: Theme) => {
    // Thorx is now locked to dark mode only
    setThemeState('dark');
    localStorage.setItem('thorx_theme', 'dark');
    
    // Apply dark theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
    
    // Force dark theme application
    root.setAttribute('data-theme', 'dark');
    
    // Ensure body background is dark
    document.body.style.setProperty('background-color', '#0f172a', 'important');
    root.style.setProperty('color-scheme', 'dark');
  };

  const toggleTheme = () => {
    // Theme toggle disabled - Thorx uses only dark mode
    setTheme('dark');
  };

  // Apply dark theme on mount
  useEffect(() => {
    // Force dark theme application
    const root = document.documentElement;
    
    // Clear all possible conflicting classes first
    root.classList.remove('light', 'dark', 'system');
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    
    // Set dark theme CSS custom properties
    root.style.setProperty('--bg-primary', '#0f172a', 'important');
    root.style.setProperty('--bg-secondary', '#1e293b', 'important');
    root.style.setProperty('--bg-tertiary', '#334155', 'important');
    root.style.setProperty('--text-primary', '#f8fafc', 'important');
    root.style.setProperty('--text-secondary', '#e2e8f0', 'important');
    root.style.setProperty('--text-tertiary', '#cbd5e1', 'important');
    root.style.setProperty('--border-primary', '#475569', 'important');
    root.style.setProperty('--border-secondary', '#334155', 'important');
    root.style.setProperty('--shadow-primary', 'rgba(0, 0, 0, 0.4)', 'important');
    root.style.setProperty('--shadow-secondary', 'rgba(0, 0, 0, 0.25)', 'important');
    root.style.setProperty('color-scheme', 'dark');
    document.body.style.setProperty('background-color', '#0f172a', 'important');
    
    // Prevent any interference from other sources
    requestAnimationFrame(() => {
      root.classList.remove('light', 'dark', 'system');
      root.classList.add('dark');
    });
  }, []);

  // System theme changes are ignored - Thorx uses only dark mode
  useEffect(() => {
    // No-op: Thorx is locked to dark mode regardless of system preference
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme
  };
};

export { ThemeContext };
export type { ThemeContextType };