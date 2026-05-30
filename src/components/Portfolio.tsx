import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Language } from '../types';
import { portfolios, translationCopy } from '../data';

interface PortfolioProps {
  currentLanguage: Language;
}

const CARD_WIDTH = 420;
const CARD_GAP = 32;

export default function Portfolio({ currentLanguage }: PortfolioProps) {
  const t = translationCopy[currentLanguage];
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pin the section while scrolling horizontally through cards
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const totalScroll = portfolios.length * (CARD_WIDTH + CARD_GAP) - CARD_WIDTH;
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScroll]);

  // Headline words stagger in
  const headlineWords = t.portfolio.sectionTitle.split(' ');

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      // The section is tall enough so scrolling through it animates the horizontal track
      style={{ height: `${100 + portfolios.length * 60}vh` }}
      className="relative bg-[#0A0A0A]"
    >
      {/* Sticky container that pins while parent scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Ambient background */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#8B6914] opacity-[0.025] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A87C] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />

        {/* Top: section label + headline */}
        <div className="px-8 md:px-16 mb-10 flex items-end justify-between max-w-[1600px] mx-auto w-full">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.3em] text-[#C9A87C] uppercase block mb-3"
            >
              {t.portfolio.sectionSubtitle}
            </motion.span>
            <div className="flex flex-wrap gap-x-3 items-baseline">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-5xl font-serif font-bold text-[#F5F0E8] leading-tight block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block text-sm text-[#F5F0E8]/45 max-w-[280px] text-right font-sans-luxury leading-relaxed"
          >
            {t.portfolio.desc}
          </motion.p>
        </div>

        {/* Horizontal track — force LTR so the scroll transform stays consistent in RTL */}
        <div className="relative overflow-visible px-8 md:px-16 max-w-[1600px] mx-auto w-full" dir="ltr">
          <motion.div
            style={{ x }}
            className="flex gap-8 will-change-transform"
          >
            {portfolios.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-[#C9A87C]/12 shrink-0 cursor-pointer"
                style={{ width: CARD_WIDTH, height: 520 }}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title[currentLanguage]}
                  className="w-full h-full object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-108 brightness-60 group-hover:brightness-40"
                  referrerPolicy="no-referrer"
                  style={{ transform: 'scale(1)', transitionProperty: 'transform, filter' }}
                />

                {/* Gold border glow on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A87C]/45 rounded-2xl transition-all duration-500 pointer-events-none z-20" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-400 z-10" />

                {/* Card number */}
                <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-[#C9A87C]/40 tracking-widest">
                  {String(index + 1).padStart(2, '0')} / {String(portfolios.length).padStart(2, '0')}
                </div>

                {/* External link icon */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/50 border border-[#C9A87C]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 group-hover:border-[#C9A87C]/50">
                  <ArrowUpRight className="w-4 h-4 text-[#C9A87C]" />
                </div>

                {/* Card content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-end z-10">
                  <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#C9A87C]/12 border border-[#C9A87C]/25 text-[9px] font-mono tracking-widest text-[#E8C97A] uppercase mb-3">
                      {item.category[currentLanguage]}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-2 leading-tight">
                      {item.title[currentLanguage]}
                    </h3>
                    <p className="text-xs text-[#F5F0E8]/55 mb-5 font-sans-luxury flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-[#C9A87C]" />
                      {item.industry[currentLanguage]}
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C97A] hover:text-[#F5F0E8] pb-1 border-b border-[#E8C97A]/40 hover:border-[#F5F0E8] transition-all duration-300"
                        onClick={e => e.stopPropagation()}
                      >
                        <span>{t.portfolio.viewDemo}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* End-cap CTA card */}
            <motion.a
              href="https://wa.me/201554347348"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group relative shrink-0 rounded-2xl border border-dashed border-[#C9A87C]/20 flex flex-col items-center justify-center gap-5 hover:border-[#C9A87C]/50 hover:bg-[#C9A87C]/4 transition-all duration-500 cursor-pointer"
              style={{ width: 280, height: 520 }}
            >
              <div className="w-14 h-14 rounded-full border border-[#C9A87C]/30 flex items-center justify-center group-hover:border-[#C9A87C]/60 transition-colors duration-300 group-hover:bg-[#C9A87C]/8">
                <ArrowUpRight className="w-6 h-6 text-[#C9A87C]" />
              </div>
              <div className="text-center px-8">
                <p className="text-sm font-serif font-bold text-[#F5F0E8]/60 group-hover:text-[#E8C97A] transition-colors duration-300 mb-2">
                  {currentLanguage === 'en' ? 'Your Project Here' : 'مشروعك هنا'}
                </p>
                <p className="text-xs text-[#F5F0E8]/30 font-sans-luxury">
                  {currentLanguage === 'en' ? 'Let\'s build something stunning' : 'لنبني شيئًا مذهلاً'}
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 right-10 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C9A87C]/40 uppercase"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
