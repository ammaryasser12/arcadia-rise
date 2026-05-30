import { motion } from 'motion/react';
import { ElementType } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  /** seconds between each letter */
  stagger?: number;
  /** initial delay before the line starts */
  delay?: number;
  /** animate on scroll-into-view (default) or immediately on mount */
  trigger?: 'inView' | 'mount';
  once?: boolean;
}

/**
 * Splitting.js-style per-letter reveal. Each character clips up from below its
 * own mask, staggered. Words never break across lines (whitespace preserved as
 * non-breaking word wrappers). Respects prefers-reduced-motion via Framer.
 */
export default function SplitText({
  text,
  className = '',
  as = 'span',
  stagger = 0.028,
  delay = 0,
  trigger = 'inView',
  once = true,
}: SplitTextProps) {
  const MotionTag = motion(as as any);
  const words = text.split(' ');
  let charIndex = -1;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const letter = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
  };

  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden' as const, animate: 'visible' as const }
      : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once, margin: '-12%' } };

  return (
    <MotionTag className={className} variants={container} {...animateProps} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((char) => {
            charIndex++;
            return (
              <span
                key={charIndex}
                className="inline-block overflow-hidden align-baseline"
                style={{
                  // breathing room so ascenders (t, l, b…) and descenders aren't clipped
                  paddingTop: '0.2em',
                  paddingBottom: '0.18em',
                  marginTop: '-0.2em',
                  marginBottom: '-0.18em',
                }}
              >
                <motion.span className="inline-block" variants={letter}>
                  {char}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
