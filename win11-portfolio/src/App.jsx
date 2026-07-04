import { AnimatePresence } from 'framer-motion';
import useOsStore from './store/useOsStore';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import AboutMe from './components/apps/AboutMe';
import FileExplorer from './components/apps/FileExplorer';
import './index.css';

// Windows 11 default wallpaper as a gorgeous gradient
const wallpaperStyle = {
  position: 'fixed',
  inset: 0,
  background: `
    radial-gradient(ellipse at 20% 50%, rgba(0, 82, 212, 0.55) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(99, 20, 195, 0.45) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(0, 140, 255, 0.35) 0%, transparent 45%),
    radial-gradient(ellipse at 10% 90%, rgba(23, 110, 230, 0.4) 0%, transparent 50%),
    linear-gradient(135deg, #001832 0%, #002b6e 30%, #0042a8 55%, #1a5fb4 75%, #1b3a8c 100%)
  `,
  overflow: 'hidden',
  zIndex: 0,
};

const WallpaperOrbs = () => (
  <>
    <div style={{
      position: 'absolute',
      width: '60vw', height: '60vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,120,255,0.18) 0%, transparent 70%)',
      top: '-15%', left: '-10%', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute',
      width: '50vw', height: '50vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(80,0,200,0.2) 0%, transparent 70%)',
      bottom: '5%', right: '-10%', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute',
      width: '30vw', height: '30vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,180,255,0.15) 0%, transparent 70%)',
      top: '30%', right: '20%', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', width: '200%', height: '2px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
      top: '38%', left: '-50%', transform: 'rotate(-8deg)', pointerEvents: 'none',
    }} />
  </>
);

// Desktop shortcut icons
const desktopApps = [
  { id: 'about', icon: '📝', label: 'About Me', title: 'About Me — Notepad', component: AboutMe },
  { id: 'files', icon: '📁', label: 'File Explorer', title: 'File Explorer', component: FileExplorer },
];

const DesktopIcon = ({ app }) => {
  const openWindow = useOsStore((s) => s.openWindow);
  return (
    <button
      id={`desktop-icon-${app.id}`}
      onDoubleClick={() => openWindow(app.title, app.component)}
      style={{
        background: 'transparent',
        border: '1px solid transparent',
        borderRadius: 8,
        padding: '10px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        width: 80,
        color: '#fff',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <span style={{ fontSize: 36, lineHeight: 1 }}>{app.icon}</span>
      <span style={{
        fontSize: 11.5,
        fontWeight: 500,
        textAlign: 'center',
        textShadow: '0 1px 4px rgba(0,0,0,0.8)',
        lineHeight: 1.3,
      }}>
        {app.label}
      </span>
    </button>
  );
};

function App() {
  const windows = useOsStore((s) => s.windows);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Wallpaper layer */}
      <div style={wallpaperStyle}>
        <WallpaperOrbs />
      </div>

      {/* Desktop icons — top-left area */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 5,
        }}
      >
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows layer */}
      <AnimatePresence>
        {windows.map((win, i) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            component={win.component}
            props={win.props}
            zIndex={win.zIndex}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            index={i}
          />
        ))}
      </AnimatePresence>

      {/* Taskbar — always on top */}
      <Taskbar />
    </div>
  );
}

export default App;
