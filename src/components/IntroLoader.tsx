import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface IntroLoaderProps {
  onComplete: () => void;
}

// Module-level guard: the intro plays exactly once per page load, even if the
// component remounts (HMR, route changes, etc.). Prevents any "loads twice".
let introHasPlayed = false;

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(introHasPlayed);
  const [progress, setProgress] = useState(introHasPlayed ? 100 : 0);

  useEffect(() => {
    if (introHasPlayed) { onComplete(); return; }
    introHasPlayed = true;

    let raf = 0;
    let start: number | null = null;
    const FILL = 1900; // ms to fill the progress arc

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / FILL, 1);
      // ease-out
      setProgress(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const tExit = setTimeout(() => setExiting(true), FILL + 250);
    const tDone = setTimeout(() => { setDone(true); onComplete(); }, FILL + 1150);

    return () => { cancelAnimationFrame(raf); clearTimeout(tExit); clearTimeout(tDone); };
  }, [onComplete]);

  if (done) return null;

  // circular progress geometry
  const R = 78;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          animate={exiting ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* deep radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-[#8B6914]/12 blur-[150px]" />
          </div>

          {/* the assembling 3D-feel mark */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ width: 200, height: 200, perspective: 800 }}
            initial={{ opacity: 0, scale: 0.6, rotateX: 35 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* rotating conic halo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(201,168,124,0.05) 80deg, rgba(232,201,122,0.55) 160deg, rgba(201,168,124,0.05) 240deg, transparent 360deg)',
                maskImage: 'radial-gradient(circle, transparent 64%, #000 66%, #000 78%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 64%, #000 66%, #000 78%, transparent 80%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
            />

            {/* circular progress arc */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200" width="200" height="200">
              <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(201,168,124,0.12)" strokeWidth="1.5" />
              <circle
                cx="100" cy="100" r={R} fill="none" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (progress / 100) * C}
                style={{ filter: 'drop-shadow(0 0 5px rgba(232,201,122,0.55))', transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>

            {/* logo emblem with gentle breathing */}
            <motion.div
              className="relative z-10"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Logo size={96} onlyEmblem={true} />
            </motion.div>
          </motion.div>

          {/* wordmark + counter */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="text-[11px] font-mono tracking-[0.55em] text-[#C9A87C]/70 uppercase pl-[0.55em]">
              Arcadia Rise
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F5F0E8]/25 tabular-nums">
              {String(progress).padStart(3, '0')}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
