import { useState } from 'react';

const TIMELINE = [
  {
    type: 'experience',
    title: 'Full-Stack Developer',
    company: 'Freelance / Self-Employed',
    period: 'Jan 2024 – Present',
    desc: 'Building full-stack web applications for clients using React, Node.js, and PostgreSQL. Delivered RentFlow — a complete MERN rent tracking system with Paystack payment integration.',
    icon: '💼',
  },
  {
    type: 'experience',
    title: 'Web Development Intern',
    company: 'Tech Startup (Remote)',
    period: 'Jun 2023 – Dec 2023',
    desc: 'Developed and maintained frontend features using React and TypeScript. Collaborated with backend team to integrate REST APIs.',
    icon: '💼',
  },
  {
    type: 'education',
    title: 'National Diploma — Computer Science',
    company: 'SQI College of ICT',
    period: '2023 – Present',
    desc: 'Currently enrolled in ND program focusing on Software Development, Databases, Networking, and Web Technologies.',
    icon: '🎓',
  },
  {
    type: 'education',
    title: 'O Level (WAEC/NECO)',
    company: 'Secondary School',
    period: 'Completed',
    desc: 'Credit and above in core subjects including Mathematics, English Language, Physics, Chemistry, Economics, and Biology.',
    icon: '🏫',
  },
];

const Resume = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#18181c',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
    }}>
      {/* Tabs + Download */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: '#1e1e24',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['timeline', 'pdf'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '5px 16px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === tab ? 'rgba(59,130,246,0.25)' : 'transparent',
                color: activeTab === tab ? '#60a5fa' : 'rgba(255,255,255,0.55)',
                fontSize: 12.5,
                cursor: 'pointer',
                fontFamily: '"Segoe UI", system-ui, sans-serif',
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {tab === 'timeline' ? 'Timeline' : 'PDF'}
            </button>
          ))}
        </div>
        <button
          onClick={() => alert('Resume PDF download coming soon!')}
          style={{
            padding: '4px 14px',
            borderRadius: 6,
            border: '1px solid rgba(59,130,246,0.4)',
            background: 'rgba(59,130,246,0.15)',
            color: '#60a5fa',
            fontSize: 12,
            cursor: 'pointer',
            fontFamily: '"Segoe UI", system-ui, sans-serif',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.15)'}
        >
          ↓ Download
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {activeTab === 'timeline' ? (
          <div>
            <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
              Career & Education Timeline
            </h3>
            {/* Experience */}
            <div style={{ marginBottom: 24 }}>
              <div style={{
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 12,
              }}>
                Experience
              </div>
              {TIMELINE.filter(t => t.type === 'experience').map((item, i) => (
                <TimelineItem key={i} item={item} isLast={i === TIMELINE.filter(t => t.type === 'experience').length - 1} />
              ))}
            </div>
            {/* Education */}
            <div>
              <div style={{
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 12,
              }}>
                Education
              </div>
              {TIMELINE.filter(t => t.type === 'education').map((item, i) => (
                <TimelineItem key={i} item={item} isLast={i === TIMELINE.filter(t => t.type === 'education').length - 1} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}>
            <div style={{ fontSize: 48 }}>📄</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              PDF Preview
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, textAlign: 'center', maxWidth: 280 }}>
              PDF not yet uploaded. Use the Download button above when available.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({ item, isLast }) => (
  <div style={{
    display: 'flex',
    gap: 14,
    marginBottom: isLast ? 0 : 20,
  }}>
    {/* Timeline dot/line */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'rgba(59,130,246,0.2)',
        border: '1px solid rgba(59,130,246,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        flexShrink: 0,
      }}>
        {item.icon}
      </div>
      {!isLast && (
        <div style={{
          width: 1,
          flex: 1,
          background: 'rgba(255,255,255,0.1)',
          marginTop: 6,
        }} />
      )}
    </div>

    {/* Content */}
    <div style={{ flex: 1, paddingBottom: 16 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
      }}>
        <div>
          <div style={{ fontSize: 13.5, color: '#fff', fontWeight: 600 }}>{item.title}</div>
          <div style={{ fontSize: 12, color: '#60a5fa', marginTop: 2 }}>{item.company}</div>
        </div>
        <div style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          background: 'rgba(255,255,255,0.06)',
          padding: '2px 8px',
          borderRadius: 10,
          whiteSpace: 'nowrap',
        }}>
          {item.period}
        </div>
      </div>
      <p style={{
        margin: 0,
        fontSize: 12.5,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.65,
      }}>
        {item.desc}
      </p>
    </div>
  </div>
);

export default Resume;
