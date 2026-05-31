import { useState, useEffect } from 'react';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translationCopy } from '../data';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translationCopy[currentLanguage];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: t.menu.home, href: '#home' },
    { name: t.menu.services, href: '#services' },
    { name: t.menu.whyUs, href: '#why-us' },
    { name: t.menu.process, href: '#process' },
    { name: t.menu.portfolio, href: '#portfolio' },
    { name: t.menu.pricing, href: '#pricing' },
    { name: currentLanguage === 'en' ? 'Content' : 'المحتوى', href: '#content' },
    { name: t.menu.about, href: '#about' },
    { name: currentLanguage === 'en' ? 'FAQ' : 'الأسئلة', href: '#faq' },
    { name: t.menu.contact, href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg)]/85 backdrop-blur-md py-3 border-b border-[#C9A87C]/15 shadow-[0_4px_30px_rgba(0,0,0,0.25)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Brand Emblem */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3.5 group select-none cursor-pointer"
          id="branding-logo"
        >
          <Logo size={42} onlyEmblem={true} />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.12em] text-[#C9A87C] group-hover:text-[#E8C97A] transition-colors duration-300 leading-none">
              {t.brandName}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Paths */}
        <nav className="hidden lg:flex items-center gap-7" id="desktop-routing-nav">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]/80 hover:text-[#E8C97A] transition-colors duration-300 relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A87C] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden sm:flex items-center gap-4" id="desktop-controls">
          <ThemeToggle />
          <LanguageToggle currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          
          <a
            href="https://wa.me/201554347348"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-[#C9A87C]/45 hover:border-[#E8C97A] text-xs font-serif uppercase tracking-widest text-[#C9A87C] hover:text-[#E8C97A] bg-transparent hover:bg-[#C9A87C]/5 transition-all duration-300"
            id="nav-cta-contact-button"
          >
            {currentLanguage === 'en' ? 'Consultation' : 'استشارة'}
          </a>
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <LanguageToggle currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#C9A87C] hover:text-[#E8C97A]"
            aria-label="Toggle menu"
            id="mobile-drawer-trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Tablet size menu button when sm controls exist but screen is < lg */}
        <div className="hidden sm:flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#C9A87C] hover:text-[#E8C97A]"
            aria-label="Toggle menu"
            id="tablet-drawer-trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-[var(--bg)]/97 backdrop-blur-md z-40 flex flex-col p-6 animate-fade-in sm:border-t sm:border-[#C9A87C]/15"
          id="mobile-drawer-portal"
          style={{ height: 'calc(100vh - 60px)' }}
        >
          <div className="flex flex-col gap-5 my-auto text-center">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-lg font-serif font-medium tracking-wide text-[var(--text)] hover:text-[#E8C97A] transition-colors py-2 block"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4 py-6 border-t border-[#C9A87C]/10">
            <a
              href="https://wa.me/201554347348"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-full bg-[#C9A87C] hover:bg-[#E8C97A] text-black font-semibold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(201,168,124,0.3)]"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
