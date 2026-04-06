import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('fs-theme') || 'light';
    setTheme(saved);
  }, []);

  const toggleTheme = (mode) => {
    setTheme(mode);
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('fs-theme', mode);
  };

  return (
    <div className="theme-toggle">
      <button
        className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => toggleTheme('light')}
      >
        Light
      </button>
      <span className="theme-toggle-divider">|</span>
      <button
        className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => toggleTheme('dark')}
      >
        Dark
      </button>
    </div>
  );
}
