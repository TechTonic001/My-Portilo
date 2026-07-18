import { AnimatePresence } from 'framer-motion';
import useOsStore from './store/useOsStore';
import LockScreen from './components/LockScreen';
import ShutdownScreen from './components/ShutdownScreen';
import Taskbar from './components/Taskbar';

import Window from './components/Window';
import AboutMe from './components/apps/AboutMe';
import FileExplorer from './components/apps/FileExplorer';
import Skills from './components/apps/Skills';
import Resume from './components/apps/Resume';
import Contact from './components/apps/Contact';
import './index.css';

/* ─── Wallpaper backgrounds ─────────────────────────────────────────────────── */
const WALLPAPERS = {
  bloom: `
    radial-gradient(ellipse at 18% 48%, rgba(0,82,212,0.65) 0%, transparent 52%),
    radial-gradient(ellipse at 82% 18%, rgba(99,20,195,0.55) 0%, transparent 48%),
    radial-gradient(ellipse at 62% 82%, rgba(0,140,255,0.4) 0%, transparent 44%),
    radial-gradient(ellipse at 8% 90%, rgba(20,100,220,0.45) 0%, transparent 46%),
    linear-gradient(140deg, #001530 0%, #002060 28%, #003ea0 54%, #1a5fb4 76%, #1b3280 100%)
  `,
  mountains: `
    radial-gradient(ellipse at 50% 80%, rgba(74,122,155,0.5) 0%, transparent 60%),
    linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 30%, #2d4a6e 60%, #1a2a3e 100%)
  `,
  ocean: `
    radial-gradient(ellipse at 50% 100%, rgba(0,170,204,0.4) 0%, transparent 60%),
    linear-gradient(180deg, #001a33 0%, #003366 40%, #006699 70%, #004466 100%)
  `,
  forest: `
    radial-gradient(ellipse at 50% 80%, rgba(74,138,74,0.4) 0%, transparent 60%),
    linear-gradient(180deg, #0a1a0a 0%, #1a3a1a 40%, #2d5a2d 70%, #1a3a1a 100%)
  `,
  city: `
    radial-gradient(ellipse at 50% 100%, rgba(74,58,106,0.5) 0%, transparent 60%),
    linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 40%, #2d2d4e 70%, #1a0a2e 100%)
  `,
  abstract: `
    radial-gradient(ellipse at 20% 30%, rgba(80,0,128,0.6) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(0,80,160,0.5) 0%, transparent 50%),
    linear-gradient(135deg, #1a0030 0%, #2d0050 25%, #500080 50%, #0050a0 75%, #002050 100%)
  `,
};

/* ─── Wallpaper Component ────────────────────────────────────────────────────── */
const Wallpaper = ({ id }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed', inset: 0, zIndex: 0,
      background: WALLPAPERS[id] || WALLPAPERS.bloom,
      pointerEvents: 'none', overflow: 'hidden',
      transition: 'background 0.8s ease',
    }}
  >
    {/* Animated orbs */}
    <div style={{ position:'absolute', width:'62vw', height:'62vw', borderRadius:'50%',
      background:'radial-gradient(circle, rgba(0,120,255,0.16) 0%, transparent 70%)',
      top:'-14%', left:'-9%', pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:'52vw', height:'52vw', borderRadius:'50%',
      background:'radial-gradient(circle, rgba(80,0,200,0.18) 0%, transparent 70%)',
      bottom:'4%', right:'-9%', pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:'32vw', height:'32vw', borderRadius:'50%',
      background:'radial-gradient(circle, rgba(0,180,255,0.14) 0%, transparent 70%)',
      top:'32%', right:'22%', pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:'220%', height:'2px',
      background:'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
      top:'37%', left:'-60%', transform:'rotate(-8deg)', pointerEvents:'none' }} />
  </div>
);

/* ─── Desktop App Definitions ────────────────────────────────────────────────── */
const DESKTOP_APPS = [
  {
    id: 'about',
    label: 'About Me',
    title: 'About Me',
    component: AboutMe,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" fill="#60a5fa"/>
        <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Projects',
    component: FileExplorer,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 8a2 2 0 012-2h7l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" fill="#fbbf24"/>
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'Skills.txt',
    component: Skills,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,3 17.5,10.5 26,11.5 20,17.5 21.7,26 14,22 6.3,26 8,17.5 2,11.5 10.5,10.5" fill="#a78bfa"/>
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'Resume',
    title: 'Resume.pdf',
    component: Resume,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="2" width="18" height="24" rx="2" fill="#34d399"/>
        <line x1="9" y1="9" x2="19" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="9" y1="13" x2="19" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="9" y1="17" x2="15" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact.lnk',
    component: Contact,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="2" fill="#fb923c"/>
        <polyline points="3,6 14,16 25,6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      </svg>
    ),
  },
];

/* ─── Desktop Icon ───────────────────────────────────────────────────────────── */
const DesktopIcon = ({ app }) => {
  const openWindow = useOsStore((s) => s.openWindow);
  return (
    <button
      id={`desktop-icon-${app.id}`}
      onDoubleClick={() => openWindow(app.title, app.component)}
      title={`Double-click to open ${app.label}`}
      style={{
        background: 'transparent',
        border: '1px solid transparent',
        borderRadius: 8,
        padding: '10px 8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        width: 76,
        color: '#fff',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <div style={{ lineHeight: 1 }}>{app.icon}</div>
      <span style={{
        fontSize: 11,
        fontWeight: 500,
        textAlign: 'center',
        textShadow: '0 1px 6px rgba(0,0,0,0.9)',
        lineHeight: 1.3,
        color: '#fff',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
      }}>
        {app.label}
      </span>
    </button>
  );
};

/* ─── App Root ───────────────────────────────────────────────────────────────── */
export default function App() {
  const windows        = useOsStore((s) => s.windows);
  const isLocked       = useOsStore((s) => s.isLocked);
  const isShuttingDown = useOsStore((s) => s.isShuttingDown);
  const wallpaper      = useOsStore((s) => s.wallpaper);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }}>

      {/* Shutdown overlay */}
      {isShuttingDown && <ShutdownScreen />}

      {/* Lock Screen */}
      {isLocked && !isShuttingDown && <LockScreen />}

      {/* Layer 0 — Wallpaper */}
      <Wallpaper id={wallpaper} />

      {/* Layer 1 — Desktop Icons */}
      <div
        style={{
          position: 'fixed',
          top: 16, left: 12,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          pointerEvents: isLocked ? 'none' : 'auto',
        }}
      >
        {DESKTOP_APPS.map((app) => <DesktopIcon key={app.id} app={app} />)}
      </div>

      {/* Layer 2 — Open Windows */}
      <AnimatePresence>
        {windows.map((win, i) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            component={win.component}
            props={win.props || {}}
            zIndex={win.zIndex}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            index={i}
          />
        ))}
      </AnimatePresence>

      {/* Layer 9999 — Taskbar */}
      {!isLocked && !isShuttingDown && <Taskbar />}
    </div>
  );
}

