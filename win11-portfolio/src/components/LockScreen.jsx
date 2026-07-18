import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useOsStore from '../store/useOsStore';

const LockScreen = () => {
  const unlock = useOsStore((s) => s.unlock);
  const [now, setNow] = useState(new Date());
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const h = now.getHours() % 12 || 12;
  const m = pad(now.getMinutes());
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const handleClick = () => {
    if (sliding) return;
    setSliding(true);
    setTimeout(() => unlock(), 600);
  };

  return (
    <AnimatePresence>
      {!sliding ? (
        <motion.div
          key="lock"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(0,82,212,0.7) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 20%, rgba(99,20,195,0.6) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 80%, rgba(0,140,255,0.45) 0%, transparent 48%),
              linear-gradient(135deg, #000c1a 0%, #001a3a 30%, #002d6b 60%, #001535 100%)
            `,
            userSelect: 'none',
          }}
        >
          {/* Animated orbs */}
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
          }}>
            {[
              { w: '60vw', h: '60vw', top: '-15%', left: '-10%', color: 'rgba(0,100,255,0.18)' },
              { w: '45vw', h: '45vw', bottom: '5%', right: '-8%', color: 'rgba(100,0,220,0.2)' },
              { w: '30vw', h: '30vw', top: '30%', right: '18%', color: 'rgba(0,180,255,0.14)' },
            ].map((orb, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: orb.w, height: orb.h,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                  top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right,
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ textAlign: 'center', zIndex: 1 }}
          >
            <div style={{
              fontSize: 'clamp(72px, 14vw, 120px)',
              fontWeight: 200,
              color: '#fff',
              letterSpacing: '-2px',
              lineHeight: 1,
              fontFamily: '"Segoe UI", system-ui, sans-serif',
              textShadow: '0 4px 40px rgba(0,120,255,0.4)',
            }}>
              {h}:{m} <span style={{ fontSize: '0.5em', opacity: 0.8 }}>{ampm}</span>
            </div>

            {/* Date */}
            <div style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 300,
              marginTop: 12,
              letterSpacing: 2,
              fontFamily: '"Segoe UI", system-ui, sans-serif',
            }}>
              {dayName}, {dateStr}
            </div>

            {/* Greeting */}
            <div style={{
              fontSize: 'clamp(13px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.55)',
              marginTop: 24,
              letterSpacing: 1,
              fontFamily: '"Segoe UI", system-ui, sans-serif',
            }}>
              Welcome to My Portfolio
            </div>
          </motion.div>

          {/* Click hint */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 60,
              textAlign: 'center',
              zIndex: 1,
            }}
            animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: 2, fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
              CLICK ANYWHERE TO CONTINUE
            </div>
            <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>↑</div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="lock-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#000d1f' }}
        />
      )}
    </AnimatePresence>
  );
};

export default LockScreen;
