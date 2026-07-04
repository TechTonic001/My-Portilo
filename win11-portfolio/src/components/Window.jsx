import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import useOsStore from '../store/useOsStore';

const WINDOW_W = 820;
const WINDOW_H = 540;
const TASKBAR_H = 48;

const Window = ({ id, title, component: Component, props = {}, zIndex, isMinimized, isMaximized, index = 0 }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOsStore();

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1366;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 768;

  const defaultX = Math.max(40, (vw - WINDOW_W) / 2 + (index % 4) * 24);
  const defaultY = Math.max(40, (vh - TASKBAR_H - WINDOW_H) / 2 + (index % 4) * 24);

  const x = useMotionValue(defaultX);
  const y = useMotionValue(defaultY);

  useEffect(() => {
    if (isMaximized) {
      x.set(0);
      y.set(0);
    } else {
      x.set(defaultX);
      y.set(defaultY);
    }
  }, [isMaximized]);

  if (isMinimized) return null;

  const winW = isMaximized ? vw : WINDOW_W;
  const winH = isMaximized ? vh - TASKBAR_H : WINDOW_H;
  const radius = isMaximized ? 0 : 10;

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 0,
        left: 0,
        right: Math.max(0, vw - winW),
        bottom: Math.max(0, vh - TASKBAR_H - winH),
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, pointerEvents: 'auto' }}
      exit={{ opacity: 0, scale: 0.9, pointerEvents: 'none' }}
      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
      onMouseDown={() => focusWindow(id)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        width: winW,
        height: winH,
        borderRadius: radius,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex,
        boxShadow: '0 28px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1)',
        background: '#18181c',
      }}
    >
      {/* ── Title Bar ── */}
      <div
        style={{
          height: 36,
          background: 'rgba(28,28,34,0.99)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 14,
          flexShrink: 0,
          userSelect: 'none',
          cursor: isMaximized ? 'default' : 'grab',
        }}
      >
        <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
          {title}
        </span>

        <div style={{ display: 'flex' }}>
          <WinBtn onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} hover="rgba(255,255,255,0.1)">
            <Minus size={12} />
          </WinBtn>
          <WinBtn onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} hover="rgba(255,255,255,0.1)">
            {isMaximized ? <Square size={11} /> : <Maximize2 size={11} />}
          </WinBtn>
          <WinBtn onClick={(e) => { e.stopPropagation(); closeWindow(id); }} hover="#c42b1c" closeBtn>
            <X size={12} />
          </WinBtn>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: 'auto', height: 0 }}>
        <Component {...props} />
      </div>
    </motion.div>
  );
};

// Small helper for title bar buttons
const WinBtn = ({ children, onClick, hover, closeBtn }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: 46,
        height: 36,
        border: 'none',
        background: 'transparent',
        color: 'rgba(255,255,255,0.82)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.12s',
        flexShrink: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.background = hover}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </button>
  );
};

export default Window;
