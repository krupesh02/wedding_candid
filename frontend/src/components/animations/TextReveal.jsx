import { motion } from 'framer-motion';
import FadeUp from './FadeUp.jsx';

export default function TextReveal({ children, delay = 0, stagger = 0.04, className = "", style = {} }) {
  if (typeof children !== 'string') {
    return <FadeUp delay={delay} className={className}>{children}</FadeUp>;
  }

  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      style={{ perspective: '1000px', ...style }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{
            display: "inline-block",
            marginRight: "0.3em",
            transformOrigin: "bottom center",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
