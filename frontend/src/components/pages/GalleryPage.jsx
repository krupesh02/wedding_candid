import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Configuration for the "Infinite Floor"
const CANVAS_SIZE = 300; // 300% of viewport

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

// Randomized photo generation using a Jittered Grid to prevent clustering/sticking
const generateScatteredPhotos = () => {
  const scattered = [];
  const rows = 10;
  const cols = 8;
  const cellWidth = 90 / cols;
  const cellHeight = 90 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const src = ALL_PHOTOS[i % ALL_PHOTOS.length];
      
      const x = 5 + (c * cellWidth) + (Math.random() * cellWidth * 0.6);
      const y = 5 + (r * cellHeight) + (Math.random() * cellHeight * 0.6);

      scattered.push({
        id: `photo-${i}`,
        src,
        x,
        y,
        scale: 0.6 + Math.random() * 0.8,
        rotation: Math.random() * 40 - 20,
        depth: 0.5 + Math.random() * 0.8,
      });
    }
  }
  return scattered;
};

const SCATTERED_PHOTOS = generateScatteredPhotos();

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Canvas motion values for drag + scroll-to-pan
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-end weighted springs for a more "lush" panning feel
  const springX = useSpring(x, { stiffness: 60, damping: 25, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 60, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    // Detect mobile/touch
    const mobile = 'ontouchstart' in window || window.innerWidth <= 768;
    setIsMobile(mobile);

    // Initial center position
    x.set(-window.innerWidth);
    y.set(-window.innerHeight);

    // Scroll wheel to pan (desktop only)
    const handleWheel = (e) => {
      if (selectedPhoto) return;
      x.set(x.get() - e.deltaX);
      y.set(y.get() - e.deltaY);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [selectedPhoto]);

  return (
    <div
      className="page-enter"
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg-primary)',
        cursor: 'crosshair',
      }}
    >
      {/* Floating Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          color: 'var(--text-muted)',
        }}
      >
        {isMobile ? 'Touch & Drag to Explore' : 'Click & Drag or Scroll to Explore'}
      </motion.div>

      {/* The Immersive Draggable Canvas */}
      <motion.div
        drag
        dragElastic={0.06}
        dragTransition={{ power: 0.3, timeConstant: 300 }}
        style={{
          width: `${CANVAS_SIZE}vw`,
          height: `${CANVAS_SIZE}vh`,
          position: 'absolute',
          x: springX,
          y: springY,
          cursor: 'grab',
          touchAction: 'none',
          willChange: 'transform',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {SCATTERED_PHOTOS.map((photo, i) => (
          <ImmersivePhoto
            key={photo.id}
            photo={photo}
            index={i}
            onClick={() => setSelectedPhoto(photo.src)}
            isMobile={isMobile}
          />
        ))}
      </motion.div>

      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              zIndex: 1000,
              background: 'rgba(245, 241, 234, 0.98)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: isMobile ? '16px' : '30px',
            }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedPhoto}
              alt="Fullscreen View"
              style={{
                maxWidth: isMobile ? '95vw' : '85vw',
                maxHeight: isMobile ? '82vh' : '85vh',
                objectFit: 'contain',
                boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
              }}
            />
            {/* Close hint */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '80px' : '20px',
              right: '20px',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              opacity: 0.7,
            }}>
              {isMobile ? 'Tap to close' : 'Click to close'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Draggable 3D Item Component
function ImmersivePhoto({ photo, onClick, index, isMobile }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Individual Tilt Logic (desktop only)
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(useTransform(ty, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(tx, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 25 });

  function handleMouse(e) {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    ty.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  }

  // On mobile, make photos bigger so they are actually visible
  const photoWidth = isMobile
    ? `${Math.max(22, 18 * photo.scale)}vw`
    : `${12 * photo.scale}vw`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100, rotate: photo.rotation * 3 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{
        duration: 2,
        delay: index * 0.015,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: 'absolute',
        top: `${photo.y}%`,
        left: `${photo.x}%`,
        width: photoWidth,
        zIndex: Math.floor(photo.scale * 10),
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouse}
        onMouseLeave={() => { if (!isMobile) { tx.set(0); ty.set(0); } }}
        onClick={onClick}
        style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          style={{
            overflow: 'hidden',
            borderRadius: isMobile ? '10px' : '16px',
            background: 'var(--bg-secondary)',
            boxShadow: '0 20px 50px rgba(43, 43, 43, 0.1)',
            cursor: 'zoom-in',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 30px 80px rgba(197, 164, 109, 0.2)' }}
        >
          {!isLoaded && (
            <div style={{ position: 'absolute', inset: 0, filter: 'blur(10px)', background: 'var(--bg-secondary)' }} />
          )}

          <motion.img
            src={photo.src}
            alt="Gallery Moment"
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: isLoaded ? 'none' : 'blur(15px)',
              transition: 'filter 1.2s ease',
              rotate: photo.rotation,
              transform: 'translateZ(20px)',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}