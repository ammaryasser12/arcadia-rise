import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// NOTE: StrictMode intentionally double-invokes effects in development, which
// made the intro loader replay and re-initialised Lenis / Three.js / GSAP twice
// ("loads twice"). These imperative libraries manage their own lifecycle, so we
// run without StrictMode's double-mount to keep the boot sequence clean.
createRoot(document.getElementById('root')!).render(<App />);
