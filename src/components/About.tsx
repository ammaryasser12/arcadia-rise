import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { translationCopy } from '../data';
import Logo from './Logo';

interface AboutProps {
  currentLanguage: Language;
}

export default function About({ currentLanguage }: AboutProps) {
  const t = translationCopy[currentLanguage];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const quoteY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.92]);

  const pillars = [
    {
      icon: '↗',
      title: currentLanguage === 'en' ? 'Our Mission' : 'رسالتنا',
      body: currentLanguage === 'en' ? 'End digital invisibility for Egyptian businesses' : 'إنهاء الاختفاء الرقمي للأعمال المصرية',
    },
    {
      icon: '◈',
      title: currentLanguage === 'en' ? 'Our Standard' : 'معيارنا',
      body: currentLanguage === 'en' ? 'Luxury-grade responsive design, every project' : 'تصميم فاخر ومتجاوب في كل مشروع',
    },
    {
      icon: '⌘',
      title: currentLanguage === 'en' ? 'Our Base' : 'مقرنا',
      body: currentLanguage === 'en' ? 'Alexandria, Egypt — serving the nation' : 'الإسكندرية، مصر — نخدم كل مصر',
    },
  ];

  return (
    <section ref={ref} id="about" className="relative bg-[#0D0D0D] overflow-hidden">

      {/* Top ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B6914]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 pt-32 pb-0">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-8 h-[1px] bg-[#C9A87C]/50" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">
            {t.about.sectionSubtitle}
          </span>
        </motion.div>

        {/* Centered orb + coordinates */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            style={{ scale: orbScale }}
            className="relative w-56 h-56 flex items-center justify-center mb-10"
          >
            {/* Gyroscope rings — using existing CSS classes */}
            <div className="gyro-ring gyro-ring-1" />
            <div className="gyro-ring gyro-ring-2" />
            <div className="gyro-ring gyro-ring-3" />
            <div className="gyro-ring gyro-ring-4" />
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-full bg-[#C9A87C]/8 blur-[50px] animate-pulse-slow pointer-events-none" />
            {/* Logo */}
            <div className="absolute inset-12 flex items-center justify-center z-10">
              <Logo size={130} onlyEmblem={true} />
            </div>
          </motion.div>

          {/* Coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8 font-mono text-[10px] text-[#C9A87C]/40 tracking-[0.2em] uppercase"
          >
            <span>31.2001° N</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A87C]/25" />
            <span>29.9187° E</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A87C]/25" />
            <span>Alexandria, Egypt</span>
          </motion.div>
        </div>

        {/* Giant pull-quote — clip reveal */}
        <motion.div
          style={{ y: quoteY }}
          className="max-w-5xl mx-auto text-center mb-20"
        >
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <span
                className="block font-serif font-bold text-[#F5F0E8] leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(36px, 6.5vw, 96px)' }}
              >
                {currentLanguage === 'en' ? '"Built on the shores' : '"تأسس على شواطئ'}
              </span>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <span
                className="block font-serif font-bold text-shimmer leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(36px, 6.5vw, 96px)' }}
              >
                {currentLanguage === 'en' ? 'of Alexandria.' : 'الإسكندرية.'}
              </span>
            </motion.div>
          </div>

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-[#F5F0E8]/55 text-sm md:text-base leading-[1.9] font-sans-luxury max-w-2xl mx-auto mt-10"
          >
            {t.about.desc}
          </motion.p>
        </motion.div>

      </div>

      {/* ── PILLARS STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-[#C9A87C]/10 mt-4"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C9A87C]/10">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group py-10 px-8 flex flex-col gap-4 hover:bg-[#C9A87C]/3 transition-colors duration-400"
              >
                <span className="text-xl text-[#C9A87C]/40 group-hover:text-[#C9A87C]/70 transition-colors duration-300 font-serif">
                  {pillar.icon}
                </span>
                <div>
                  <h4 className="text-[9px] font-mono tracking-[0.25em] text-[#C9A87C] uppercase mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-[#F5F0E8]/50 font-sans-luxury leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
