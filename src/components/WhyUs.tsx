import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck, Clock, Wrench, Compass, DollarSign } from 'lucide-react';
import { Language } from '../types';
import { values, translationCopy } from '../data';

interface WhyUsProps {
  currentLanguage: Language;
}

const iconMap: Record<string, React.ElementType> = {
  Clock, Wrench, Compass, DollarSign, ShieldCheck,
};

export default function WhyUs({ currentLanguage }: WhyUsProps) {
  const t = translationCopy[currentLanguage];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} id="why-us" className="relative bg-[var(--bg-alt)] py-32 overflow-hidden">

      {/* Parallax background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#8B6914]/5 blur-[160px]" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-8 h-[1px] bg-[#C9A87C]/50" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">{t.whyUs.sectionSubtitle}</span>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — big headline + trust seal */}
          <div>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ fontSize: 'clamp(38px, 5.5vw, 80px)' }}
                className="font-serif font-bold text-[var(--text)] leading-[0.95] tracking-[-0.03em]"
              >
                {t.whyUs.sectionTitle}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[var(--text)]/55 text-sm md:text-base leading-relaxed mb-12 max-w-md font-sans-luxury"
            >
              {t.whyUs.desc}
            </motion.p>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#C9A87C]/6 border border-[#C9A87C]/15"
            >
              <ShieldCheck className="w-6 h-6 text-[#C9A87C]" />
              <div>
                <div className="text-[10px] font-mono tracking-wider text-[#C9A87C] uppercase">
                  {currentLanguage === 'en' ? 'Verified Egyptian Agency' : 'وكالة مصرية موثقة'}
                </div>
                <div className="text-[9px] font-mono text-[var(--text)]/30 mt-0.5">
                  {currentLanguage === 'en' ? 'Zero technical complexity for you' : 'لا تعقيد تقني من جانبك'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((val, i) => {
              const Icon = iconMap[val.icon] || ShieldCheck;
              return (
                <motion.div
                  key={val.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-glass group p-6 rounded-2xl border-transparent hover:border-[#C9A87C]/30 transition-all duration-400 hover:-translate-y-1.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A87C]/8 border border-[#C9A87C]/15 flex items-center justify-center mb-5 group-hover:bg-[#C9A87C]/15 group-hover:border-[#C9A87C]/35 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#E8C97A]" />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[var(--text)] mb-2 group-hover:text-[#E8C97A] transition-colors duration-300">
                    {val.title[currentLanguage]}
                  </h3>
                  <p className="text-xs text-[var(--text)]/50 leading-relaxed font-sans-luxury">
                    {val.description[currentLanguage]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
