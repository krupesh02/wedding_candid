import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeUp from './animations/FadeUp.jsx';
import TextReveal from './animations/TextReveal.jsx';

export default function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const t = testimonials[current];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="testimonials-section" id="testimonials-section">
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <FadeUp yOffset={20}>
          <p className="section-label" style={{ textAlign: 'center' }}>What They Say</p>
        </FadeUp>
        <TextReveal className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
          Client <em>Praise</em>
        </TextReveal>
      </div>

      <div className="testimonial-slider" style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="testimonial-image">
              <img src={t.image} alt={t.couple_names} />
            </div>

            <p className="testimonial-quote">{t.review}</p>

            <h3 className="testimonial-couple">{t.couple_names}</h3>
            <p className="testimonial-location">{t.location}</p>
          </motion.div>
        </AnimatePresence>

        <div className="testimonial-nav">
          <button className="testimonial-nav-btn" onClick={prev}>
            ← Previous
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            {current + 1} / {testimonials.length}
          </span>
          <button className="testimonial-nav-btn" onClick={next}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
