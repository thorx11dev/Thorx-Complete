import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'wouter';

interface AnimatedLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  linkTo?: string;
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  linkTo = '/',
  className = ''
}) => {
  const sizeConfig = {
    small: { icon: 'w-8 h-8', box: 'w-8 h-8', text: 'text-xl' },
    medium: { icon: 'w-10 h-10', box: 'w-10 h-10', text: 'text-2xl' },
    large: { icon: 'w-12 h-12', box: 'w-12 h-12', text: 'text-3xl' }
  };

  const config = sizeConfig[size];

  const logoContent = (
    <div className={`inline-flex items-center space-x-3 ${className}`}>
      <motion.div 
        className={`flex items-center justify-center ${config.box} bg-slate-800 rounded-xl border border-slate-700`}
        whileHover={{ scale: 1.1, rotate: 360, backgroundColor: '#475569' }}
        transition={{ duration: 0.6 }}
      >
        <Rocket className={`${config.icon} text-slate-300`} />
      </motion.div>
      {showText && (
        <span className={`${config.text} font-bold text-slate-200`}>Thorx</span>
      )}
    </div>
  );

  return linkTo ? (
    <Link to={linkTo}>
      {logoContent}
    </Link>
  ) : (
    logoContent
  );
};

export default AnimatedLogo;