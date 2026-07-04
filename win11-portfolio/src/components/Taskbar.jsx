import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Volume2, LayoutGrid } from 'lucide-react';
import useOsStore from '../store/useOsStore';
import AboutMe from './apps/AboutMe';
import FileExplorer from './apps/FileExplorer';

// ─── Live Clock ─────────────────────────────────────────────────────────────
const Clock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const h = now.getHours() % 12 || 12;
  const m = pad(now.getMinutes());
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <div style={{ textAlign: 'right', lineHeight: 1.25, cursor: 'default' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.93)' }}>
        {h}:{m} {ampm}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{date}</div>
    </div>
  );
};

// ─── App definitions ─────────────────────────────────────────────────────────
const APP_LIST = [
  { id: 'about',  label: 'About Me',      icon: '📝', title: 'About Me — Notepad', component: AboutMe },
  { id: 'files',  label: 'File Explorer', icon: '📁', title: 'File Explorer',       component: FileExplorer },
];

// ─── Single taskbar icon button ───────────────────────────────────────────────
const TaskbarIcon = ({ app, isOpen, onClick }) => (
  <button
    id={`taskbar-app-${app.id}`}
    onClick={onClick}
    title={app.label}
    style={{
      width: 42,
      height: 42,
      borderRadius: 7,
      border: 'none',
      background: isOpen ? 'rgba(255,255,255,0.14)' : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      transition: 'background 0.14s',
      position: 'relative',
      flexShrink: 0,
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
    onMouseLeave={e => (e.currentTarget.style.background = isOpen ? 'rgba(255,255,255,0.14)' : 'transparent')}
  >
    <span style={{ fontSize: 20, lineHeight: 1, display: 'block' }}>{app.icon}</span>
    {isOpen && (
      <div
        style={{
          position: 'absolute',
          bottom: 3,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#60a5fa',
        }}
      />
    )}
  </button>
);

// ─── Taskbar component ────────────────────────────────────────────────────────
const Taskbar = () => {
  const openWindow   = useOsStore((s) => s.openWindow);
  const windows      = useOsStore((s) => s.windows);
  const focusWindow  = useOsStore((s) => s.focusWindow);
  const minimizeWindow = useOsStore((s) => s.minimizeWindow);
  const [startActive, setStartActive] = useState(false);

  const handleAppClick = (app) => {
    const existing = windows.find((w) => w.title === app.title);
    if (existing) {
      existing.isMinimized ? focusWindow(existing.id) : minimizeWindow(existing.id);
    } else {
      openWindow(app.title, app.component);
    }
  };

  return (
    <div
      id="taskbar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        background: 'rgba(16, 16, 20, 0.75)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* ── Center cluster ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Start / Windows button */}
        <button
          id="start-btn"
          onClick={() => setStartActive((v) => !v)}
          title="Start"
          style={{
            width: 42,
            height: 42,
            borderRadius: 7,
            border: 'none',
            background: startActive ? 'rgba(255,255,255,0.16)' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.14s',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = startActive ? 'rgba(255,255,255,0.16)' : 'transparent')}
        >
          <LayoutGrid size={18} color="#60a5fa" />
        </button>

        {/* Separator */}
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)', margin: '0 4px' }} />

        {/* App icons */}
        {APP_LIST.map((app) => {
          const isOpen = !!windows.find((w) => w.title === app.title);
          return (
            <TaskbarIcon
              key={app.id}
              app={app}
              isOpen={isOpen}
              onClick={() => handleAppClick(app)}
            />
          );
        })}
      </div>

      {/* ── System Tray (far right) ── */}
      <div
        style={{
          position: 'absolute',
          right: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Volume2   size={14} color="rgba(255,255,255,0.7)" />
        <Wifi      size={14} color="rgba(255,255,255,0.7)" />
        <BatteryMedium size={16} color="rgba(255,255,255,0.7)" />
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.12)' }} />
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;
