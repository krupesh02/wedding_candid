import { motion } from 'framer-motion';
import useSplash from '../../hooks/useSplash';

export default function ClipReveal({ children, delay = 0, duration = 1, className = "" }) {
  const isSplashFinished = useSplash();

  return (
    <motion.div
      initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 20 }}
      whileInView={isSplashFinished ? { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0 } : { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 20 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
