import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ALL_PHOTOS = [
  '/images/1M4A8828.jpg',
  '/images/CB8A0155.jpg',
  '/images/CB8A0325.jpg',
  '/images/DJI_20241209172706_0093_D_FLYCAPTURE.jpg',
  '/images/IMG_4312.jpg',
  '/images/MBJ_5953.jpg',
  '/images/SSP01330.JPG',
  '/images/WC_13299.jpg',
  '/images/WC_17354.JPG',
  '/images/WC_17407.JPG',
  '/images/WC_19833.jpg',
  '/images/WC__5748.jpg',
  '/images/WC__6391.jpg',
  '/images/WC__7232.jpg',
  '/images/WC__8428.jpg',
];

export default function GalleryPage() {
  const containerRef = useRef(null);

  // Advanced Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const col2Y = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);
  const col3Y = useTransform(scrollYProgress, [0, 1], ['-10%', '15%']);

  // Split photos into 3 columns
  const col1 = ALL_PHOTOS.filter((_, i) => i % 3 === 0);
  const col2 = ALL_PHOTOS.filter((_, i) => i % 3 === 1);
  const col3 = ALL_PHOTOS.filter((_, i) => i % 3 === 2);

  return (
    <div className="page-enter" style={{ minHeight: '100vh', marginTop: 'var(--header-height)' }}>
      
      {/* Intro Section */}
      <div className="section" style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="section-label"
        >
          Visual Poetry
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          className="section-title"
          style={{ marginBottom: '20px' }}
        >
          The <em>Gallery</em>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="section-subtitle" 
          style={{ margin: '0 auto' }}
        >
          A curated collection of fleeting moments, transformed into timeless heirlooms.
        </motion.p>
      </div>

      {/* Gallery Grid Container */}
      <div 
        ref={containerRef} 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 'clamp(20px, 4vw, 40px)', 
          padding: '0 var(--side-pad) 120px',
          alignItems: 'start'
        }}
      >
        {/* Column 1 */}
        <motion.div style={{ y: col1Y, display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 40px)' }}>
          {col1.map((src, i) => (
            <GalleryImage key={i} src={src} delay={0.1 + i * 0.1} />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: col2Y, display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 40px)' }}>
          {col2.map((src, i) => (
            <GalleryImage key={i} src={src} delay={0.2 + i * 0.1} />
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: col3Y, display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 40px)' }}>
          {col3.map((src, i) => (
            <GalleryImage key={i} src={src} delay={0.3 + i * 0.1} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Individual Hover Image Component
function GalleryImage({ src, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      style={{ overflow: 'hidden', position: 'relative', width: '100%', background: 'var(--bg-secondary)' }}
      className="gallery-image-hover"
    >
      <motion.img 
        src={src} 
        alt="Gallery Moment" 
        style={{ width: '100%', height: 'auto', display: 'block' }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />
    </motion.div>
  );
}
