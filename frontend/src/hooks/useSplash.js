import { useState, useEffect } from 'react';

export default function useSplash() {
  const [isFinished, setIsFinished] = useState(() => {
    if (typeof window === 'undefined') return false;
    
    const shouldSkipOnce = sessionStorage.getItem('skipNextSplash');
    const wasAlreadySkipped = window.__SPLASH_SKIPPED__;
    
    if (shouldSkipOnce || wasAlreadySkipped) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const handleSplashFinished = () => {
      setIsFinished(true);
    };

    window.addEventListener('splash:finished', handleSplashFinished);
    return () => window.removeEventListener('splash:finished', handleSplashFinished);
  }, []);

  return isFinished;
}
