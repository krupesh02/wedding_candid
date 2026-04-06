import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';



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
      
      // Position within the grid cell with random "jitter"
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
  
  // Canvas motion values for drag + scroll-to-pan
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for scroll delta interaction
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    // Initial center position logic
    // A 300vw canvas, so center starts at -100vw, -100vh
    x.set(-window.innerWidth);
    y.set(-window.innerHeight);

    // Scroll wheel to pan logic
    const handleWheel = (e) => {
      if (selectedPhoto) return; // Disable panning if lightbox is open
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
        cursor: 'crosshair'
      }}
    >
      {/* Heads-Up Display Removed per User Request */}



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
          pointerEvents: 'none'
        }}
      >
        Click & Drag or Scroll to Explore Floor
      </motion.div>

      {/* The Immersive Draggable Canvas */}
      <motion.div
        drag
        dragElastic={0.05}
        dragTransition={{ power: 0.2, timeConstant: 250 }} // Weighted glide
        style={{
          width: `${CANVAS_SIZE}vw`,
          height: `${CANVAS_SIZE}vh`,
          position: 'absolute',
          x: springX,
          y: springY,
          cursor: 'grab',
          touchAction: 'none'
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {SCATTERED_PHOTOS.map((photo, i) => (
          <ImmersivePhoto 
            key={photo.id} 
            photo={photo} 
            index={i} 
            onClick={() => setSelectedPhoto(photo.src)} 
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
              zIndex: 1000, background: 'rgba(245, 241, 234, 0.98)', // Matches beige background
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out'
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
                maxWidth: '85vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Draggable 3D Item Component
function ImmersivePhoto({ photo, onClick, index }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // Loading Fallback: In case the image is very large or cached
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Individual Tilt Logic
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(useTransform(ty, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(tx, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 25 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    ty.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2, rotate: photo.rotation * 2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.5, delay: index * 0.02, ease: [0.33, 1, 0.68, 1] }}
      style={{
        position: 'absolute',
        top: `${photo.y}%`,
        left: `${photo.x}%`,
        width: `${12 * photo.scale}vw`,
        zIndex: Math.floor(photo.scale * 10),
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={() => { tx.set(0); ty.set(0); }}
        onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          style={{ 
            overflow: 'hidden', 
            borderRadius: '16px',
            background: 'var(--bg-secondary)',
            boxShadow: '0 20px 50px rgba(43, 43, 43, 0.1)',
            cursor: 'zoom-in',
            imageRendering: 'crisp-edges'
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
              width: '100%', height: 'auto', display: 'block',
              filter: isLoaded ? 'none' : 'blur(15px)',
              transition: 'filter 1.2s ease',
              rotate: photo.rotation, // Random card rotation for that "scattered floor" feel
              transform: 'translateZ(20px)'
            }}
          />

        </motion.div>
      </motion.div>
    </motion.div>
  );
}


