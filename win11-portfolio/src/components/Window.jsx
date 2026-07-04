import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, Square } from 'lucide-react';
import useOsStore from '../store/useOsStore';

const TASKBAR_H = 48;

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

const Window = ({ id, title, component: Component, props = {}, zIndex, isMinimized, isMaximized, index }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOsStore();
  const { w: vw, h: vh } = useWindowSize();

  // Responsive window dimensions
  const WIN_W = Math.min(820, vw - 20);
  const WIN_H = Math.min(540, vh - TASKBAR_H - 20);

  // Default centred position with slight cascade offset
  const defaultX = Math.max(10, Math.floor((vw - WIN_W) / 2) + (index % 5) * 22);
  const defaultY = Math.max(10, Math.floor((vh - TASKBAR_H - WIN_H) / 2) + (index % 5) * 22);

  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const dragState = useRef(null); // { startMouseX, startMouseY, startPosX, startPosY }

  const onTitleMouseDown = useCallback((e) => {
    if (isMaximized) return;
    e.preventDefault();
    focusWindow(id);
    dragState.current = {
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    };

    const onMove = (me) => {
      if (!dragState.current) return;
      const dx = me.clientX - dragState.current.startMouseX;
      const dy = me.clientY - dragState.current.startMouseY;
      setPos({
        x: Math.max(0, Math.min(vw - WIN_W, dragState.current.startPosX + dx)),
        y: Math.max(0, Math.min(vh - TASKBAR_H - WIN_H, dragState.current.startPosY + dy)),
      });
    };

    const onUp = () => {
      dragState.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [id, isMaximized, pos, vw, vh, WIN_W, WIN_H, focusWindow]);

  if (isMinimized) return null;

  const winW = isMaximized ? vw : WIN_W;
  const winH = isMaximized ? vh - TASKBAR_H : WIN_H;
  const winX = isMaximized ? 0 : pos.x;
  const winY = isMaximized ? 0 : pos.y;
  const radius = isMaximized ? 0 : 10;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      onMouseDown={() => focusWindow(id)}
      style={{
        position: 'fixed',
        left: winX,
        top: winY,
        width: winW,
        height: winH,
        zIndex,
        borderRadius: radius,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 72px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.09)',
        background: '#18181c',
      }}
    >
      {/* ─── Title Bar ─────────────────────────── */}
      <div
        onMouseDown={onTitleMouseDown}
        style={{
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 14,
          flexShrink: 0,
          userSelect: 'none',
          cursor: isMaximized ? 'default' : 'grab',
          background: 'rgba(26,26,32,0.99)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>
          {title}
        </span>

        <div style={{ display: 'flex' }}>
          <TitleBtn
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            hoverBg="rgba(255,255,255,0.1)"
          >
            <Minus size={12} />
          </TitleBtn>
          <TitleBtn
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            hoverBg="rgba(255,255,255,0.1)"
          >
            {isMaximized ? <Square size={11} /> : <Maximize2 size={11} />}
          </TitleBtn>
          <TitleBtn
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            hoverBg="#c42b1c"
          >
            <X size={12} />
          </TitleBtn>
        </div>
      </div>

      {/* ─── App Content ───────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <Component {...(props || {})} />
      </div>
    </motion.div>
  );
};

const TitleBtn = ({ children, onClick, hoverBg }) => (
  <button
    onClick={onClick}
    onMouseDown={(e) => e.stopPropagation()}
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
      flexShrink: 0,
      transition: 'background 0.12s',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  >
    {children}
  </button>
);

export default Window;
