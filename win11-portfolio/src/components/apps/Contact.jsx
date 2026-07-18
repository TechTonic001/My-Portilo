import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    // Since there's no backend, show error like the reference
    setStatus('error');
    showToast('Failed to send. Try again.', 'error');
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#18181c',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 28px' }}>
        <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: '0 0 6px' }}>
          Get In Touch
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12.5, margin: '0 0 24px', lineHeight: 1.6 }}>
          Have a project in mind? Let's talk.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Row 1: Name + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <Field label="NAME" id="contact-name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} type="text" />
            <Field label="EMAIL" id="contact-email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} type="email" />
          </div>

          {/* Subject */}
          <div style={{ marginBottom: 14 }}>
            <Field label="SUBJECT" id="contact-subject" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange} type="text" />
          </div>

          {/* Message */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 6 }}>MESSAGE</div>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 7,
                color: '#fff',
                fontSize: 13,
                fontFamily: '"Segoe UI", system-ui, sans-serif',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="contact-submit"
            disabled={status === 'sending'}
            style={{
              width: '100%',
              padding: '12px',
              background: status === 'sending' ? 'rgba(59,130,246,0.5)' : '#3b82f6',
              border: 'none',
              borderRadius: 7,
              color: '#fff',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              fontFamily: '"Segoe UI", system-ui, sans-serif',
              transition: 'background 0.2s',
              letterSpacing: 0.3,
            }}
            onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#2563eb'; }}
            onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = '#3b82f6'; }}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          padding: '10px 16px',
          background: toast.type === 'error' ? '#7f1d1d' : '#14532d',
          border: `1px solid ${toast.type === 'error' ? '#ef4444' : '#22c55e'}`,
          borderRadius: 8,
          color: '#fff',
          fontSize: 12.5,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.3s ease',
          zIndex: 100,
        }}>
          {toast.type === 'error' ? '✕ ' : '✓ '}{toast.msg}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, id, name, placeholder, value, onChange, type }) => (
  <div>
    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 6 }}>
      {label}
    </div>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px 14px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 7,
        color: '#fff',
        fontSize: 13,
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)'}
      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
    />
  </div>
);

export default Contact;
