import { motion } from 'motion/react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="relative inline-flex items-center p-1 rounded-full bg-black/45 border border-[#C9A87C]/25 text-xs font-mono select-none h-9 w-28 shrink-0" id="lang-toggle-container">
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`flex-1 text-center z-10 transition-colors duration-300 font-sans font-medium text-[11px] rounded-full uppercase h-full flex items-center justify-center cursor-pointer ${
          currentLanguage === 'en' ? 'text-black font-semibold' : 'text-[#C9A87C]/70 hover:text-[#E8C97A]'
        }`}
        id="lang-btn-en"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange('ar')}
        className={`flex-1 text-center z-10 transition-colors duration-300 font-sans font-medium text-[11px] rounded-full uppercase h-full flex items-center justify-center cursor-pointer ${
          currentLanguage === 'ar' ? 'text-black font-semibold' : 'text-[#C9A87C]/70 hover:text-[#E8C97A]'
        }`}
        id="lang-btn-ar"
      >
        عربي
      </button>

      {/* Animated Pill indicator */}
      <motion.div
        className="absolute top-1 bottom-1 bg-[#C9A87C] rounded-full z-0 shadow-[0_0_10px_rgba(201,168,124,0.4)]"
        initial={false}
        animate={{
          left: currentLanguage === 'en' ? '4px' : '56px',
          width: '50px',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      />
    </div>
  );
}
