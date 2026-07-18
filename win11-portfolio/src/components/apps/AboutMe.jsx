const AboutMe = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '40px 24px',
        textAlign: 'center',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        fontWeight: 700,
        color: '#fff',
        marginBottom: 20,
        boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
      }}>
        TT
      </div>

      {/* Name */}
      <h1 style={{
        margin: '0 0 8px',
        fontSize: 22,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: -0.3,
      }}>
        TechTonic
      </h1>

      {/* Bio */}
      <p style={{
        margin: '0 0 20px',
        fontSize: 13.5,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.7,
        maxWidth: 400,
      }}>
        Full-stack developer passionate about building beautiful,
        performant web experiences. Specialising in React,
        Node.js, and modern UI systems.
      </p>

      {/* Status badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 16px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        fontSize: 12.5,
        color: 'rgba(255,255,255,0.75)',
      }}>
        <div style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 6px #22c55e',
          flexShrink: 0,
        }} />
        <span style={{ opacity: 0.5 }}>Currently:</span>
        <span style={{ fontWeight: 600 }}>Building Portfolio</span>
      </div>

      {/* Details */}
      <div style={{
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        maxWidth: 440,
      }}>
        {[
          { label: 'Institution', val: 'SQI College of ICT' },
          { label: 'Program', val: 'ND Computer Science / ICT' },
          { label: 'Speciality', val: 'MERN Stack + PostgreSQL + MySQL' },
          { label: 'Featured Project', val: 'RentFlow — MERN Rent Tracker (Paystack)' },
        ].map(({ label, val }) => (
          <div key={label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8,
            fontSize: 12.5,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
            <span style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
