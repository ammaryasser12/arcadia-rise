/* Living painted hero — shared across Arcadia Rise demo sites.
   Domain-warped fbm "paint" on #hero-canvas that flows, warps toward the cursor,
   and shifts palette as the hero scrolls away. Palette is configurable per site
   via window.LIVING_ACCENT = { a:[r,g,b], b:[r,g,b], ink:[r,g,b] } (0..1 floats).
   Requires global THREE (r128 via CDN) to be loaded first. */
(function () {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Skip the WebGL shader on mobile / touch devices to avoid lag.
  // Brighten the hero photo so the background isn't near-black without the paint.
  if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024) {
    var ph = document.querySelector('.hero-img, .hero-bg-img');
    if (ph) { ph.style.opacity = '0.55'; ph.style.mixBlendMode = 'normal'; }
    return;
  }

  var cfg = window.LIVING_ACCENT || {};
  var A = cfg.a || [0.788, 0.659, 0.486];   // gold  #C9A87C
  var B = cfg.b || [0.545, 0.412, 0.078];   // bronze #8B6914
  var INK = cfg.ink || [0.039, 0.039, 0.039]; // #0A0A0A
  var LIGHT = cfg.light || [0.910, 0.788, 0.478]; // #E8C97A
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  var uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uRes: { value: new THREE.Vector2(innerWidth, innerHeight) },
    uInk: { value: new THREE.Vector3(INK[0], INK[1], INK[2]) },
    uA: { value: new THREE.Vector3(A[0], A[1], A[2]) },
    uB: { value: new THREE.Vector3(B[0], B[1], B[2]) },
    uLight: { value: new THREE.Vector3(LIGHT[0], LIGHT[1], LIGHT[2]) }
  };

  var frag = [
    'precision highp float;',
    'varying vec2 vUv;',
    'uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform vec2 uRes;',
    'uniform vec3 uInk; uniform vec3 uA; uniform vec3 uB; uniform vec3 uLight;',
    'vec2 hash(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.0+2.0*fract(sin(p)*43758.5453123);}',
    'float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);',
    'return mix(mix(dot(hash(i+vec2(0,0)),f-vec2(0,0)),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),',
    'mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}',
    'float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}',
    'void main(){',
    ' vec2 uv=vUv; float aspect=uRes.x/uRes.y; vec2 p=uv; p.x*=aspect;',
    ' float t=uTime*0.045;',
    ' vec2 q=vec2(fbm(p+vec2(0.0,t)),fbm(p+vec2(5.2,1.3-t)));',
    ' vec2 r=vec2(fbm(p+4.0*q+vec2(1.7,9.2)+t*0.5),fbm(p+4.0*q+vec2(8.3,2.8)-t*0.5));',
    ' float f=fbm(p+4.0*r);',
    ' vec2 m=uMouse; m.x*=aspect; float md=distance(p,m); float glow=smoothstep(0.55,0.0,md);',
    ' f+=glow*0.25; f+=uScroll*0.18;',
    ' float v=clamp(f*0.5+0.5,0.0,1.0); float s=uScroll;',
    ' vec3 col=uInk;',
    ' col=mix(col,uB,smoothstep(0.45,0.72,v)*(0.55+s*0.25));',
    ' col=mix(col,uA,smoothstep(0.66,0.86,v)*(0.6+s*0.3));',
    ' col=mix(col,uLight,smoothstep(0.82,0.96,v)*(0.4+s*0.45));',
    ' col*=0.6+0.4*smoothstep(0.3,1.0,v);',
    ' col+=glow*uA*0.06;',
    ' float g=fract(sin(dot(uv*uRes,vec2(12.9898,78.233)))*43758.5453);',
    ' col+=(g-0.5)*0.025;',
    ' gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }',
    fragmentShader: frag
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  var mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  window.addEventListener('mousemove', function (e) {
    mouse.tx = e.clientX / innerWidth; mouse.ty = 1 - e.clientY / innerHeight;
  }, { passive: true });
  window.addEventListener('resize', function () {
    renderer.setSize(innerWidth, innerHeight);
    uniforms.uRes.value.set(innerWidth, innerHeight);
  });

  var start = Date.now(), raf = 0, smooth = 0;
  (function loop() {
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    var hero = document.querySelector('.hero');
    var hh = hero ? hero.offsetHeight : innerHeight;
    var target = Math.min(1, window.scrollY / hh);
    smooth += (target - smooth) * 0.06;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uScroll.value = smooth;
    if (!reduced) uniforms.uTime.value = (Date.now() - start) / 1000;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  })();
})();
