import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already seen splash in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      if (onFinish) onFinish();
      return;
    }

    // If not seen, show it
    setIsVisible(true);
    setShouldRender(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Mark as seen
      sessionStorage.setItem("hasSeenSplash", "true");

      setTimeout(() => {
        if (onFinish) onFinish();
      }, 1800);
    }, 4800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.6, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          <div className="noise"></div>

          {/* Large BG Monogram text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.08, scale: 1.05 }}
            transition={{ duration: 4.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '55vw',
              fontFamily: "'Great Vibes', cursive",
              color: '#c8af88',
              lineHeight: 0.8,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 0,
              userSelect: 'none'
            }}
          >
            W
          </motion.div>

          <motion.div
            className="glow"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1.3 }}
            transition={{ duration: 4 }}
          />

          {/* Golden Corner Framings */}
          <motion.div className="corner-frame top-left" initial={{ opacity: 0, x: -20, y: -20 }} animate={{ opacity: 0.6, x: 0, y: 0 }} transition={{ delay: 1, duration: 2 }} />
          <motion.div className="corner-frame top-right" initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 0.6, x: 0, y: 0 }} transition={{ delay: 1, duration: 2 }} />
          <motion.div className="corner-frame bottom-left" initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 0.6, x: 0, y: 0 }} transition={{ delay: 1, duration: 2 }} />
          <motion.div className="corner-frame bottom-right" initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 0.6, x: 0, y: 0 }} transition={{ delay: 1, duration: 2 }} />

          <motion.div
            className="content"
            initial={{ scale: 0.95 }}
            animate={{ scale: [0.95, 1.02, 1.08] }}
            exit={{
              scale: 15,
              opacity: 0,
              transition: { duration: 1.3, ease: [0.6, 0.05, -0.01, 0.9] }
            }}
            transition={{ duration: 4.5 }}
          >
            <motion.div
              className="logo"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{
                opacity: 1,
                scale: [1, 1.05, 1.15],
                y: [0, -10, 0],
              }}
              transition={{ duration: 4 }}
            >
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" style={{ overflow: 'visible' }}>
                {/* Drop shadow circle */}
                <circle cx="51" cy="51" r="42" fill="#757575" />
                {/* Blue background circle */}
                <circle cx="47" cy="47" r="42" fill="#2C449B" />

                {/* Outer lens ring */}
                <circle cx="47" cy="47" r="14" stroke="white" strokeWidth="2" fill="none" />
                {/* Inner lens ring */}
                <circle cx="47" cy="47" r="5" fill="#2C449B" stroke="white" strokeWidth="1.5" />

                {/* Iris blades */}
                <line x1="47" y1="33" x2="52" y2="44" stroke="white" strokeWidth="1.5" />
                <line x1="59" y1="40" x2="51" y2="49" stroke="white" strokeWidth="1.5" />
                <line x1="56" y1="58" x2="44" y2="52" stroke="white" strokeWidth="1.5" />
                <line x1="47" y1="61" x2="42" y2="50" stroke="white" strokeWidth="1.5" />
                <line x1="35" y1="54" x2="43" y2="45" stroke="white" strokeWidth="1.5" />
                <line x1="38" y1="36" x2="48" y2="41" stroke="white" strokeWidth="1.5" />

                {/* Camera Outline Array */}
                <path d="M 33 34 
                         C 21 34 17 40 17 48 
                         L 17 62 
                         C 17 71 21 75 29 75 
                         L 36 75 
                         C 41 75 44 66 47 63 
                         C 50 66 53 75 58 75 
                         L 65 75 
                         C 73 75 77 71 77 62 
                         L 77 48 
                         C 77 40 73 34 61 34"
                  stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Diamond on top edge */}
                <path d="M 42 20 L 52 20 L 55 24 L 47 32 L 39 24 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <line x1="39" y1="24" x2="55" y2="24" stroke="white" strokeWidth="1.5" />
                <line x1="44" y1="20" x2="47" y2="32" stroke="white" strokeWidth="1" />
                <line x1="50" y1="20" x2="47" y2="32" stroke="white" strokeWidth="1" />
              </svg>
            </motion.div>

            <motion.div
              className="brand"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px"
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8, alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  color: '#2C449B',
                  position: 'relative',
                  paddingRight: '20px',
                  fontWeight: 'bold'
                }}>
                  Wedd
                  <span style={{ position: 'relative' }}>i
                    <svg style={{ position: 'absolute', top: '-2px', left: '4px', width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="#757575">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                  ng
                </span>

                <span style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: '#757575',
                  marginTop: '-15px',
                  marginLeft: '40px',
                  position: 'relative',
                  fontWeight: 'bold'
                }}>
                  Cand
                  <span style={{ position: 'relative' }}>i
                    <svg style={{ position: 'absolute', top: '2px', left: '2px', width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="#2C449B">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                  d
                </span>
              </div>
            </motion.div>

            <motion.div
              className="line"
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              transition={{ delay: 2 }}
              style={{ marginTop: "20px" }}
            />

            <motion.p
              className="subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, letterSpacing: "8px" }}
              transition={{ delay: 2.3 }}
            >
              Photography & Films
            </motion.p>

            <motion.div
              className="light"
              initial={{ left: "-120%" }}
              animate={{ left: "220%" }}
              transition={{ duration: 2.8, delay: 1.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}