import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import useSplash from '../hooks/useSplash';

export default function Header() {
  const isSplashFinished = useSplash();
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState('/');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setPathname(window.location.pathname);

    const saved = localStorage.getItem('fs-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fs-theme', next);
  };

  const navLinks = [
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'FILMS', href: '/films' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/enquire' },
  ];

  return (
    <motion.header
      className={`header-horizontal ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={isSplashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="header-container">
        {/* Left: Nav Links */}
        <nav className="header-nav-horizontal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link-horizontal ${pathname === link.href ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Center: Logo */}
        <a 
          href="/" 
          className="header-logo-center" 
          style={{ textDecoration: 'none' }}
          onClick={() => sessionStorage.removeItem("hasSeenSplash")}
        >
          <Logo />
        </a>

        {/* Right: Socials + Theme */}
        <div className="header-utils">
          <div className="header-social-links">
            <a
              href="https://instagram.com/framestories.in"
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-link"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-link"
            >
              YouTube
            </a>
          </div>
          <button
            onClick={toggleTheme}
            className="theme-btn-minimal"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '◐' : '◑'}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
