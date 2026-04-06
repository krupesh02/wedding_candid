import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxColumn({ children, speed = 0.1, className = "" }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 1000]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ y }}
      className={`masonry-column ${className}`}
    >
      {children}
    </motion.div>
  );
}
