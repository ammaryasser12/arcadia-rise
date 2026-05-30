import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * LivingCanvas — a site-wide painted backdrop.
 * A single full-viewport GLSL shader: domain-warped fbm "paint" in the brand
 * golds over near-black, that (a) flows on its own, (b) warps/glows toward the
 * cursor, and (c) shifts palette + composition as you scroll through chapters.
 * One canvas for the whole page = cheap and cohesive (checklist: motion + perf).
 */
export default function LivingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setSize(innerWidth, innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(innerWidth, innerHeight) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uScroll;   // 0..1 page progress
        uniform vec2  uMouse;    // 0..1
        uniform vec2  uRes;

        // brand palette
        const vec3 INK    = vec3(0.039,0.039,0.039); // #0A0A0A
        const vec3 BRONZE = vec3(0.545,0.412,0.078);  // #8B6914
        const vec3 GOLD   = vec3(0.788,0.659,0.486);  // #C9A87C
        const vec3 LIGHT  = vec3(0.910,0.788,0.478);  // #E8C97A
        const vec3 CREAM  = vec3(0.961,0.941,0.910);  // #F5F0E8

        // hash / noise / fbm
        vec2 hash(vec2 p){
          p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
          return -1.0 + 2.0*fract(sin(p)*43758.5453123);
        }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(dot(hash(i+vec2(0,0)), f-vec2(0,0)),
                         dot(hash(i+vec2(1,0)), f-vec2(1,0)), u.x),
                     mix(dot(hash(i+vec2(0,1)), f-vec2(0,1)),
                         dot(hash(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i=0;i<6;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }

        void main(){
          vec2 uv = vUv;
          float aspect = uRes.x / uRes.y;
          vec2 p = uv; p.x *= aspect;

          float t = uTime * 0.045;

          // domain warping → "painted" flow
          vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
          vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2) + t*0.5),
                        fbm(p + 4.0*q + vec2(8.3, 2.8) - t*0.5));
          float f = fbm(p + 4.0*r);

          // cursor warp — a soft swell that pulls the paint toward the pointer
          vec2 m = uMouse; m.x *= aspect;
          float md = distance(p, m);
          float glow = smoothstep(0.55, 0.0, md);
          f += glow * 0.25;

          // scroll shifts the composition + brightness of the paint
          f += uScroll * 0.18;
          float v = clamp(f*0.5 + 0.5, 0.0, 1.0);

          // palette ramp shifts with scroll: bronze-heavy early → lighter gold later
          float shift = uScroll;
          vec3 col = INK;
          col = mix(col, BRONZE, smoothstep(0.45, 0.72, v) * (0.55 + shift*0.25));
          col = mix(col, GOLD,   smoothstep(0.66, 0.86, v) * (0.6 + shift*0.3));
          col = mix(col, LIGHT,  smoothstep(0.82, 0.96, v) * (0.4 + shift*0.45));
          col = mix(col, CREAM,  smoothstep(0.93, 1.0, v)  * glow * 0.6);

          // keep it dark + luxurious — most of the frame stays near-ink
          col *= 0.62 + 0.38*smoothstep(0.3, 1.0, v);
          col += glow * GOLD * 0.06;

          // subtle film grain
          float g = fract(sin(dot(uv*uRes, vec2(12.9898,78.233)))*43758.5453);
          col += (g - 0.5) * 0.025;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX / innerWidth;
      mouseRef.current.ty = 1 - e.clientY / innerHeight;
    };
    const onResize = () => {
      renderer.setSize(innerWidth, innerHeight);
      uniforms.uRes.value.set(innerWidth, innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    let raf = 0;
    let smoothScroll = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;
      smoothScroll += (scrollRef.current - smoothScroll) * 0.05;

      uniforms.uMouse.value.set(m.x, m.y);
      uniforms.uScroll.value = smoothScroll;
      if (!reduced) uniforms.uTime.value = clock.getElapsedTime();

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}
