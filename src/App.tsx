import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Language } from './types';
import SmoothScroll from './components/SmoothScroll';
import IntroLoader from './components/IntroLoader';
import Header from './components/Header';

// Three.js is heavy — split it out so it loads after first paint (perf: sub-2s)
const LivingCanvas = lazy(() => import('./components/LivingCanvas'));
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import WhatWeDo from './components/WhatWeDo';
import WhyUs from './components/WhyUs';
import HowItWorks from './components/HowItWorks';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [introComplete, setIntroComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.title = language === 'ar'
      ? 'ARCADIA RISE | تصميم مواقع ومتاجر فاخرة بالإسكندرية'
      : 'Arcadia Rise | Luxury Digital Web Agency in Egypt';
  }, [language]);

  // Lock scroll during intro
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [introComplete]);

  return (
    <>
      {/* Cinematic intro loader */}
      <IntroLoader onComplete={() => setIntroComplete(true)} />

      {/* Living painted backdrop — shifts palette on scroll, warps toward cursor */}
      <div className="fixed inset-0 -z-10 bg-[#0A0A0A]" aria-hidden="true" />
      <Suspense fallback={null}>
        <LivingCanvas />
      </Suspense>

      <SmoothScroll>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#F5F0E8] min-h-screen selection:bg-[#8B6914] selection:text-[#F5F0E8] relative font-sans-luxury"
        >
          {/* Scroll progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#8B6914] via-[#E8C97A] to-[#C9A87C] z-[60] origin-left shadow-[0_0_6px_rgba(232,201,122,0.5)]"
            style={{ scaleX }}
          />

          {/* Global ambient light blobs */}
          <div className="fixed top-[-5%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.055] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #E8C97A 0%, transparent 70%)' }} />
          <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.04] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #8B6914 0%, transparent 70%)' }} />

          <Header currentLanguage={language} onLanguageChange={setLanguage} />

          <main id="main-content-flow">
            <Hero currentLanguage={language} introComplete={introComplete} />
            <MarqueeTicker />
            <WhatWeDo currentLanguage={language} />
            <WhyUs currentLanguage={language} />
            <HowItWorks currentLanguage={language} />
            <Portfolio currentLanguage={language} />
            <Pricing currentLanguage={language} />
            <About currentLanguage={language} />
            <FAQ currentLanguage={language} />
            <Contact currentLanguage={language} />
          </main>

          <Footer currentLanguage={language} />
          <FloatingSocials />
        </motion.div>
      </SmoothScroll>
    </>
  );
}
