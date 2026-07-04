import { AnimatePresence } from 'framer-motion';
import useOsStore from './store/useOsStore';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import AboutMe from './components/apps/AboutMe';
import FileExplorer from './components/apps/FileExplorer';
import './index.css';

/* ─── Win11 wallpaper gradient ─────────────────────────────────────────────── */
const Wallpaper = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: `
        radial-gradient(ellipse at 18% 48%, rgba(0,82,212,0.6) 0%, transparent 52%),
        radial-gradient(ellipse at 82% 18%, rgba(99,20,195,0.5) 0%, transparent 48%),
        radial-gradient(ellipse at 62% 82%, rgba(0,140,255,0.38) 0%, transparent 44%),
        radial-gradient(ellipse at 8%,  90%, rgba(20,100,220,0.42) 0%, transparent 46%),
        linear-gradient(140deg, #001530 0%, #002060 28%, #003ea0 54%, #1a5fb4 76%, #1b3280 100%)
      `,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    {/* Light orbs */}
    <div style={{ position:'absolute', width:'62vw', height:'62vw', borderRadius:'50%',
      background:'radial-gradient(circle, rgba(0,120,255,0.16) 0%, transparent 70%)',
      top:'-14%', left:'-9%', pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:'52vw', height:'52vw', borderRadius:'50%',
      background:'radial-gradient(circle, rgba(80,0,200,0.18) 0%, transparent 70%)',
      bottom:'4%', right:'-9%', pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:'32vw', height:'32vw', borderRadius:'50%',
      background:'radial-gradient(circle, rgba(0,180,255,0.14) 0%, transparent 70%)',
      top:'32%', right:'22%', pointerEvents:'none' }} />
    {/* Diagonal shimmer */}
    <div style={{ position:'absolute', width:'220%', height:'2px',
      background:'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
      top:'37%', left:'-60%', transform:'rotate(-8deg)', pointerEvents:'none' }} />
  </div>
);

/* ─── Desktop shortcut icons ────────────────────────────────────────────────── */
const DESKTOP_APPS = [
  { id: 'about', icon: '📝', label: 'About Me',      title: 'About Me — Notepad', component: AboutMe },
  { id: 'files', icon: '📁', label: 'File Explorer', title: 'File Explorer',       component: FileExplorer },
];

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
      <span style={{ fontSize: 34, lineHeight: 1 }}>{app.icon}</span>
      <span style={{
        fontSize: 11,
        fontWeight: 500,
        textAlign: 'center',
        textShadow: '0 1px 6px rgba(0,0,0,0.9)',
        lineHeight: 1.3,
      }}>
        {app.label}
      </span>
    </button>
  );
};

/* ─── App root ──────────────────────────────────────────────────────────────── */
export default function App() {
  const windows = useOsStore((s) => s.windows);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      {/* Layer 0 — Wallpaper */}
      <Wallpaper />

      {/* Layer 1 — Desktop icons */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 12,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          pointerEvents: 'auto',
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
      <Taskbar />
    </div>
  );
}
