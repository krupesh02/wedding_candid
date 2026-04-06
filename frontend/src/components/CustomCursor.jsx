import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updatePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLink =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');
      
      const isImage =
        target.closest('.portfolio-item') ||
        target.closest('.portfolio-card') ||
        target.closest('.carousel-slide-main') ||
        target.closest('.film-card') ||
        target.closest('.instagram-item');

      setIsHovering(!!isLink || !!isImage);
      setIsImageHover(!!isImage);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.innerWidth < 769) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x,
          y,
          width: isHovering ? 60 : 10,
          height: isHovering ? 60 : 10,
          borderRadius: '50%',
          border: isHovering ? 'none' : '1.5px solid var(--text-primary)',
          backgroundColor: isHovering ? 'var(--text-primary)' : 'transparent',
          opacity: isHovering ? 0.12 : 1,
          translateX: isHovering ? -30 : -5,
          translateY: isHovering ? -30 : -5,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {isImageHover && (
        <motion.span
          className="cursor-view-label"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, translateX: -12, translateY: -8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      )}
    </>
  );
}
