import { motion } from 'framer-motion';
import useSplash from '../../hooks/useSplash';

export default function ImageReveal({ children, delay = 0 }) {
  const isSplashFinished = useSplash();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={isSplashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="image-reveal-wrapper"
    >
      {children}
    </motion.div>
  );
}
