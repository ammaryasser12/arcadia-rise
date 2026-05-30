import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface WorkShowcaseProps {
  currentLanguage: Language;
}

const projects = [
  {
    id: 'novamed',
    name: 'NovaMed Dental Clinic',
    category: 'Medical & Healthcare',
    desc: 'A premium dental clinic website for Dr. Sarah Mostafa in Smouha, Alexandria. Clean, trust-building design with online booking integration and full mobile optimization.',
    url: '/demos/novamed.html',
    tags: ['Healthcare', 'Booking', 'SEO'],
    color: '#0B6E6E',
    accent: '#12A09A',
    emoji: '🦷',
    stat1: { val: '3,200+', label: 'Monthly Visitors' },
    stat2: { val: '48h', label: 'Delivery Time' },
  },
  {
    id: 'maison-fares',
    name: 'Maison Farès Restaurant',
    category: 'Fine Dining & Hospitality',
    desc: 'A cinematic fine dining website for a Mediterranean restaurant on the Stanley waterfront. Features an online reservation system, seasonal menu showcase, and atmospheric visual storytelling.',
    url: '/demos/maison-fares.html',
    tags: ['Restaurant', 'Reservations', 'Brand'],
    color: '#8B4513',
    accent: '#C9A87C',
    emoji: '🍽️',
    stat1: { val: '2×', label: 'Table Bookings' },
    stat2: { val: '5 Days', label: 'Delivered In' },
  },
];

function BrowserMockup({ url, color }: { url: string; color: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/8">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex-1 mx-4 bg-[#2A2A2A] rounded-md px-3 py-1.5 flex items-center gap-2">
          <Globe className="w-3 h-3 text-white/30" />
          <span className="text-[11px] text-white/40 font-mono truncate">arcadiarise.com/work/{url.split('/').pop()?.replace('.html','')}</span>
        </div>
        <div
          className="w-2.5 h-2.5 rounded-full animate-pulse"
          style={{ background: color }}
        />
      </div>
      {/* iframe */}
      <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
        <iframe
          src={url}
          title="Live site preview"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
    >
      {/* Text side */}
      <div className={`flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Category pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A87C]/20 bg-[#C9A87C]/5 mb-6">
            <Sparkles className="w-3 h-3 text-[#C9A87C]" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A87C] uppercase">{project.category}</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F0E8] mb-4 leading-tight">
            {project.name}
          </h3>

          <p className="text-[#F5F0E8]/65 text-sm leading-relaxed mb-8 max-w-sm">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-[#C9A87C]/15 text-[#C9A87C]/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mb-10 pb-8 border-b border-[#C9A87C]/10">
            <div>
              <div className="text-2xl font-serif font-bold text-[#E8C97A]">{project.stat1.val}</div>
              <div className="text-[10px] font-mono tracking-wider text-[#C9A87C]/60 uppercase mt-1">{project.stat1.label}</div>
            </div>
            <div className="w-px h-8 bg-[#C9A87C]/15" />
            <div>
              <div className="text-2xl font-serif font-bold text-[#E8C97A]">{project.stat2.val}</div>
              <div className="text-[10px] font-mono tracking-wider text-[#C9A87C]/60 uppercase mt-1">{project.stat2.label}</div>
            </div>
          </div>

          {/* CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-[#E8C97A] hover:text-[#F5F0E8] transition-colors duration-300"
          >
            <span className="border-b border-[#E8C97A]/40 group-hover:border-[#F5F0E8] pb-0.5 transition-colors duration-300">
              View Live Site
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Browser mockup side */}
      <motion.div
        className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        style={{ y }}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {/* Glow behind mockup */}
        <div
          className="absolute inset-8 rounded-3xl blur-[80px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)` }}
        />
        <BrowserMockup url={project.url} color={project.accent} />
      </motion.div>
    </motion.div>
  );
}

export default function WorkShowcase({ currentLanguage }: WorkShowcaseProps) {
  return (
    <section id="work" className="py-32 relative bg-[#0A0A0A] overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B6914] opacity-[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#C9A87C] uppercase block mb-3">
            {currentLanguage === 'en' ? 'Real Work. Real Results.' : 'أعمال حقيقية. نتائج حقيقية.'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F5F0E8] mb-6 text-shimmer">
            {currentLanguage === 'en' ? 'Sites We Actually Built' : 'مواقع صنعناها بالفعل'}
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A87C] to-transparent mx-auto mb-6" />
          <p className="text-sm md:text-base text-[#F5F0E8]/65 font-sans-luxury leading-relaxed">
            {currentLanguage === 'en'
              ? 'No stock photos. No invented clients. These are live, interactive websites we designed and shipped — you can open them right now.'
              : 'لا صور مخزنة. لا عملاء متخيلون. هذه مواقع حية وتفاعلية صممناها وأطلقناها — يمكنك فتحها الآن.'}
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-24 pt-16 border-t border-[#C9A87C]/10"
        >
          <p className="text-[#F5F0E8]/50 text-sm mb-6">
            {currentLanguage === 'en' ? 'Your business could be next.' : 'مشروعك قد يكون التالي.'}
          </p>
          <a
            href="https://wa.me/201554347348"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black font-semibold text-sm tracking-wider uppercase hover:shadow-[0_0_35px_rgba(201,168,124,0.5)] hover:scale-[1.03] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span>{currentLanguage === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
