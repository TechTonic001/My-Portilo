import { motion } from 'framer-motion';
import useOsStore from '../store/useOsStore';

const ShutdownScreen = () => {
  const restart = useOsStore((s) => s.restart);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onClick={restart}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          fontSize: 48,
          marginBottom: 32,
          filter: 'grayscale(1)',
          opacity: 0.3,
        }}>
          ⊞
        </div>
        <div style={{
          fontSize: 18,
          color: 'rgba(255,255,255,0.7)',
          fontFamily: '"Segoe UI", system-ui, sans-serif',
          letterSpacing: 1,
          fontWeight: 300,
        }}>
          It's now safe to turn off your computer.
        </div>
        <div style={{
          marginTop: 32,
          fontSize: 12,
          color: 'rgba(255,255,255,0.25)',
          fontFamily: '"Segoe UI", system-ui, sans-serif',
          letterSpacing: 2,
        }}>
          CLICK ANYWHERE TO RESTART
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShutdownScreen;
