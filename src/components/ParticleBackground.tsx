import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  alphaDelta: number;
  alphaMin: number;
  alphaMax: number;
}

interface Ray {
  x: number;
  targetX: number;
  width: number;
  alpha: number;
  speed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const COUNT = 130;
    const LINK_DIST = 150;
    const MOUSE_REPEL = 100;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.6 + 0.15,
      alphaDelta: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      alphaMin: 0.08,
      alphaMax: 0.85,
    }));

    const rays: Ray[] = [
      { x: width * 0.15, targetX: width * 0.25, width: 180, alpha: 0.055, speed: 0.0008 },
      { x: width * 0.4,  targetX: width * 0.5,  width: 280, alpha: 0.04,  speed: 0.0006 },
      { x: width * 0.65, targetX: width * 0.58, width: 220, alpha: 0.06,  speed: 0.001  },
      { x: width * 0.8,  targetX: width * 0.72, width: 160, alpha: 0.045, speed: 0.0009 },
      { x: width * 0.95, targetX: width * 0.88, width: 130, alpha: 0.035, speed: 0.0007 },
    ];

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = canvas.width = w || window.innerWidth;
        height = canvas.height = h || window.innerHeight;
      }
    });
    const parent = canvas.parentElement;
    if (parent) resizeObserver.observe(parent);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dramatic light rays
      rays.forEach((ray) => {
        ray.x += (ray.targetX - ray.x) * ray.speed;
        if (Math.abs(ray.x - ray.targetX) < 8) {
          ray.targetX = Math.random() * width;
        }
        const grad = ctx.createLinearGradient(ray.x, 0, ray.x + 60, height);
        grad.addColorStop(0, `rgba(201,168,124,${ray.alpha})`);
        grad.addColorStop(0.4, `rgba(232,201,122,${ray.alpha * 0.55})`);
        grad.addColorStop(1, 'rgba(10,10,10,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(ray.x - ray.width / 2, 0);
        ctx.lineTo(ray.x + ray.width / 2, 0);
        ctx.lineTo(ray.x + ray.width * 1.8, height);
        ctx.lineTo(ray.x - ray.width * 1.8, height);
        ctx.closePath();
        ctx.fill();
      });

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      particles.forEach((p) => {
        // Twinkle
        p.alpha += p.alphaDelta;
        if (p.alpha >= p.alphaMax || p.alpha <= p.alphaMin) p.alphaDelta *= -1;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.6;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        // Speed damping
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const lineAlpha = (1 - d / LINK_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,168,124,${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,122,${p.alpha})`;
        ctx.shadowColor = '#C9A87C';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      id="hero-particles"
    />
  );
}
