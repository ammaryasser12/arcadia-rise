import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  id?: string;
  delay?: number;
  key?: string | number;
  ribbon?: ReactNode;
  tilt?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  glow = true,
  hoverEffect = true,
  id,
  delay = 0,
  ribbon,
  tilt = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden ${
        glow ? 'glass-panel-glow' : ''
      } ${hoverEffect ? 'glass-panel-hover' : ''} ${tilt ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-10 h-[1px] bg-gradient-to-r from-[#C9A87C]/50 to-transparent" />
      <div className="absolute top-0 left-0 w-[1px] h-10 bg-gradient-to-b from-[#C9A87C]/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[#C9A87C]/35 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-gradient-to-t from-[#C9A87C]/35 to-transparent" />

      {/* Dynamic tilt shine spot */}
      {tilt && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(232,201,122,0.08) 0%, transparent 60%)`
            ),
          }}
        />
      )}

      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A87C]/[0.03] via-transparent to-black/20 pointer-events-none rounded-2xl" />

      {ribbon}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
