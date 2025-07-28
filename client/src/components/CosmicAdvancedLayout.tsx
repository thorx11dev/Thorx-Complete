import React, { useEffect, useState } from 'react';

interface CosmicEntranceProps {
  children: React.ReactNode;
  type: 'stellar' | 'orbital' | 'zoom' | 'constellation' | 'galaxy' | 'nebula';
  delay?: number;
  className?: string;
}

export const CosmicEntrance: React.FC<CosmicEntranceProps> = ({ 
  children, 
  type, 
  delay = 0, 
  className = '' 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!mounted) return <div className="opacity-0">{children}</div>;

  const getAnimationClass = () => {
    switch (type) {
      case 'stellar': return 'cosmic-stellar-entrance';
      case 'orbital': return 'cosmic-orbital-entrance';
      case 'zoom': return 'cosmic-zoom-entrance';
      case 'constellation': return 'cosmic-constellation-entrance';
      case 'galaxy': return 'cosmic-galaxy-entrance';
      case 'nebula': return 'cosmic-nebula-entrance';
      default: return 'cosmic-stellar-entrance';
    }
  };

  return (
    <div 
      className={`${getAnimationClass()} ${className}`}
      style={{ '--delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface AsymmetricGridProps {
  children: React.ReactNode;
  className?: string;
}

export const AsymmetricGrid: React.FC<AsymmetricGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`cosmic-asymmetric-container ${className}`}>
      {children}
    </div>
  );
};

interface CosmicModuleProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'lift' | 'magnetic' | 'glass';
}

export const CosmicModule: React.FC<CosmicModuleProps> = ({ 
  children, 
  className = '', 
  effect = 'lift' 
}) => {
  const getEffectClass = () => {
    switch (effect) {
      case 'lift': return 'cosmic-hover-lift';
      case 'magnetic': return 'cosmic-magnetic-hover';
      case 'glass': return 'cosmic-glass-advanced';
      default: return 'cosmic-hover-lift';
    }
  };

  return (
    <div className={`cosmic-module ${getEffectClass()} ${className}`}>
      {children}
    </div>
  );
};

interface SplitScreenLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({ 
  leftContent, 
  rightContent, 
  className = '' 
}) => {
  return (
    <div className={`cosmic-split-screen ${className}`}>
      <div className="cosmic-split-left">
        {leftContent}
      </div>
      <div className="cosmic-split-right">
        {rightContent}
      </div>
    </div>
  );
};

interface BrokenGridProps {
  items: React.ReactNode[];
  className?: string;
}

export const BrokenGrid: React.FC<BrokenGridProps> = ({ items, className = '' }) => {
  return (
    <div className={`cosmic-broken-grid ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`cosmic-grid-item-${(index % 3) + 1}`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export const CosmicParticles: React.FC<{ count?: number }> = ({ count = 50 }) => {
  return (
    <div className="cosmic-particles">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="cosmic-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

// Main layout component
export interface CosmicAdvancedLayoutProps {
  children: React.ReactNode;
}

const CosmicAdvancedLayout: React.FC<CosmicAdvancedLayoutProps> = ({ children }) => {
  return (
    <div className="cosmic-advanced-layout">
      {children}
    </div>
  );
};

// Export as default
export default CosmicAdvancedLayout;