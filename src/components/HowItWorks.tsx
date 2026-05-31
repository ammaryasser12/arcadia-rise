import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { MessageSquare, Code2, Rocket } from 'lucide-react';
import { Language } from '../types';
import { steps, translationCopy } from '../data';

interface HowItWorksProps {
  currentLanguage: Language;
}

const stepIcons = [MessageSquare, Code2, Rocket];

export default function HowItWorks({ currentLanguage }: HowItWorksProps) {
  const t = translationCopy[currentLanguage];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} id="process" className="relative bg-[var(--bg)] py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#8B6914]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-8 h-[1px] bg-[#C9A87C]/50" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">{t.process.sectionSubtitle}</span>
        </motion.div>

        {/* Big heading */}
        <div className="overflow-hidden mb-20">
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ fontSize: 'clamp(38px, 5.5vw, 80px)' }}
            className="font-serif font-bold text-[var(--text)] leading-[0.95] tracking-[-0.03em]"
          >
            {t.process.sectionTitle}
          </motion.h2>
        </div>

        {/* Animated connector line */}
        <div className="hidden md:block relative h-[1px] bg-[#C9A87C]/8 mb-16 mx-8">
          <motion.div
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#E8C97A]"
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => {
            const Icon = stepIcons[i] || Rocket;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Step number large background */}
                <div className="text-[80px] font-serif font-bold text-[#C9A87C]/5 leading-none mb-4 select-none pointer-events-none">
                  {step.stepNumber}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#C9A87C]/8 border border-[#C9A87C]/15 flex items-center justify-center mb-6 -mt-8 relative z-10 group-hover:bg-[#C9A87C]/15 group-hover:border-[#C9A87C]/35 transition-all duration-400">
                  <Icon className="w-5 h-5 text-[#E8C97A]" />
                </div>

                {/* Content */}
                <h3
                  className="font-serif font-bold text-[var(--text)] mb-4 leading-tight group-hover:text-[#E8C97A] transition-colors duration-300"
                  style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
                >
                  {step.title[currentLanguage]}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text)]/50 leading-relaxed font-sans-luxury">
                  {step.description[currentLanguage]}
                </p>

                {/* Connector dot on top */}
                <div className="hidden md:block absolute -top-[68px] left-8 w-2.5 h-2.5 rounded-full bg-[#C9A87C] shadow-[0_0_12px_rgba(201,168,124,0.5)]" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
