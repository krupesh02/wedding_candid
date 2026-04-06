import { useState, useEffect } from 'react';

export default function useSplash() {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if session flag is already set (splash skipped)
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hasSeenSplash')) {
      setIsFinished(true);
      return;
    }

    const handleSplashFinished = () => {
      setIsFinished(true);
    };

    window.addEventListener('splash:finished', handleSplashFinished);
    return () => window.removeEventListener('splash:finished', handleSplashFinished);
  }, []);

  return isFinished;
}
