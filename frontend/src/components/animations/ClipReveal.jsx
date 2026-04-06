import { motion } from 'framer-motion';

export default function ClipReveal({ children, delay = 0, duration = 1, className = "" }) {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 20 }}
      whileInView={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
