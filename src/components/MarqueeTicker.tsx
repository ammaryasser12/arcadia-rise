import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const items = [
  'Website Design', 'Google Maps SEO', 'Brand Identity',
  'Social Media', 'E-Commerce', 'Landing Pages',
  'Mobile-First', 'Fast Delivery', '14-Day Launch',
  'Worldwide', 'Egypt', 'Arabic & English',
];

export default function MarqueeTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Row 1 moves left, row 2 moves right for depth effect
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  const Row = ({ reverse = false, style }: { reverse?: boolean; style?: React.CSSProperties }) => {
    const list = reverse ? [...items].reverse() : items;
    const doubled = [...list, ...list, ...list];
    return (
      <motion.div
        style={style}
        className="flex items-center gap-0 overflow-hidden py-3"
      >
        <motion.div
          className="flex items-center gap-0 shrink-0"
          animate={{ x: reverse ? ['0%', '33.33%'] : ['0%', '-33.33%'] }}
          transition={{ duration: reverse ? 28 : 22, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-5 shrink-0 px-4">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#F5F0E8]/35 whitespace-nowrap hover:text-[#C9A87C]/70 transition-colors duration-300">
                {item}
              </span>
              <span className="text-[#C9A87C]/20 text-xs">✦</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={ref} className="relative py-2 border-y border-[#C9A87C]/8 bg-[#0A0A0A] overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
      </div>
      <motion.div style={{ x: x1 }}><Row /></motion.div>
      <motion.div style={{ x: x2 }}><Row reverse /></motion.div>
    </div>
  );
}
