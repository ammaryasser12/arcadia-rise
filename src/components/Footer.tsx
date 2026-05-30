import { motion } from 'motion/react';
import { Language } from '../types';
import { translationCopy } from '../data';
import Logo from './Logo';

interface FooterProps {
  currentLanguage: Language;
}

export default function Footer({ currentLanguage }: FooterProps) {
  const t = translationCopy[currentLanguage];

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { label: t.menu.services, href: '#services' },
    { label: t.menu.portfolio, href: '#portfolio' },
    { label: t.menu.pricing, href: '#pricing' },
    { label: t.menu.about, href: '#about' },
    { label: t.menu.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[#0A0A0A] relative overflow-hidden" id="main-footer">

      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#8B6914]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* ── LARGE WORDMARK ─────────────────────────────────── */}
      <div className="border-t border-[#C9A87C]/10 pt-16 pb-10 px-8 md:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Giant name — clip reveal on scroll */}
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-6"
            >
              <Logo size={52} onlyEmblem={true} />
              <span
                className="font-serif font-bold text-shimmer leading-none tracking-[-0.03em] select-none"
                style={{ fontSize: 'clamp(48px, 9vw, 130px)' }}
              >
                ARCADIA RISE
              </span>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C]/40 uppercase mb-12 pl-[72px]"
          >
            {currentLanguage === 'en' ? 'Digital Excellence Atelier · Alexandria, Egypt' : 'وكالة رقمية فاخرة · الإسكندرية، مصر'}
          </motion.p>

          {/* Gold separator with glow */}
          <div className="relative h-[1px] mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A87C]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A87C]/15 to-transparent blur-[4px]" />
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#F5F0E8]/30 hover:text-[#C9A87C] transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Copyright + back to top */}
            <div className="flex items-center gap-6">
              <p className="text-[9px] font-mono text-[#F5F0E8]/25 tracking-wider">
                {t.footer.rights}
              </p>

              <button
                onClick={handleScrollTop}
                aria-label="Back to top"
                className="group w-9 h-9 rounded-full border border-[#C9A87C]/20 hover:border-[#C9A87C]/50 flex items-center justify-center text-[#C9A87C]/40 hover:text-[#C9A87C] hover:bg-[#C9A87C]/5 transition-all duration-300 cursor-pointer text-xs"
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ↑
                </motion.span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
