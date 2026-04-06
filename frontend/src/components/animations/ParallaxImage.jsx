import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxImage({ src, alt, speed = 0.5, className = "", imgClassName = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.15, 1.2]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{
          y,
          scale,
          transformOrigin: 'center',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
