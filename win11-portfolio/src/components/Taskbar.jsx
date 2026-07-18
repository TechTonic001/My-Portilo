import { useState, useEffect, useRef } from 'react';
import { Wifi, BatteryMedium, Volume2 } from 'lucide-react';
import useOsStore from '../store/useOsStore';
import AboutMe from './apps/AboutMe';
import FileExplorer from './apps/FileExplorer';
import Skills from './apps/Skills';
import Resume from './apps/Resume';
import Contact from './apps/Contact';
import Settings from './apps/Settings';
import Minesweeper from './apps/Minesweeper';
import Notepad from './apps/Notepad';

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
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  return (
    <div style={{ textAlign: 'right', lineHeight: 1.25, cursor: 'default' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.93)' }}>
        {h}:{m} {ampm}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{date}</div>
    </div>
  );
};

// ─── All Apps ─────────────────────────────────────────────────────────────────
const ALL_APPS = [
  { id: 'about',       label: 'About Me',    title: 'About Me',      component: AboutMe,     icon: '👤', iconColor: '#60a5fa' },
  { id: 'projects',    label: 'Projects',    title: 'Projects',      component: FileExplorer,icon: '📁', iconColor: '#fbbf24' },
  { id: 'skills',      label: 'Skills',      title: 'Skills.txt',    component: Skills,      icon: '⭐', iconColor: '#a78bfa' },
  { id: 'resume',      label: 'Resume',      title: 'Resume.pdf',    component: Resume,      icon: '📄', iconColor: '#34d399' },
  { id: 'contact',     label: 'Contact',     title: 'Contact.lnk',   component: Contact,     icon: '✉️', iconColor: '#fb923c' },
  { id: 'settings',    label: 'Settings',    title: 'Settings',      component: Settings,    icon: '⚙️', iconColor: '#9ca3af' },
  { id: 'minesweeper', label: 'Minesweeper', title: 'Minesweeper',   component: Minesweeper, icon: '💣', iconColor: '#f87171' },
  { id: 'notepad',     label: 'Notepad',     title: 'Notepad',       component: Notepad,     icon: '🗒️', iconColor: '#fde68a' },
];

const PINNED = ALL_APPS; // first 8 = all

const RECOMMENDED = [
  { label: 'RentFlow (MERN)', sub: 'React · Node · Paystack' },
  { label: 'Win11 Portfolio', sub: 'React · Vite · Framer' },
  { label: 'DB Utilities', sub: 'PostgreSQL · MySQL' },
];

// ─── Start Menu ───────────────────────────────────────────────────────────────
const StartMenu = ({ onClose }) => {
  const openWindow = useOsStore((s) => s.openWindow);
  const shutdown = useOsStore((s) => s.shutdown);
  const lock = useOsStore((s) => s.lock);
  const [search, setSearch] = useState('');

  const filtered = PINNED.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase())
  );

  const launch = (app) => {
    openWindow(app.title, app.component);
    onClose();
  };

  return (
    <div
      id="start-menu"
      style={{
        position: 'fixed',
        bottom: 52,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 640,
        maxHeight: 520,
        background: 'rgba(28,28,36,0.92)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div style={{ padding: '20px 24px 14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '9px 14px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>🔍</span>
          <input
            id="start-search"
            placeholder="Search apps, files, settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: 13,
              fontFamily: '"Segoe UI", system-ui, sans-serif',
            }}
          />
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px' }}>
        {/* Pinned */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Pinned</span>
          <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>All apps →</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 4,
          marginBottom: 20,
        }}>
          {filtered.map((app) => (
            <button
              key={app.id}
              id={`startmenu-app-${app.id}`}
              onClick={() => launch(app)}
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                padding: '10px 6px 8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                transition: 'background 0.14s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{app.icon}</span>
              <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.3 }}>
                {app.label}
              </span>
            </button>
          ))}
        </div>

        {/* Recommended */}
        {!search && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Recommended</span>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>More →</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 8,
              marginBottom: 16,
            }}>
              {RECOMMENDED.map((r, i) => (
                <button
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.14s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onClick={() => { openWindow('Projects', FileExplorer); onClose(); }}
                >
                  <span style={{
                    width: 28, height: 28,
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>{'<>'}</span>
                  <div>
                    <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{r.label}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{r.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer — User + Power */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,0,0,0.15)',
      }}>
        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#3b82f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff',
          }}>
            TT
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>TechTonic</span>
        </div>

        {/* Power options */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { icon: '🌙', label: 'Sleep',    action: onClose },
            { icon: '🔄', label: 'Restart',  action: () => { onClose(); window.location.reload(); } },
            { icon: '⏻',  label: 'Shut down', action: () => { onClose(); shutdown(); } },
          ].map((btn) => (
            <button
              key={btn.label}
              title={btn.label}
              onClick={btn.action}
              style={{
                width: 34, height: 34,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.14s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Taskbar Icon ─────────────────────────────────────────────────────────────
const TaskbarIcon = ({ app, isOpen, onClick }) => (
  <button
    id={`taskbar-app-${app.id}`}
    onClick={onClick}
    title={app.label}
    style={{
      width: 42, height: 42,
      borderRadius: 7,
      border: 'none',
      background: isOpen ? 'rgba(255,255,255,0.14)' : 'transparent',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 2,
      transition: 'background 0.14s',
      position: 'relative', flexShrink: 0,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
    onMouseLeave={e => e.currentTarget.style.background = isOpen ? 'rgba(255,255,255,0.14)' : 'transparent'}
  >
    <span style={{ fontSize: 20, lineHeight: 1 }}>{app.icon}</span>
    {isOpen && (
      <div style={{
        position: 'absolute', bottom: 3, left: '50%',
        transform: 'translateX(-50%)',
        width: 4, height: 4,
        borderRadius: '50%', background: '#60a5fa',
      }} />
    )}
  </button>
);

// ─── Taskbar ──────────────────────────────────────────────────────────────────
const Taskbar = () => {
  const openWindow     = useOsStore((s) => s.openWindow);
  const windows        = useOsStore((s) => s.windows);
  const focusWindow    = useOsStore((s) => s.focusWindow);
  const minimizeWindow = useOsStore((s) => s.minimizeWindow);
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef(null);

  // Close start menu on outside click
  useEffect(() => {
    if (!startOpen) return;
    const handler = (e) => {
      if (startRef.current && !startRef.current.contains(e.target)) {
        setStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [startOpen]);

  const handleAppClick = (app) => {
    const existing = windows.find((w) => w.title === app.title);
    if (existing) {
      existing.isMinimized ? focusWindow(existing.id) : minimizeWindow(existing.id);
    } else {
      openWindow(app.title, app.component);
    }
  };

  // Show icons for apps that are open in taskbar
  const openApps = ALL_APPS.filter((a) => windows.some((w) => w.title === a.title));

  return (
    <div ref={startRef}>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}

      <div
        id="taskbar"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          background: 'rgba(16,16,20,0.78)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 -2px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Center cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Win logo */}
          <button
            id="start-btn"
            onClick={() => setStartOpen((v) => !v)}
            title="Start"
            style={{
              width: 42, height: 42, borderRadius: 7, border: 'none',
              background: startOpen ? 'rgba(255,255,255,0.16)' : 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.14s', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = startOpen ? 'rgba(255,255,255,0.16)' : 'transparent'}
          >
            {/* Windows 11 grid logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#f25022"/>
              <rect x="10" y="0" width="8" height="8" rx="1.5" fill="#7fba00"/>
              <rect x="0" y="10" width="8" height="8" rx="1.5" fill="#00a4ef"/>
              <rect x="10" y="10" width="8" height="8" rx="1.5" fill="#ffb900"/>
            </svg>
          </button>

          {/* Search */}
          <button
            id="search-btn"
            onClick={() => { openWindow('Settings', Settings); }}
            title="Search"
            style={{
              height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.07)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '0 14px',
              transition: 'background 0.14s', flexShrink: 0, color: 'rgba(255,255,255,0.5)',
              fontSize: 12, fontFamily: '"Segoe UI", system-ui, sans-serif',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.11)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              <line x1="9" y1="9" x2="12" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Search
          </button>

          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

          {/* Open app icons */}
          {openApps.map((app) => (
            <TaskbarIcon
              key={app.id}
              app={app}
              isOpen={!!windows.find((w) => w.title === app.title && !w.isMinimized)}
              onClick={() => handleAppClick(app)}
            />
          ))}

          {/* Pinned main apps always shown */}
          {ALL_APPS.slice(0, 5).map((app) => {
            if (openApps.some((a) => a.id === app.id)) return null;
            return (
              <TaskbarIcon
                key={app.id}
                app={app}
                isOpen={false}
                onClick={() => handleAppClick(app)}
              />
            );
          })}
        </div>

        {/* System Tray */}
        <div style={{
          position: 'absolute', right: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Volume2   size={14} color="rgba(255,255,255,0.7)" />
          <Wifi      size={14} color="rgba(255,255,255,0.7)" />
          <BatteryMedium size={16} color="rgba(255,255,255,0.7)" />
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.12)' }} />
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
