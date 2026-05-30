import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Flame, ArrowUpRight, Star } from 'lucide-react';
import { Language } from '../types';
import { pricing, translationCopy } from '../data';
import LaunchModal from './LaunchModal';

interface PricingProps {
  currentLanguage: Language;
}

export default function Pricing({ currentLanguage }: PricingProps) {
  const t = translationCopy[currentLanguage];
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} id="pricing" className="relative bg-[#0A0A0A] py-32 overflow-hidden">

      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full bg-[#8B6914]/5 blur-[180px]" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* Label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-8 h-[1px] bg-[#C9A87C]/50" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">{t.pricing.sectionSubtitle}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
              className="font-serif font-bold text-[#F5F0E8] leading-[0.92] tracking-[-0.03em]"
            >
              {t.pricing.sectionTitle}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#F5F0E8]/50 text-sm md:text-base leading-relaxed font-sans-luxury self-end max-w-sm"
          >
            {t.pricing.desc}
          </motion.p>
        </div>

        {/* Vertical 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricing.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                tier.isRecommended
                  ? 'border-[#C9A87C]/50 bg-gradient-to-b from-[#C9A87C]/8 via-black/60 to-black/80 shadow-[0_0_60px_rgba(201,168,124,0.18)]'
                  : 'border-[#C9A87C]/10 bg-white/[0.025] hover:border-[#C9A87C]/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Recommended banner */}
              {tier.isRecommended && (
                <div className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914]">
                  <Star className="w-3 h-3 text-black fill-black" />
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-black uppercase">
                    {t.pricing.recommended}
                  </span>
                  <Star className="w-3 h-3 text-black fill-black" />
                </div>
              )}

              <div className="flex flex-col flex-1 p-8">
                {/* Tier number + name */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono text-[#C9A87C]/35 tracking-widest block mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className={`font-serif font-bold leading-tight tracking-[-0.02em] ${
                        tier.isRecommended ? 'text-shimmer' : 'text-[#F5F0E8]'
                      }`}
                      style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
                    >
                      {tier.name[currentLanguage]}
                    </h3>
                    {tier.isRecommended && (
                      <Flame className="w-5 h-5 text-[#E8C97A] shrink-0 mt-1 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[#F5F0E8]/40 text-xs leading-relaxed font-sans-luxury">
                    {tier.description[currentLanguage]}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-[#C9A87C]/12">
                  <div
                    className="font-serif font-bold text-[#E8C97A] leading-none mb-1"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                  >
                    {tier.price[currentLanguage]}
                  </div>
                  <div className="text-[9px] font-mono tracking-wider text-[#C9A87C]/45 uppercase mt-2">
                    {tier.period[currentLanguage]}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 flex-1 mb-10">
                  {tier.features[currentLanguage].map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                        tier.isRecommended
                          ? 'bg-[#C9A87C]/20 border-[#C9A87C]/40'
                          : 'bg-[#C9A87C]/8 border-[#C9A87C]/20'
                      }`}>
                        <Check className="w-2.5 h-2.5 text-[#C9A87C]" />
                      </div>
                      <span className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans-luxury">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => { setSelectedPlan(tier); setIsModalOpen(true); }}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-mono tracking-[0.12em] uppercase transition-all duration-400 cursor-pointer group ${
                    tier.isRecommended
                      ? 'bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black hover:shadow-[0_0_28px_rgba(201,168,124,0.5)] hover:scale-[1.02]'
                      : 'border border-[#C9A87C]/25 text-[#C9A87C] hover:border-[#C9A87C]/55 hover:bg-[#C9A87C]/6 hover:text-[#E8C97A]'
                  }`}
                >
                  <span>{tier.ctaText[currentLanguage]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* Bottom glow on recommended */}
              {tier.isRecommended && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A87C]/60 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

      </div>

      <LaunchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLanguage={currentLanguage}
        plan={selectedPlan}
      />
    </section>
  );
}
