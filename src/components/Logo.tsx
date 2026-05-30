import { motion } from 'motion/react';
// @ts-ignore
import brandLogo from '../assets/images/arcadia-logo-gold.png';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  theme?: 'dark' | 'light';
  onlyEmblem?: boolean;
}

export default function Logo({
  size = 48,
  className = '',
  showText = false,
  onlyEmblem = false
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="arcadia-logo-container">
      <motion.div
        className="relative shrink-0"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        id="arcadia-emblem-wrapper"
      >
        <img
          src={brandLogo}
          alt="ARCADIA RISE"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {showText && !onlyEmblem && (
        <div className="flex flex-col text-left justify-center select-none" id="arcadia-brand-label">
          <span className="text-lg md:text-xl font-serif font-bold tracking-[0.16em] text-[#C9A87C] leading-none text-gold-glow">
            ARCADIA RISE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#C9A87C]/60 uppercase ml-0.5 mt-1 font-mono">
            DIGITAL AGENCY
          </span>
        </div>
      )}
    </div>
  );
}
