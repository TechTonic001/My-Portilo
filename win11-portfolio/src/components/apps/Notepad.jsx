import { useState } from 'react';

const Notepad = () => {
  const [text, setText] = useState('');

  const lines = text.split('\n').length;
  const chars = text.length;

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#1e1e1e',
      fontFamily: '"Consolas", "Courier New", monospace',
    }}>
      {/* Menu Bar */}
      <div style={{
        display: 'flex',
        gap: 2,
        padding: '4px 8px',
        background: '#2d2d30',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {['File', 'Edit', 'View', 'Help'].map((menu) => (
          <button
            key={menu}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 12,
              padding: '3px 8px',
              cursor: 'pointer',
              borderRadius: 3,
              fontFamily: '"Segoe UI", system-ui, sans-serif',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Text Area */}
      <textarea
        id="notepad-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
        style={{
          flex: 1,
          background: '#1e1e1e',
          color: '#d4d4d4',
          border: 'none',
          outline: 'none',
          padding: '12px 16px',
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily: '"Consolas", "Courier New", monospace',
          resize: 'none',
          minHeight: 0,
        }}
      />

      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 20,
        padding: '3px 12px',
        background: '#007acc',
        borderTop: '1px solid rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}>
        {[`Ln ${lines}, Col 1`, '100%', 'UTF-8', 'CRLF', 'Plain Text'].map((item) => (
          <span key={item} style={{ fontSize: 11, color: '#fff', opacity: 0.9, fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
            {item}
          </span>
        ))}
        <span style={{ fontSize: 11, color: '#fff', opacity: 0.7, fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
          {chars} chars
        </span>
      </div>
    </div>
  );
};

export default Notepad;
