import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const prevIndex = (current - 1 + slides.length) % slides.length;
  const nextIndex = (current + 1) % slides.length;

  if (!slides || slides.length === 0) return null;

  return (
    <div className="hero-carousel" id="hero-carousel">
      <div className="carousel-container">
        <div className="carousel-slide-peek left" onClick={prev}>
          <img src={slides[prevIndex].cover_image} alt="Previous" />
        </div>

        <a href={`/portfolio/${slides[current].slug}`} className="carousel-slide-main" style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.img
              key={current}
              src={slides[current].cover_image}
              alt={slides[current].couple_names}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AnimatePresence>
        </a>

        <div className="carousel-slide-peek right" onClick={next}>
          <img src={slides[nextIndex].cover_image} alt="Next" />
        </div>

        <div className="carousel-caption">
          <strong>{slides[current].couple_names}</strong>, {slides[current].location} — {slides[current].date}
        </div>

        <div className="carousel-nav">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
