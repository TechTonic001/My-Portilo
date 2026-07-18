import { useState } from 'react';
import useOsStore from '../../store/useOsStore';

const WALLPAPERS = [
  {
    id: 'bloom',
    label: 'Bloom',
    preview: 'linear-gradient(135deg, #001530 0%, #002060 30%, #003ea0 60%, #1a5fb4 80%, #1b3280 100%)',
  },
  {
    id: 'mountains',
    label: 'Mountains',
    preview: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 30%, #2d4a6e 60%, #4a7a9b 80%, #1a2a3e 100%)',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    preview: 'linear-gradient(180deg, #001a33 0%, #003366 30%, #006699 60%, #00aacc 80%, #004466 100%)',
  },
  {
    id: 'forest',
    label: 'Forest',
    preview: 'linear-gradient(180deg, #0a1a0a 0%, #1a3a1a 30%, #2d5a2d 60%, #4a8a4a 80%, #1a3a1a 100%)',
  },
  {
    id: 'city',
    label: 'City',
    preview: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 30%, #2d2d4e 60%, #4a3a6a 80%, #1a0a2e 100%)',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    preview: 'linear-gradient(135deg, #1a0030 0%, #2d0050 25%, #500080 50%, #0050a0 75%, #002050 100%)',
  },
];

const NAV = ['Personalization', 'System', 'Accounts'];

const Settings = () => {
  const wallpaper = useOsStore((s) => s.wallpaper);
  const theme = useOsStore((s) => s.theme);
  const setWallpaper = useOsStore((s) => s.setWallpaper);
  const setTheme = useOsStore((s) => s.setTheme);
  const [activeNav, setActiveNav] = useState('Personalization');

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      background: '#18181c',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 200,
        background: '#141418',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 8px',
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          padding: '0 10px',
          marginBottom: 10,
        }}>
          Settings
        </div>
        {NAV.map((n) => (
          <button
            key={n}
            onClick={() => setActiveNav(n)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: 'none',
              borderRadius: 6,
              background: activeNav === n ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: activeNav === n ? '#93c5fd' : 'rgba(255,255,255,0.65)',
              fontSize: 12.5,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: '"Segoe UI", system-ui, sans-serif',
              transition: 'background 0.15s',
              marginBottom: 2,
            }}
            onMouseEnter={e => { if (activeNav !== n) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { if (activeNav !== n) e.currentTarget.style.background = 'transparent'; }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
        {activeNav === 'Personalization' && (
          <div>
            <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '0 0 20px' }}>Personalization</h3>

            {/* Wallpaper section */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: 16,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginBottom: 14 }}>
                Background Wallpaper
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
              }}>
                {WALLPAPERS.map((wp) => (
                  <div
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    style={{
                      borderRadius: 8,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: wallpaper === wp.id ? '2px solid #3b82f6' : '2px solid transparent',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <div style={{
                      height: 56,
                      background: wp.preview,
                    }} />
                    <div style={{
                      padding: '5px 8px',
                      background: 'rgba(255,255,255,0.05)',
                      fontSize: 11,
                      color: wallpaper === wp.id ? '#60a5fa' : 'rgba(255,255,255,0.55)',
                      textAlign: 'center',
                    }}>
                      {wp.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark/Light mode */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Theme Mode</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>
                  Currently: {theme === 'dark' ? 'Dark' : 'Light'} mode
                </div>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{
                  padding: '7px 18px',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: '"Segoe UI", system-ui, sans-serif',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
              </button>
            </div>
          </div>
        )}

        {activeNav === 'System' && (
          <div>
            <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '0 0 20px' }}>System</h3>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              {[
                ['Owner', 'TechTonic (Portfolio)'],
                ['Version', '2.0.0'],
                ['Framework', 'React 18 + Vite'],
                ['UI Library', 'Framer Motion + Lucide React'],
                ['State', 'Zustand'],
                ['Build', 'Vite 5'],
              ].map(([key, val]) => (
                <div key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontSize: 12.5,
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{key}</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === 'Accounts' && (
          <div>
            <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '0 0 20px' }}>Accounts</h3>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}>
                TT
              </div>
              <div>
                <div style={{ fontSize: 15, color: '#fff', fontWeight: 600 }}>TechTonic</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>Full-Stack Developer</div>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: 16,
            }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                No social links configured. Contact via the Contact.lnk app.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
