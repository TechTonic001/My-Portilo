import { useState } from 'react';

const SKILLS = [
  { name: 'React',      pct: 90, cat: 'Frontend', color: '#60a5fa' },
  { name: 'Angular',    pct: 80, cat: 'Frontend', color: '#60a5fa' },
  { name: 'Vue',        pct: 60, cat: 'Frontend', color: '#60a5fa' },
  { name: 'TypeScript', pct: 80, cat: 'Frontend', color: '#60a5fa' },
  { name: 'Node.js',    pct: 85, cat: 'Backend',  color: '#4ade80' },
  { name: 'MongoDB',    pct: 75, cat: 'Backend',  color: '#4ade80' },
  { name: 'PHP',        pct: 65, cat: 'Backend',  color: '#4ade80' },
  { name: 'Laravel',    pct: 55, cat: 'Backend',  color: '#4ade80' },
  { name: 'Docker',     pct: 60, cat: 'DevOps',   color: '#fb923c' },
  { name: 'CPanel',     pct: 80, cat: 'DevOps',   color: '#fb923c' },
  { name: 'Git',        pct: 95, cat: 'Tools',    color: '#a3a3a3' },
  { name: 'GitHub',     pct: 90, cat: 'Tools',    color: '#a3a3a3' },
  { name: 'Figma',      pct: 70, cat: 'Tools',    color: '#a3a3a3' },
];

const TABS = ['All', 'Frontend', 'Backend', 'DevOps', 'Tools'];

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');

  const visible = activeTab === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.cat === activeTab);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#18181c',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
    }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        background: '#1e1e24',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '4px 14px',
              borderRadius: 20,
              border: '1px solid',
              borderColor: activeTab === tab ? '#3b82f6' : 'rgba(255,255,255,0.12)',
              background: activeTab === tab ? '#3b82f6' : 'transparent',
              color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.6)',
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontFamily: '"Segoe UI", system-ui, sans-serif',
            }}
          >
            {tab}
          </button>
        ))}
        <div style={{
          marginLeft: 'auto',
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
        }}>
          {visible.length} skills
        </div>
      </div>

      {/* Skills list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {visible.map((skill) => (
          <div
            key={skill.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 44px',
              alignItems: 'center',
              padding: '8px 18px',
              gap: 12,
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <span style={{
              fontSize: 12.5,
              color: 'rgba(255,255,255,0.82)',
              textAlign: 'right',
              fontWeight: 400,
            }}>
              {skill.name}
            </span>
            <div style={{
              height: 6,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${skill.pct}%`,
                background: skill.color,
                borderRadius: 3,
                transition: 'width 0.6s ease',
                boxShadow: `0 0 8px ${skill.color}88`,
              }} />
            </div>
            <span style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'right',
            }}>
              {skill.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
