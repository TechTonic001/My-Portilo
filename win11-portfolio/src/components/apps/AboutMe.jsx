const AboutMe = () => {
  const content = `About Me - Notepad
==========================================

Name: [Your Name]
Role: Software Engineer
Last Modified: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

==========================================
EDUCATION & QUALIFICATIONS
==========================================

O Level (WAEC/NECO)
--------------------
  Status    : Completed
  Subjects  : Mathematics, English Language,
              Physics, Chemistry, Economics,
              Biology, Government, Lit-in-English,
              Agricultural Science, CRS
  Result    : Credit & Above in core subjects

National Diploma (ND) — IN PROGRESS
-------------------------------------
  Institution : SQI College of ICT
  Program     : Computer Science / ICT
  Level       : ND (National Diploma)
  Status      : Currently Enrolled
  Focus       : Software Development, Databases,
                Networking, Web Technologies


==========================================
PROFESSIONAL BACKGROUND
==========================================

I am a passionate and driven software engineer
with a solid foundation in modern web development
technologies. My journey into tech started with
curiosity and grew into a full-blown career path.

Core Expertise:
  * Full-Stack Web Development (MERN Stack)
  * Database Design & Management
    - PostgreSQL (Relational, advanced queries,
      indexing, and normalization)
    - MySQL (Schema design, stored procedures,
      performance optimization)
    - MongoDB (NoSQL, flexible document models)
  * RESTful API Design & Integration
  * Payment Gateway Integration (Paystack)
  * Version Control with Git & GitHub
  * Responsive UI/UX Design

Languages & Tools:
  * JavaScript (ES6+), TypeScript
  * React.js, Node.js, Express.js
  * HTML5, CSS3, Tailwind CSS
  * Postman, VS Code, Figma


==========================================
FEATURED PROJECT: RENT TRACKING SYSTEM
==========================================

Project Name  : RentFlow — MERN Stack Rent Tracker
Stack         : MongoDB · Express.js · React.js · Node.js
Payment       : Paystack Payment Gateway Integration
Database      : PostgreSQL (primary data store)
               MySQL (reporting & analytics)

Description:
  A full-featured web application designed to
  help landlords and property managers track
  rent payments, manage tenants, and generate
  financial reports.

Key Features:
  [✓] Tenant registration & profile management
  [✓] Automated rent invoicing system
  [✓] Paystack integration for secure online
      rent payments (cards, bank transfer, USSD)
  [✓] Real-time payment verification via webhooks
  [✓] Rent history & receipt generation (PDF)
  [✓] Dashboard with analytics & overdue alerts
  [✓] Multi-property support for landlords
  [✓] Role-based access (Admin / Tenant)
  [✓] PostgreSQL for transactional data integrity
  [✓] MySQL for historical reporting queries

Status: In Active Development


==========================================
DATABASE MANAGEMENT SKILLS
==========================================

PostgreSQL:
  - Advanced schema design & normalization (3NF)
  - Complex JOINs, CTEs, and window functions
  - Indexing strategies for performance
  - Transaction management & ACID compliance
  - Used extensively in the RentFlow project

MySQL:
  - Relational database design & optimization
  - Stored procedures & triggers
  - Query optimization & EXPLAIN analysis
  - Reporting databases & analytical queries

MongoDB:
  - Document-based data modeling
  - Aggregation pipelines
  - Integration with Mongoose ODM


==========================================
GOALS & ASPIRATIONS
==========================================

  My mission is to complete my ND program at
  SQI College of ICT and continue building
  production-ready software solutions that
  solve real-world problems across Nigeria
  and beyond.

  Currently seeking: Internship opportunities,
  open-source contributions, and freelance
  software development projects.


==========================================
  [End of File]
==========================================
`;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#1e1e1e',
        fontFamily: '"Consolas", "Courier New", monospace',
      }}
    >
      {/* Notepad Menu Bar */}
      <div
        style={{
          display: 'flex',
          gap: 2,
          padding: '4px 8px',
          background: '#2d2d30',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
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
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Text Content */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px 20px',
        }}
      >
        <pre
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.65,
            color: '#d4d4d4',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: '"Consolas", "Courier New", monospace',
          }}
        >
          {content}
        </pre>
      </div>

      {/* Status Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 20,
          padding: '3px 12px',
          background: '#007acc',
          borderTop: '1px solid rgba(0,0,0,0.3)',
          flexShrink: 0,
        }}
      >
        {['Ln 1, Col 1', '100%', 'UTF-8', 'CRLF', 'Plain Text'].map((item) => (
          <span key={item} style={{ fontSize: 11, color: '#fff', opacity: 0.9 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
