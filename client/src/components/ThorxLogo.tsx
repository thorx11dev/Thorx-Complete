import React from 'react';

interface ThorxLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  logoColor?: string;
}

const sizeMap = {
  xs: { width: 60, height: 24 },
  sm: { width: 80, height: 32 },
  md: { width: 120, height: 48 },
  lg: { width: 160, height: 64 },
  xl: { width: 200, height: 80 },
  '2xl': { width: 280, height: 112 }
};

export const ThorxLogo: React.FC<ThorxLogoProps> = ({ 
  size = 'md', 
  className = '',
  logoColor = '#e2e8f0'
}) => {
  const dimensions = sizeMap[size];
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Thorx Logo SVG */}
      <svg 
        width={dimensions.width} 
        height={dimensions.height} 
        viewBox="0 0 280 112" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="thorxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={logoColor} stopOpacity="1" />
            <stop offset="50%" stopColor={logoColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={logoColor} stopOpacity="0.9" />
          </linearGradient>
          <filter id="letterShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Letter T */}
        <g filter="url(#letterShadow)">
          <rect x="8" y="20" width="40" height="8" fill="url(#thorxGradient)" rx="2"/>
          <rect x="22" y="20" width="12" height="52" fill="url(#thorxGradient)" rx="2"/>
        </g>
        
        {/* Letter h */}
        <g filter="url(#letterShadow)">
          <rect x="58" y="8" width="10" height="64" fill="url(#thorxGradient)" rx="2"/>
          <rect x="58" y="36" width="26" height="8" fill="url(#thorxGradient)" rx="2"/>
          <rect x="74" y="36" width="10" height="36" fill="url(#thorxGradient)" rx="2"/>
        </g>
        
        {/* Letter o (Hexagonal design) */}
        <g filter="url(#letterShadow)">
          <polygon 
            points="106,40 118,34 130,40 130,56 118,62 106,56" 
            fill="none" 
            stroke="url(#thorxGradient)" 
            strokeWidth="8" 
            strokeLinejoin="round"
          />
          {/* Inner hexagon detail */}
          <polygon 
            points="110,44 118,40 126,44 126,52 118,56 110,52" 
            fill="url(#thorxGradient)" 
            opacity="0.6"
          />
        </g>
        
        {/* Letter r */}
        <g filter="url(#letterShadow)">
          <rect x="146" y="36" width="10" height="36" fill="url(#thorxGradient)" rx="2"/>
          <path 
            d="M146 44 Q156 36 166 36 Q172 36 172 42 Q172 48 166 48 L156 48 L166 64 L172 72" 
            fill="none" 
            stroke="url(#thorxGradient)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </g>
        
        {/* Letter x */}
        <g filter="url(#letterShadow)">
          <line x1="188" y1="36" x2="212" y2="72" stroke="url(#thorxGradient)" strokeWidth="10" strokeLinecap="round"/>
          <line x1="212" y1="36" x2="188" y2="72" stroke="url(#thorxGradient)" strokeWidth="10" strokeLinecap="round"/>
          {/* X center accent */}
          <circle cx="200" cy="54" r="4" fill="url(#thorxGradient)" opacity="0.8"/>
        </g>
        
        {/* Cosmic accent elements */}
        <g opacity="0.6">
          <circle cx="240" cy="25" r="2" fill={logoColor} opacity="0.8">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="250" cy="35" r="1.5" fill={logoColor} opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="245" cy="45" r="1" fill={logoColor} opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Subtle background rays */}
        <g opacity="0.1">
          <line x1="140" y1="10" x2="140" y2="0" stroke={logoColor} strokeWidth="1"/>
          <line x1="145" y1="12" x2="147" y2="2" stroke={logoColor} strokeWidth="0.5"/>
          <line x1="135" y1="12" x2="133" y2="2" stroke={logoColor} strokeWidth="0.5"/>
        </g>
      </svg>
    </div>
  );
};

export default ThorxLogo;