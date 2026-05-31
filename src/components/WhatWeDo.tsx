import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Terminal, MapPin, Share2 } from 'lucide-react';
import { Language } from '../types';
import { services, translationCopy } from '../data';

interface WhatWeDoProps {
  currentLanguage: Language;
}

const icons = [Terminal, MapPin, Share2];

// "Perfect for" industry examples per service (open-ended, not limiting)
const examples: Record<string, { en: string; ar: string }> = {
  'web-design': {
    en: 'Perfect for doctors, restaurants, startups, gyms, law firms — and any business that deserves to be found.',
    ar: 'مثالي للأطباء والمطاعم والشركات الناشئة والصالات الرياضية والمكاتب — وأي نشاط يستحق أن يُرى.',
  },
  'google-business': {
    en: 'Ideal for clinics, salons, cafes, retail shops — anyone with a location customers should find on the map.',
    ar: 'مثالي للعيادات والصالونات والكافيهات والمتاجر — وكل من له مكان يبحث عنه العملاء على الخريطة.',
  },
  'social-media': {
    en: 'Built for restaurants, gyms, e-commerce, personal brands — any business growing an audience online.',
    ar: 'مصمم للمطاعم والصالات والمتاجر الإلكترونية والعلامات الشخصية — وكل نشاط يبني جمهوره على الإنترنت.',
  },
};

export default function WhatWeDo({ currentLanguage }: WhatWeDoProps) {
  const t = translationCopy[currentLanguage];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-[var(--bg)] py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-8 h-[1px] bg-[#C9A87C]/50" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">
            {t.services.sectionSubtitle}
          </span>
        </motion.div>

        {/* Big heading */}
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
            className="font-serif font-bold text-[var(--text)] leading-[0.95] tracking-[-0.03em]"
          >
            {t.services.sectionTitle}
          </motion.h2>
        </div>

        {/* Accordion service list — wibify style */}
        <div className="divide-y divide-[#C9A87C]/10 border-t border-[#C9A87C]/10">
          {services.map((service, i) => {
            const Icon = icons[i] || Terminal;
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  className="group w-full text-left py-8 flex items-center gap-6 cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {/* Number */}
                  <span className="text-[11px] font-mono text-[#C9A87C]/40 w-8 shrink-0 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-400 ${isOpen ? 'bg-[#C9A87C]/15 border-[#C9A87C]/40' : 'bg-transparent border-[#C9A87C]/15 group-hover:border-[#C9A87C]/35'}`}>
                    <Icon className="w-4 h-4 text-[#E8C97A]" />
                  </div>

                  {/* Title */}
                  <span
                    className={`font-serif font-bold flex-1 transition-colors duration-300 ${isOpen ? 'text-[#E8C97A]' : 'text-[var(--text)] group-hover:text-[#E8C97A]'}`}
                    style={{ fontSize: 'clamp(22px, 3.2vw, 42px)' }}
                  >
                    {service.title[currentLanguage]}
                  </span>

                  {/* Arrow */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-10 h-10 rounded-full border border-[#C9A87C]/20 flex items-center justify-center shrink-0 group-hover:border-[#C9A87C]/50 transition-colors duration-300"
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#C9A87C]" />
                  </motion.div>
                </button>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 pl-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[var(--text)]/65 text-sm md:text-base leading-relaxed font-sans-luxury mb-4">
                        {service.description[currentLanguage]}
                      </p>
                      {examples[service.id] && (
                        <p className="text-[#C9A87C]/75 text-xs leading-relaxed font-sans-luxury mb-6 flex items-start gap-2">
                          <span className="text-[#E8C97A] shrink-0">✦</span>
                          <span>{examples[service.id][currentLanguage]}</span>
                        </p>
                      )}
                      <a
                        href="https://wa.me/201554347348"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A87C] border-b border-[#C9A87C]/30 pb-0.5 hover:text-[#E8C97A] hover:border-[#E8C97A]/50 transition-colors duration-300"
                      >
                        {currentLanguage === 'en' ? 'Get Started' : 'ابدأ الآن'}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="bg-black/30 border border-[#C9A87C]/10 rounded-xl p-5">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-[#C9A87C]/50 uppercase block mb-2">
                        {currentLanguage === 'en' ? 'Core Advantage' : 'الميزة الأساسية'}
                      </span>
                      <p className="text-[var(--text)]/45 text-xs leading-relaxed italic font-sans-luxury">
                        {service.longDescription[currentLanguage]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
