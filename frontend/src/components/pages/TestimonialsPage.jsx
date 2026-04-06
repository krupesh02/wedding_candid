import { useState, useEffect } from 'react';
import MarqueeText from '../MarqueeText.jsx';

const staticTestimonials = [
  { couple_names: 'Krishna & Omar', location: 'Jaipur', review: 'Aside from being absurdly good photographers, the team at Reverie quickly became our friends.', image: '/images/WC__7232.jpg' },
  { couple_names: 'Priyanka & Rishab', location: 'Mumbai', review: 'Reverie was absolutely amazing! We are beyond thrilled with how our wedding pictures turned out.', image: '/images/CB8A0155.jpg' },
  { couple_names: 'Meera & Aditya', location: 'Udaipur', review: 'Working with Reverie was an absolute dream. They captured our wedding beautifully.', image: '/images/WC__8428.jpg' },
  { couple_names: 'Fagun & Heer', location: 'Delhi', review: 'Despite it being a small gathering, the photographer personally came. Every image was beautifully shot.', image: '/images/IMG_4312.jpg' },
  { couple_names: 'Anisha & Brett', location: 'Goa', review: 'There are no words to describe our experience with Reverie. The final deliverables were beyond anything we imagined.', image: '/images/MBJ_5953.jpg' },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/api/testimonials/')
      .then(r => r.json())
      .then(data => { if (data.length) setTestimonials(data); })
      .catch(() => {});
  }, []);

  const t = testimonials[current];

  return (
    <div className="page-enter" style={{ marginTop: 'var(--header-height)' }}>
      <div className="section" style={{ textAlign: 'center' }}>
        <p className="section-label">What They Say</p>
        <h1 className="section-title">Client <em>Praise</em></h1>
        <div className="section-divider" style={{ margin: '20px auto' }}></div>
      </div>

      <MarqueeText texts={['Your Love Is Our Love', 'Frame Your Forever', 'Capturing Love In Every Shade']} />

      <div className="testimonials-section" style={{ background: 'transparent' }}>
        <div className="testimonial-slider">
          <div className="testimonial-image" style={{ width: '180px', height: '180px' }}>
            <img src={t.image} alt={t.couple_names} />
          </div>
          <p className="testimonial-quote" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>{t.review}</p>
          <h3 className="testimonial-couple">{t.couple_names}</h3>
          <p className="testimonial-location">{t.location}</p>
          <div className="testimonial-nav">
            <button className="testimonial-nav-btn" onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}>← Previous</button>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{current + 1} / {testimonials.length}</span>
            <button className="testimonial-nav-btn" onClick={() => setCurrent((current + 1) % testimonials.length)}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
