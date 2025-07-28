import React from 'react';
import ThorxLogo from './ThorxLogo';

// Brand variants for different contexts
export const ThorxBrandVariants = {
  // Navigation brand
  NavBrand: () => (
    <ThorxLogo size="sm" logoColor="#e2e8f0" />
  ),
  
  // Footer brand
  FooterBrand: () => (
    <ThorxLogo size="md" logoColor="#e2e8f0" />
  ),
  
  // Hero brand (large)
  HeroBrand: () => (
    <ThorxLogo size="xl" logoColor="#e2e8f0" />
  ),
  
  // Authentication page brand
  AuthBrand: () => (
    <ThorxLogo size="lg" logoColor="#e2e8f0" />
  ),
  
  // Dashboard brand
  DashboardBrand: () => (
    <ThorxLogo size="sm" logoColor="#e2e8f0" />
  ),
  
  // Size variants (logo only)
  Sizes: {
    xs: () => <ThorxLogo size="xs" logoColor="#e2e8f0" />,
    sm: () => <ThorxLogo size="sm" logoColor="#e2e8f0" />,
    md: () => <ThorxLogo size="md" logoColor="#e2e8f0" />,
    lg: () => <ThorxLogo size="lg" logoColor="#e2e8f0" />,
    xl: () => <ThorxLogo size="xl" logoColor="#e2e8f0" />,
    '2xl': () => <ThorxLogo size="2xl" logoColor="#e2e8f0" />
  },
  
  // Themed variants
  Light: {
    nav: () => <ThorxLogo size="sm" logoColor="#1e293b" />,
    footer: () => <ThorxLogo size="md" logoColor="#1e293b" />,
    hero: () => <ThorxLogo size="xl" logoColor="#1e293b" />
  },
  
  Dark: {
    nav: () => <ThorxLogo size="sm" logoColor="#e2e8f0" />,
    footer: () => <ThorxLogo size="md" logoColor="#e2e8f0" />,
    hero: () => <ThorxLogo size="xl" logoColor="#e2e8f0" />
  }
};

export default ThorxBrandVariants;