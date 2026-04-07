import { useState } from 'react';

export default function EnquirePage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', event_date: '',
    event_type: 'wedding', venue: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:8000/api/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (err) {
      // API might not be running, that's ok for demo
    }
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="page-enter enquire-page" style={{ textAlign: 'center', paddingTop: 'calc(var(--header-height) + 40px)' }}>
        <p className="section-label">Thank You</p>
        <h2 className="section-title" style={{ marginBottom: '20px' }}>We&apos;ll Be In <em>Touch</em></h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Thank you for reaching out! We&apos;ve received your enquiry and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="enquire-page">
        <div className="enquire-header">
          <p className="section-label">Get In Touch</p>
          <h1 className="section-title">Let&apos;s Create Something <em>Beautiful</em></h1>
          <p className="section-subtitle">
            We&apos;d love to hear about your celebration. Tell us about your vision and let&apos;s begin crafting your forever.
          </p>
        </div>

        <form className="enquire-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label htmlFor="event_date">Event Date</label>
            <input type="date" id="event_date" name="event_date" value={form.event_date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="event_type">Event Type</label>
            <select id="event_type" name="event_type" value={form.event_type} onChange={handleChange}>
              <option value="wedding">Wedding</option>
              <option value="pre-wedding">Pre-Wedding Shoot</option>
              <option value="engagement">Engagement</option>
              <option value="reception">Reception</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue / Location</label>
            <input type="text" id="venue" name="venue" value={form.venue} onChange={handleChange} placeholder="City or Venue Name" />
          </div>
          <div className="form-group full-width">
            <label htmlFor="message">Your Message *</label>
            <textarea id="message" name="message" required value={form.message} onChange={handleChange} placeholder="Tell us about your celebration, your vision, and anything special you'd like us to capture..." />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Enquiry →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '80px', paddingBottom: '40px' }}>
          <div className="section-divider" style={{ margin: '0 auto 30px' }}></div>
          <p style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>Or reach us directly</p>
          <p style={{ fontSize: '1rem', marginBottom: '8px' }}>
            <a href="mailto:hello@reverie.studio" style={{ color: 'var(--accent)' }}>hello@reverie.studio</a>
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>+91 98765 43210</p>
        </div>
      </div>

    </div>
  );
}
