import { motion } from 'framer-motion';
import useSplash from '../../hooks/useSplash';

export default function FadeUp({ children, delay = 0, duration = 0.8, yOffset = 40, className = "" }) {
  const isSplashFinished = useSplash();

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={isSplashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
