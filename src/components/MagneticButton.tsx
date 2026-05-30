import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  /** how far the element travels toward the cursor (px at edge) */
  strength?: number;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

/**
 * Agency-grade magnetic hover: the element (and its label, slightly more)
 * eases toward the cursor while hovered, then springs back on leave.
 * Honors reduced-motion by simply not translating.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 18,
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const slx = useSpring(lx, { stiffness: 260, damping: 20, mass: 0.4 });
  const sly = useSpring(ly, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const relX = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const relY = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
    lx.set(relX * strength * 0.4);
    ly.set(relY * strength * 0.4);
  };
  const handleLeave = () => { x.set(0); y.set(0); lx.set(0); ly.set(0); };

  const inner = (
    <motion.span className="inline-flex items-center gap-2" style={{ x: slx, y: sly }}>
      {children}
    </motion.span>
  );

  const shared = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: sx, y: sy },
    className,
    'aria-label': ariaLabel,
  } as any;

  return href ? (
    <motion.a href={href} target={target} rel={rel} {...shared}>{inner}</motion.a>
  ) : (
    <motion.button type="button" onClick={onClick} {...shared}>{inner}</motion.button>
  );
}
