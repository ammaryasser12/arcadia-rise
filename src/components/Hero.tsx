import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translationCopy } from '../data';
import MagneticButton from './MagneticButton';

interface HeroProps {
  currentLanguage: Language;
  introComplete: boolean;
}

function ClipReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

export default function Hero({ currentLanguage, introComplete }: HeroProps) {
  const t = translationCopy[currentLanguage];
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const projects = useCountUp(50, 1400, statsVisible);
  const satisfaction = useCountUp(98, 1600, statsVisible);
  const years = useCountUp(3, 1000, statsVisible);

  useEffect(() => {
    if (!introComplete) return;
    const timer = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(timer);
  }, [introComplete]);

  const lines = currentLanguage === 'en'
    ? ['We Put', 'Your Business', 'On The Map.']
    : ['نقود مشروعك', 'للصدارة', 'والظهور.'];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Legibility scrim over the living canvas — keeps headline at WCAG-AA contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_30%_45%,rgba(10,10,10,0.78),rgba(10,10,10,0.35)_60%,transparent)]" />

      {/* Main content */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-32 pb-40 flex flex-col items-start"
      >
        {/* Badge */}
        {introComplete && (
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-[#C9A87C]/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C97A] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A87C] uppercase">
                {currentLanguage === 'en' ? "Alexandria's Premier Web Atelier" : 'الوكالة الرقمية الأولى بالإسكندرية'}
              </span>
            </motion.div>
          </div>
        )}

        {/* Giant headline — each letter reveals from its own mask (Splitting.js-style) */}
        <div className="mb-10" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
          {introComplete && lines.map((line, i) => (
            <div key={`${currentLanguage}-${i}`} className="overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                className={`block font-serif font-bold tracking-[-0.03em] leading-[1.06] text-[clamp(52px,9.5vw,148px)] ${
                  i === lines.length - 1 ? 'text-shimmer' : 'text-[#F5F0E8]'
                }`}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Subtext + CTA row */}
        {introComplete && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full max-w-4xl"
          >
            <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed max-w-sm font-sans-luxury">
              {t.hero.subheadline}
            </p>

            <div className="flex items-center gap-4 shrink-0">
              <MagneticButton
                href="https://wa.me/201554347348"
                target="_blank"
                rel="noopener noreferrer"
                strength={22}
                className="group relative flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black font-semibold text-xs tracking-[0.12em] uppercase overflow-hidden hover:shadow-[0_0_40px_rgba(201,168,124,0.5)] transition-shadow duration-500"
              >
                <span>{t.hero.cta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>

              <a
                href="#portfolio"
                onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-mono tracking-[0.15em] uppercase text-[#C9A87C]/60 hover:text-[#C9A87C] transition-colors duration-300 border-b border-transparent hover:border-[#C9A87C]/40 pb-0.5"
              >
                {currentLanguage === 'en' ? 'See Work ↓' : 'الأعمال ↓'}
              </a>
            </div>
          </motion.div>
        )}

        {/* Stats strip */}
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-20 flex items-center gap-0 divide-x divide-[#C9A87C]/10 border-t border-[#C9A87C]/10 pt-8 w-full max-w-lg"
          >
            {[
              { value: projects, suffix: '+', label: currentLanguage === 'en' ? 'Projects' : 'مشروع' },
              { value: years, suffix: '+', label: currentLanguage === 'en' ? 'Years' : 'سنوات' },
              { value: satisfaction, suffix: '%', label: currentLanguage === 'en' ? 'Satisfaction' : 'رضا' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col px-8 first:pl-0">
                <span className="text-3xl font-serif font-bold text-[#E8C97A] leading-none">
                  {s.value}{s.suffix}
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#C9A87C]/50 uppercase mt-1.5">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#C9A87C]/40 to-transparent"
          />
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#C9A87C]/30 uppercase">Scroll</span>
        </motion.div>
      )}
    </section>
  );
}
