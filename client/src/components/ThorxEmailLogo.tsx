import React from 'react';
import thorxLogoImage from '@assets/WhatsApp Image 2025-07-14 at 11.14.27_2d89cec2_1752689411906.jpg';

interface ThorxEmailLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ThorxEmailLogo: React.FC<ThorxEmailLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src={thorxLogoImage} 
        alt="Thorx Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ThorxEmailLogo;