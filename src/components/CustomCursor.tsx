import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 90, damping: 20, mass: 0.5 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 90, damping: 20, mass: 0.5 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const ringXSource = useRef(useMotionValue(-100));
  const ringYSource = useRef(useMotionValue(-100));

  // Reconnect spring sources
  const springX = useSpring(ringXSource.current, { stiffness: 90, damping: 20, mass: 0.5 });
  const springY = useSpring(ringYSource.current, { stiffness: 90, damping: 20, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringXSource.current.set(e.clientX);
      ringYSource.current.set(e.clientY);
      setHidden(false);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [role="button"], .cursor-pointer')) {
        setHovered(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [role="button"], .cursor-pointer')) {
        setHovered(false);
      }
    };
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [dotX, dotY]);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      {/* Outer ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          borderWidth: hovered ? 1.5 : 1,
          borderColor: hovered ? 'rgba(232,201,122,0.9)' : 'rgba(245,240,232,0.5)',
          backgroundColor: hovered ? 'rgba(232,201,122,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style2={{ border: '1px solid rgba(245,240,232,0.5)' } as React.CSSProperties}
      >
        <div className="w-full h-full rounded-full border border-[#F5F0E8]/50" />
      </motion.div>

      {/* Inner dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-[#E8C97A]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{ width: hovered ? 4 : 5, height: hovered ? 4 : 5 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
