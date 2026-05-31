import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

function getInitial(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('arcadia-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  // Match the visitor's device setting
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  // apply on mount (after hydration to avoid SSR mismatch)
  useEffect(() => {
    const initial = getInitial();
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  // follow device changes only if the user hasn't chosen manually
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('arcadia-theme')) {
        const next: Theme = e.matches ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('arcadia-theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 rounded-full border border-[#C9A87C]/30 hover:border-[#C9A87C]/60 flex items-center justify-center text-[#C9A87C] hover:text-[#E8C97A] transition-colors duration-300 cursor-pointer overflow-hidden"
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -30 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.span>
    </button>
  );
}
