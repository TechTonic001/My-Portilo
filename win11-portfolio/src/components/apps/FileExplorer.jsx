import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Home,
  Star,
  Clock,
  HardDrive,
  Search,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  LayoutGrid,
  List,
} from 'lucide-react';

const projects = [
  {
    id: 'rentflow',
    name: 'RentFlow — Rent Tracking System',
    type: 'folder',
    badge: 'MERN + Paystack',
    badgeColor: '#16a34a',
    modified: 'June 28, 2025',
    size: '—',
    files: [
      { name: 'README.md', icon: '📄', size: '4 KB', modified: 'Jun 28, 2025' },
      { name: 'package.json', icon: '📦', size: '2 KB', modified: 'Jun 28, 2025' },
      { name: 'server.js', icon: '🟩', size: '8 KB', modified: 'Jun 26, 2025' },
      { name: 'paystack.config.js', icon: '💳', size: '3 KB', modified: 'Jun 24, 2025' },
      { name: 'schema.sql (PostgreSQL)', icon: '🐘', size: '12 KB', modified: 'Jun 20, 2025' },
    ],
    description: 'A full-featured MERN stack application for landlords and property managers to track tenant rent payments in real time. Integrated with Paystack for secure card, bank transfer, and USSD payments. Built with a PostgreSQL database for transactional integrity and MySQL for reporting analytics.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'PostgreSQL', 'MySQL', 'Paystack API'],
    highlights: [
      'Paystack payment gateway (cards, bank, USSD)',
      'Webhook-based real-time payment verification',
      'PostgreSQL for ACID-compliant transactions',
      'MySQL for historical reporting & analytics',
      'PDF receipt & invoice generation',
      'Multi-property & role-based access control',
    ],
  },
  {
    id: 'portfolio',
    name: 'Win11 Portfolio OS',
    type: 'folder',
    badge: 'React + Vite',
    badgeColor: '#2563eb',
    modified: 'July 4, 2025',
    size: '—',
    files: [
      { name: 'App.jsx', icon: '⚛️', size: '3 KB', modified: 'Jul 4, 2025' },
      { name: 'Taskbar.jsx', icon: '⚛️', size: '4 KB', modified: 'Jul 4, 2025' },
      { name: 'Window.jsx', icon: '⚛️', size: '5 KB', modified: 'Jul 4, 2025' },
      { name: 'useOsStore.js', icon: '📦', size: '2 KB', modified: 'Jul 4, 2025' },
    ],
    description: 'An interactive Windows 11-style desktop portfolio built with React, Framer Motion, Zustand, and Lucide React. Features draggable windows, a live taskbar, system tray, and app launcher.',
    tech: ['React', 'Vite', 'Framer Motion', 'Zustand', 'Lucide React'],
    highlights: [
      'Full OS-like window management',
      'Draggable windows with z-index focus',
      'Glassmorphism Taskbar with live clock',
      'Zustand global state management',
    ],
  },
  {
    id: 'db-utils',
    name: 'Database Utilities & Scripts',
    type: 'folder',
    badge: 'PostgreSQL · MySQL',
    badgeColor: '#7c3aed',
    modified: 'May 15, 2025',
    size: '—',
    files: [
      { name: 'migrations.sql', icon: '🐘', size: '18 KB', modified: 'May 15, 2025' },
      { name: 'indexes.sql', icon: '🔍', size: '5 KB', modified: 'May 10, 2025' },
      { name: 'reports.sql (MySQL)', icon: '📊', size: '9 KB', modified: 'May 12, 2025' },
      { name: 'seed-data.js', icon: '🌱', size: '4 KB', modified: 'May 8, 2025' },
    ],
    description: 'A collection of database management scripts and utilities for PostgreSQL and MySQL, including advanced schema migrations, indexing strategies, stored procedures, and analytical reporting queries.',
    tech: ['PostgreSQL', 'MySQL', 'SQL', 'Node.js'],
    highlights: [
      'Advanced PostgreSQL: CTEs, window functions, triggers',
      'MySQL stored procedures & performance tuning',
      'Schema normalization up to 3NF',
      'Automated migration scripts',
    ],
  },
];

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      padding: '5px 10px',
      border: 'none',
      background: active ? 'rgba(96,165,250,0.18)' : 'transparent',
      color: active ? '#93c5fd' : 'rgba(255,255,255,0.72)',
      fontSize: 12.5,
      cursor: 'pointer',
      borderRadius: 5,
      textAlign: 'left',
      transition: 'background 0.15s',
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
  >
    <Icon size={15} />
    <span>{label}</span>
  </button>
);

const FileExplorer = () => {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('grid'); // grid | list

  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#1a1a1f',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          background: '#202024',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <button style={toolBtn}><ArrowLeft size={14} /></button>
        <button style={toolBtn}><ArrowRight size={14} /></button>
        <button style={toolBtn}><RotateCcw size={13} /></button>
        <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        {/* Breadcrumb */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          padding: '3px 10px',
          fontSize: 12,
          color: 'rgba(255,255,255,0.75)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <Home size={12} style={{ flexShrink: 0 }} />
          <ChevronRight size={11} style={{ opacity: 0.5 }} />
          <span>Projects</span>
          {selectedProject && (
            <>
              <ChevronRight size={11} style={{ opacity: 0.5 }} />
              <span style={{ color: '#93c5fd' }}>{selectedProject.name}</span>
            </>
          )}
        </div>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          padding: '3px 8px',
        }}>
          <Search size={12} color="rgba(255,255,255,0.4)" />
          <input
            placeholder="Search projects..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 12,
              width: 130,
            }}
          />
        </div>
        {/* View toggle */}
        <button style={{ ...toolBtn, background: view === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent' }} onClick={() => setView('grid')}><LayoutGrid size={14} /></button>
        <button style={{ ...toolBtn, background: view === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent' }} onClick={() => setView('list')}><List size={14} /></button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 180,
            background: '#17171b',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', padding: '4px 10px', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Quick Access</div>
          <SidebarItem icon={Home} label="Home" onClick={() => setSelected(null)} active={!selected} />
          <SidebarItem icon={Star} label="Favourites" onClick={() => {}} />
          <SidebarItem icon={Clock} label="Recent" onClick={() => {}} />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 4px' }} />
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', padding: '4px 10px', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Projects</div>
          {projects.map((p) => (
            <SidebarItem
              key={p.id}
              icon={selected === p.id ? FolderOpen : Folder}
              label={p.name.split('—')[0].trim()}
              active={selected === p.id}
              onClick={() => setSelected(p.id)}
            />
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 4px' }} />
          <SidebarItem icon={HardDrive} label="Local Disk (C:)" onClick={() => {}} />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {!selectedProject ? (
            <>
              <h3 style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, margin: '0 0 12px', letterSpacing: 0.3 }}>
                My Projects
              </h3>
              <div
                style={{
                  display: view === 'grid' ? 'grid' : 'flex',
                  gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(150px, 1fr))' : undefined,
                  flexDirection: view === 'list' ? 'column' : undefined,
                  gap: 10,
                }}
              >
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelected(proj.id)}
                    style={{
                      padding: view === 'grid' ? '14px 12px' : '9px 14px',
                      borderRadius: 7,
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: view === 'list' ? 'flex' : 'block',
                      alignItems: view === 'list' ? 'center' : undefined,
                      gap: view === 'list' ? 12 : undefined,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(96,165,250,0.12)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                  >
                    <div style={{ fontSize: view === 'grid' ? 36 : 22, marginBottom: view === 'grid' ? 8 : 0 }}>📁</div>
                    <div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginBottom: 3 }}>{proj.name.split('—')[0].trim()}</div>
                      <span style={{
                        fontSize: 10,
                        background: proj.badgeColor + '33',
                        color: proj.badge === 'MERN + Paystack' ? '#4ade80' : proj.badge === 'React + Vite' ? '#60a5fa' : '#a78bfa',
                        border: `1px solid ${proj.badgeColor}66`,
                        padding: '1px 6px',
                        borderRadius: 10,
                      }}>{proj.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              {/* Folder Detail */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 36 }}>📂</span>
                <div>
                  <div style={{ fontSize: 15, color: '#fff', fontWeight: 600 }}>{selectedProject.name}</div>
                  <span style={{
                    fontSize: 11,
                    background: selectedProject.badgeColor + '33',
                    color: '#fff',
                    border: `1px solid ${selectedProject.badgeColor}66`,
                    padding: '2px 8px',
                    borderRadius: 10,
                  }}>{selectedProject.badge}</span>
                </div>
              </div>

              {/* Description */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8,
                padding: '12px 14px',
                marginBottom: 14,
              }}>
                <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                  {selectedProject.description}
                </p>
              </div>

              {/* Tech stack */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Tech Stack</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedProject.tech.map((t) => (
                    <span key={t} style={{
                      fontSize: 11,
                      background: 'rgba(96,165,250,0.1)',
                      color: '#93c5fd',
                      border: '1px solid rgba(96,165,250,0.2)',
                      padding: '3px 9px',
                      borderRadius: 12,
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Key Features</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {selectedProject.highlights.map((h) => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'rgba(255,255,255,0.75)' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Files */}
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Files</div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 7,
                    border: '1px solid rgba(255,255,255,0.07)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px', padding: '6px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                    {['Name', 'Size', 'Modified'].map((h) => (
                      <span key={h} style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{h}</span>
                    ))}
                  </div>
                  {selectedProject.files.map((file, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 80px 120px',
                        padding: '7px 14px',
                        borderBottom: i < selectedProject.files.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(96,165,250,0.07)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{file.icon}</span>
                        <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)' }}>{file.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{file.size}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{file.modified}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          padding: '3px 14px',
          background: '#202024',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          gap: 20,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          {selectedProject ? `${selectedProject.files.length} items` : `${projects.length} folders`}
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          {selectedProject ? selectedProject.badge : 'My Projects'}
        </span>
      </div>
    </div>
  );
};

const toolBtn = {
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.7)',
  cursor: 'pointer',
  borderRadius: 4,
  flexShrink: 0,
  transition: 'background 0.15s',
};

export default FileExplorer;
