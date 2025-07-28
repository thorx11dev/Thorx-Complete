import { useEffect, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

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
      className={`${getAnimationClass()} ${className} ${isVisible ? 'animate' : ''}`}
      style={{ '--delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface CosmicScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

export const CosmicScrollReveal: React.FC<CosmicScrollRevealProps> = ({ 
  children, 
  threshold = 0.1, 
  className = '' 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const element = document.querySelector('.cosmic-scroll-reveal');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div className={`cosmic-scroll-reveal ${isRevealed ? 'revealed' : ''} ${className}`}>
      {children}
    </div>
  );
};

interface CosmicParticlesProps {
  count?: number;
  className?: string;
}

export const CosmicParticles: React.FC<CosmicParticlesProps> = ({ 
  count = 0, 
  className = '' 
}) => {
  // Particles disabled for cleaner team portal experience
  return null;
};

interface AsymmetricLayoutProps {
  children: React.ReactNode;
  variant?: 'split' | 'broken-grid' | 'overlapping';
  className?: string;
}

export const AsymmetricLayout: React.FC<AsymmetricLayoutProps> = ({
  children,
  variant = 'split',
  className = ''
}) => {
  const getLayoutClass = () => {
    switch (variant) {
      case 'split': return 'cosmic-split-screen';
      case 'broken-grid': return 'cosmic-broken-grid';
      case 'overlapping': return 'cosmic-asymmetric-container';
      default: return 'cosmic-split-screen';
    }
  };

  return (
    <div className={`${getLayoutClass()} ${className}`}>
      {children}
    </div>
  );
};

interface CosmicModuleProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'magnetic' | 'none';
}

export const CosmicModule: React.FC<CosmicModuleProps> = ({
  children,
  className = '',
  hoverEffect = 'lift'
}) => {
  const getHoverClass = () => {
    switch (hoverEffect) {
      case 'lift': return 'cosmic-hover-lift';
      case 'magnetic': return 'cosmic-magnetic-hover';
      case 'none': return '';
      default: return 'cosmic-hover-lift';
    }
  };

  return (
    <div className={`cosmic-module ${getHoverClass()} ${className}`}>
      {children}
    </div>
  );
};