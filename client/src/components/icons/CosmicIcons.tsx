import React from 'react';

// Enhanced cosmic-themed icons maintaining original colors with space elements
export const CosmicHome = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main house structure */}
    <path d="M3 12L12 3L21 12V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V12Z" 
          stroke={color} strokeWidth="2" fill="none"/>
    <path d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21" 
          stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Cosmic elements - small stars around the house */}
    <circle cx="6" cy="8" r="0.5" fill={color} opacity="0.6"/>
    <circle cx="18" cy="9" r="0.5" fill={color} opacity="0.6"/>
    <circle cx="7" cy="15" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="17" cy="16" r="0.3" fill={color} opacity="0.4"/>
    
    {/* Subtle orbital ring around the roof */}
    <ellipse cx="12" cy="8" rx="6" ry="2" stroke={color} strokeWidth="0.5" 
             fill="none" opacity="0.3" strokeDasharray="2,2"/>
  </svg>
);

export const CosmicBarChart = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main chart bars */}
    <rect x="3" y="12" width="4" height="9" fill={color} rx="1"/>
    <rect x="10" y="8" width="4" height="13" fill={color} rx="1"/>
    <rect x="17" y="4" width="4" height="17" fill={color} rx="1"/>
    
    {/* Cosmic enhancement - constellation lines connecting bar tops */}
    <path d="M5 12L12 8L19 4" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="1,1"/>
    
    {/* Small stars at bar peaks */}
    <g fill={color} opacity="0.7">
      <polygon points="5,11 5.5,12.5 7,12 5.5,11.5" transform="scale(0.3) translate(10,25)"/>
      <polygon points="12,7 12.5,8.5 14,8 12.5,7.5" transform="scale(0.3) translate(25,15)"/>
      <polygon points="19,3 19.5,4.5 21,4 19.5,3.5" transform="scale(0.3) translate(40,5)"/>
    </g>
    
    {/* Subtle cosmic dust particles */}
    <circle cx="7" cy="15" r="0.3" fill={color} opacity="0.3"/>
    <circle cx="15" cy="11" r="0.3" fill={color} opacity="0.3"/>
    <circle cx="20" cy="7" r="0.3" fill={color} opacity="0.3"/>
  </svg>
);

export const CosmicDollarSign = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main dollar sign */}
    <path d="M12 2V22M17 5H9.5C8.11929 5 7 6.11929 7 7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5C17 13.8807 15.8807 15 14.5 15H7" 
          stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Cosmic orbital rings around the dollar sign */}
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="0.5" 
             fill="none" opacity="0.2" strokeDasharray="3,2"/>
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke={color} strokeWidth="0.5" 
             fill="none" opacity="0.3" strokeDasharray="2,1"/>
    
    {/* Small celestial bodies orbiting */}
    <circle cx="22" cy="12" r="0.8" fill={color} opacity="0.5"/>
    <circle cx="2" cy="12" r="0.6" fill={color} opacity="0.4"/>
    <circle cx="12" cy="2" r="0.5" fill={color} opacity="0.3"/>
    <circle cx="12" cy="22" r="0.5" fill={color} opacity="0.3"/>
    
    {/* Sparkle effects */}
    <g fill={color} opacity="0.6">
      <polygon points="6,6 6.3,6.7 7,7 6.3,7.3 6,8 5.7,7.3 5,7 5.7,6.7" transform="scale(0.4)"/>
      <polygon points="18,18 18.3,18.7 19,19 18.3,19.3 18,20 17.7,19.3 17,19 17.7,18.7" transform="scale(0.4)"/>
    </g>
  </svg>
);

export const CosmicBriefcase = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main briefcase */}
    <rect x="2" y="7" width="20" height="12" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 4V7" 
          stroke={color} strokeWidth="2" fill="none"/>
    <path d="M2 12H22" stroke={color} strokeWidth="2"/>
    
    {/* Cosmic enhancement - constellation pattern on briefcase */}
    <g stroke={color} strokeWidth="0.5" opacity="0.4">
      <circle cx="7" cy="10" r="0.5" fill={color}/>
      <circle cx="12" cy="9" r="0.5" fill={color}/>
      <circle cx="17" cy="11" r="0.5" fill={color}/>
      <path d="M7 10L12 9L17 11" strokeDasharray="1,1"/>
    </g>
    
    {/* Orbital rings around the briefcase */}
    <ellipse cx="12" cy="13" rx="12" ry="3" stroke={color} strokeWidth="0.3" 
             fill="none" opacity="0.2" strokeDasharray="4,2"/>
    
    {/* Small cosmic particles */}
    <circle cx="5" cy="15" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="19" cy="16" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="12" cy="21" r="0.4" fill={color} opacity="0.3"/>
    
    {/* Subtle star pattern */}
    <g fill={color} opacity="0.5">
      <polygon points="4,4 4.2,4.5 4.7,4.7 4.2,4.9 4,5.4 3.8,4.9 3.3,4.7 3.8,4.5" transform="scale(0.3)"/>
      <polygon points="20,20 20.2,20.5 20.7,20.7 20.2,20.9 20,21.4 19.8,20.9 19.3,20.7 19.8,20.5" transform="scale(0.3)"/>
    </g>
  </svg>
);

export const CosmicCreditCard = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main credit card */}
    <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M2 10H22" stroke={color} strokeWidth="2"/>
    
    {/* Cosmic chip design */}
    <rect x="6" y="13" width="3" height="2" rx="0.5" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="7.5" cy="14" r="0.3" fill={color} opacity="0.6"/>
    
    {/* Constellation pattern on card */}
    <g stroke={color} strokeWidth="0.4" opacity="0.5">
      <circle cx="13" cy="14" r="0.4" fill={color}/>
      <circle cx="16" cy="15" r="0.3" fill={color}/>
      <circle cx="18" cy="13" r="0.3" fill={color}/>
      <path d="M13 14L16 15L18 13" strokeDasharray="0.5,0.5"/>
    </g>
    
    {/* Orbital payment waves */}
    <g stroke={color} strokeWidth="0.5" fill="none" opacity="0.3">
      <path d="M2 12C8 8, 16 8, 22 12" strokeDasharray="2,1"/>
      <path d="M2 14C8 10, 16 10, 22 14" strokeDasharray="2,1"/>
    </g>
    
    {/* Cosmic particles around card */}
    <circle cx="1" cy="8" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="23" cy="16" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="12" cy="3" r="0.4" fill={color} opacity="0.3"/>
    <circle cx="12" cy="21" r="0.4" fill={color} opacity="0.3"/>
    
    {/* Sparkle effects */}
    <g fill={color} opacity="0.6">
      <polygon points="20,7 20.2,7.4 20.6,7.6 20.2,7.8 20,8.2 19.8,7.8 19.4,7.6 19.8,7.4" transform="scale(0.4)"/>
      <polygon points="4,17 4.2,17.4 4.6,17.6 4.2,17.8 4,18.2 3.8,17.8 3.4,17.6 3.8,17.4" transform="scale(0.4)"/>
    </g>
  </svg>
);

export const CosmicSettings = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main gear */}
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 1L13.09 8.26L22 9L13.09 15.74L12 23L10.91 15.74L2 15L10.91 8.26L12 1Z" 
          stroke={color} strokeWidth="1.5" fill="none" opacity="0.7"/>
    
    {/* Inner cosmic core */}
    <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.8"/>
    <circle cx="12" cy="12" r="0.8" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5"/>
    
    {/* Orbital rings around the gear */}
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="0.5" 
            fill="none" opacity="0.2" strokeDasharray="3,2"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="0.5" 
            fill="none" opacity="0.3" strokeDasharray="2,1"/>
    
    {/* Small celestial bodies in orbit */}
    <circle cx="20" cy="12" r="0.6" fill={color} opacity="0.5"/>
    <circle cx="4" cy="12" r="0.5" fill={color} opacity="0.4"/>
    <circle cx="12" cy="4" r="0.5" fill={color} opacity="0.4"/>
    <circle cx="12" cy="20" r="0.5" fill={color} opacity="0.4"/>
    
    {/* Cosmic energy lines */}
    <g stroke={color} strokeWidth="0.3" opacity="0.3">
      <path d="M12 0L12 4" strokeDasharray="1,1"/>
      <path d="M12 20L12 24" strokeDasharray="1,1"/>
      <path d="M0 12L4 12" strokeDasharray="1,1"/>
      <path d="M20 12L24 12" strokeDasharray="1,1"/>
    </g>
    
    {/* Star sparkles */}
    <g fill={color} opacity="0.6">
      <polygon points="6,6 6.2,6.5 6.7,6.7 6.2,6.9 6,7.4 5.8,6.9 5.3,6.7 5.8,6.5" transform="scale(0.4)"/>
      <polygon points="18,18 18.2,18.5 18.7,18.7 18.2,18.9 18,19.4 17.8,18.9 17.3,18.7 17.8,18.5" transform="scale(0.4)"/>
    </g>
  </svg>
);

export const CosmicBell = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main bell */}
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
          stroke={color} strokeWidth="2" fill="none"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
          stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Cosmic sound waves */}
    <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.4">
      <path d="M19 8C21 8 22 9 22 10" strokeDasharray="2,1"/>
      <path d="M5 8C3 8 2 9 2 10" strokeDasharray="2,1"/>
      <path d="M20 6C22.5 6 24 7.5 24 9" strokeDasharray="2,1"/>
      <path d="M4 6C1.5 6 0 7.5 0 9" strokeDasharray="2,1"/>
    </g>
    
    {/* Cosmic particles emanating from bell */}
    <g fill={color} opacity="0.5">
      <circle cx="15" cy="5" r="0.4"/>
      <circle cx="9" cy="5" r="0.3"/>
      <circle cx="20" cy="10" r="0.3"/>
      <circle cx="4" cy="10" r="0.3"/>
      <circle cx="22" cy="12" r="0.4"/>
      <circle cx="2" cy="12" r="0.4"/>
    </g>
    
    {/* Stellar crown above bell */}
    <g fill={color} opacity="0.6">
      <polygon points="12,1 12.2,1.5 12.7,1.7 12.2,1.9 12,2.4 11.8,1.9 11.3,1.7 11.8,1.5" transform="scale(0.5)"/>
      <circle cx="10" cy="2" r="0.2"/>
      <circle cx="14" cy="2" r="0.2"/>
    </g>
    
    {/* Orbital notification ring */}
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="0.3" 
            fill="none" opacity="0.2" strokeDasharray="4,3"/>
  </svg>
);

export const CosmicShield = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main shield */}
    <path d="M12 22S2 18 2 12V6L12 2L22 6V12C22 18 12 22 12 22Z" 
          stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Cosmic protection core */}
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7"/>
    <circle cx="12" cy="12" r="2" fill={color} opacity="0.6"/>
    
    {/* Constellation pattern inside shield */}
    <g stroke={color} strokeWidth="0.5" opacity="0.5">
      <circle cx="9" cy="9" r="0.4" fill={color}/>
      <circle cx="15" cy="9" r="0.4" fill={color}/>
      <circle cx="12" cy="15" r="0.4" fill={color}/>
      <path d="M9 9L15 9L12 15L9 9" strokeDasharray="1,0.5"/>
    </g>
    
    {/* Protective energy field */}
    <ellipse cx="12" cy="12" rx="8" ry="6" stroke={color} strokeWidth="0.4" 
             fill="none" opacity="0.3" strokeDasharray="3,2"/>
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke={color} strokeWidth="0.3" 
             fill="none" opacity="0.2" strokeDasharray="4,3"/>
    
    {/* Cosmic guardian stars */}
    <g fill={color} opacity="0.6">
      <polygon points="6,6 6.3,6.8 7.1,7.1 6.3,7.4 6,8.2 5.7,7.4 4.9,7.1 5.7,6.8" transform="scale(0.3)"/>
      <polygon points="18,6 18.3,6.8 19.1,7.1 18.3,7.4 18,8.2 17.7,7.4 16.9,7.1 17.7,6.8" transform="scale(0.3)"/>
      <polygon points="12,20 12.3,20.8 13.1,21.1 12.3,21.4 12,22.2 11.7,21.4 10.9,21.1 11.7,20.8" transform="scale(0.3)"/>
    </g>
    
    {/* Energy particles */}
    <circle cx="4" cy="10" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="20" cy="10" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="8" cy="18" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="16" cy="18" r="0.3" fill={color} opacity="0.4"/>
  </svg>
);

export const CosmicPalette = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main palette */}
    <path d="M12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3679 4.88258 18 6.4087 18 8C18 9.5913 17.3679 11.1174 16.2426 12.2426C15.1174 13.3679 13.5913 14 12 14H8C6.89543 14 6 14.8954 6 16C6 17.1046 6.89543 18 8 18C9.1046 18 10 17.1046 10 16V14" 
          stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Cosmic color dots with stellar enhancement */}
    <g fill={color}>
      <circle cx="9" cy="6" r="1" opacity="0.8"/>
      <circle cx="14" cy="6" r="1" opacity="0.8"/>
      <circle cx="9" cy="10" r="1" opacity="0.8"/>
      <circle cx="14" cy="10" r="1" opacity="0.8"/>
    </g>
    
    {/* Star sparkles around color dots */}
    <g fill={color} opacity="0.5">
      <polygon points="9,4 9.2,4.5 9.7,4.7 9.2,4.9 9,5.4 8.8,4.9 8.3,4.7 8.8,4.5" transform="scale(0.2)"/>
      <polygon points="14,4 14.2,4.5 14.7,4.7 14.2,4.9 14,5.4 13.8,4.9 13.3,4.7 13.8,4.5" transform="scale(0.2)"/>
      <polygon points="9,8 9.2,8.5 9.7,8.7 9.2,8.9 9,9.4 8.8,8.9 8.3,8.7 8.8,8.5" transform="scale(0.2)"/>
      <polygon points="14,8 14.2,8.5 14.7,8.7 14.2,8.9 14,9.4 13.8,8.9 13.3,8.7 13.8,8.5" transform="scale(0.2)"/>
    </g>
    
    {/* Cosmic brush with stellar trail */}
    <circle cx="8" cy="16" r="1.5" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M6.5 17.5L4 20L2 22" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    
    {/* Stellar dust trail */}
    <g fill={color} opacity="0.4">
      <circle cx="5" cy="18.5" r="0.2"/>
      <circle cx="3.5" cy="20" r="0.3"/>
      <circle cx="2.5" cy="21" r="0.2"/>
    </g>
    
    {/* Orbital creativity rings */}
    <ellipse cx="12" cy="8" rx="8" ry="4" stroke={color} strokeWidth="0.3" 
             fill="none" opacity="0.2" strokeDasharray="3,2"/>
    <ellipse cx="12" cy="8" rx="6" ry="3" stroke={color} strokeWidth="0.3" 
             fill="none" opacity="0.3" strokeDasharray="2,1"/>
    
    {/* Cosmic inspiration particles */}
    <circle cx="20" cy="8" r="0.4" fill={color} opacity="0.5"/>
    <circle cx="4" cy="8" r="0.3" fill={color} opacity="0.4"/>
    <circle cx="12" cy="1" r="0.3" fill={color} opacity="0.4"/>
  </svg>
);

export const CosmicGlobe = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main globe */}
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Latitude lines */}
    <path d="M2 12H22" stroke={color} strokeWidth="1" opacity="0.6"/>
    <path d="M5 8C8 8 16 8 19 8" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    <path d="M5 16C8 16 16 16 19 16" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    
    {/* Longitude lines */}
    <path d="M12 2C12 6 12 18 12 22" stroke={color} strokeWidth="1" opacity="0.6"/>
    <path d="M8 2.5C8 6 8 18 8 21.5" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    <path d="M16 2.5C16 6 16 18 16 21.5" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    
    {/* Cosmic continents with stellar details */}
    <g fill={color} opacity="0.7">
      <path d="M6 10C8 9 10 10 11 9C12 8 13 9 14 10C15 11 16 10 17 11" 
            stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M7 14C9 13 11 14 13 13C15 12 17 13 18 14" 
            stroke={color} strokeWidth="1.5" fill="none"/>
    </g>
    
    {/* Orbital satellite paths */}
    <ellipse cx="12" cy="12" rx="14" ry="6" stroke={color} strokeWidth="0.4" 
             fill="none" opacity="0.3" strokeDasharray="4,2" transform="rotate(30 12 12)"/>
    <ellipse cx="12" cy="12" rx="14" ry="6" stroke={color} strokeWidth="0.4" 
             fill="none" opacity="0.3" strokeDasharray="4,2" transform="rotate(-30 12 12)"/>
    
    {/* Satellites */}
    <circle cx="20" cy="8" r="0.8" fill={color} opacity="0.6"/>
    <circle cx="4" cy="16" r="0.6" fill={color} opacity="0.5"/>
    <circle cx="18" cy="18" r="0.7" fill={color} opacity="0.5"/>
    
    {/* Cosmic stars around globe */}
    <g fill={color} opacity="0.5">
      <polygon points="2,6 2.3,6.7 3,7 2.3,7.3 2,8 1.7,7.3 1,7 1.7,6.7" transform="scale(0.3)"/>
      <polygon points="22,6 22.3,6.7 23,7 22.3,7.3 22,8 21.7,7.3 21,7 21.7,6.7" transform="scale(0.3)"/>
      <polygon points="2,18 2.3,18.7 3,19 2.3,19.3 2,20 1.7,19.3 1,19 1.7,18.7" transform="scale(0.3)"/>
      <polygon points="22,18 22.3,18.7 23,19 22.3,19.3 22,20 21.7,19.3 21,19 21.7,18.7" transform="scale(0.3)"/>
    </g>
    
    {/* Cosmic energy emanation */}
    <circle cx="12" cy="12" r="12" stroke={color} strokeWidth="0.2" 
            fill="none" opacity="0.2" strokeDasharray="6,4"/>
  </svg>
);