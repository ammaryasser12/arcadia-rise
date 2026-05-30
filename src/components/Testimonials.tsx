import { motion } from 'motion/react';
import { Star, MessageCircle, Quote } from 'lucide-react';
import { Language } from '../types';
import { testimonials, translationCopy } from '../data';
import GlassCard from './GlassCard';

interface TestimonialsProps {
  currentLanguage: Language;
}

export default function Testimonials({ currentLanguage }: TestimonialsProps) {
  const t = translationCopy[currentLanguage];

  return (
    <section id="testimonials" className="py-24 relative bg-[#0A0A0A]">
      {/* Absolute faint radial gradients for background styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#8B6914] opacity-[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full animate-fade-in">

        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C9A87C] uppercase block mb-3">
            {t.testimonials.sectionSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F0E8] mb-6 text-gold-glow">
            {t.testimonials.sectionTitle}
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C9A87C] mx-auto mb-6" />
          <p className="text-sm md:text-base text-[#F5F0E8]/70 font-sans-luxury leading-relaxed mx-auto max-w-xl">
            {t.testimonials.desc}
          </p>
        </div>

        {/* Testimonials cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((test, index) => (
            <GlassCard
              key={test.id}
              id={`testimonial-card-${test.id}`}
              delay={index * 0.15}
              className="group flex flex-col justify-between h-full relative"
              glow={true}
              hoverEffect={true}
            >
              {/* Outer massive luxury gold quotes inside card background */}
              <div className="absolute top-6 right-6 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-300 pointer-events-none">
                <Quote className="w-16 h-16 text-[#C9A87C]" style={{ transform: 'scaleX(-1)' }} />
              </div>

              <div>
                {/* Visual 5-star standard rating indicator */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#E8C97A] text-[#E8C97A]"
                    />
                  ))}
                </div>

                {/* Main Client Quotation Text */}
                <blockquote className="text-[#F5F0E8]/85 text-xs md:text-sm leading-relaxed mb-6 font-sans-luxury line-height-[1.6]">
                  &ldquo;{test.content[currentLanguage]}&rdquo;
                </blockquote>
              </div>

              {/* Author and Business credentials bar */}
              <div className="pt-6 border-t border-[#C9A87C]/10 mt-6 flex items-center gap-4">
                {/* Avatar mock circle with gold initials */}
                <div className="w-10 h-10 rounded-full bg-[#C9A87C]/10 border border-[#C9A87C]/30 flex items-center justify-center font-serif text-sm font-bold text-[#C9A87C]">
                  {test.name[currentLanguage].charAt(0)}
                </div>
                
                <div className="text-left dir-auto">
                  <cite className="not-italic text-sm font-serif font-bold text-[#F5F0E8] block mb-0.5">
                    {test.name[currentLanguage]}
                  </cite>
                  <span className="text-[10px] font-mono tracking-wider text-[#C9A87C]/75 uppercase block select-none">
                    {test.role[currentLanguage]}
                  </span>
                  <span className="text-[9px] text-[#F5F0E8]/40 block uppercase select-none font-mono">
                    {test.business[currentLanguage]}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
}
