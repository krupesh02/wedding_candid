import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';
import useSplash from '../hooks/useSplash';

export default function Header() {
  const isSplashFinished = useSplash();
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState('/');
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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

  const handleNavClick = () => {
    sessionStorage.setItem('skipNextSplash', 'true');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`header-horizontal ${scrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={isSplashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="header-container">
          {/* Left: Nav Links (desktop only) */}
          <nav className="header-nav-horizontal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link-horizontal ${pathname === link.href ? 'active' : ''}`}
                onClick={() => sessionStorage.setItem('skipNextSplash', 'true')}
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
            onClick={() => sessionStorage.setItem('skipNextSplash', 'true')}
          >
            <Logo />
          </a>

          {/* Right: Socials + Theme (desktop) + Hamburger (mobile) */}
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

            {/* Hamburger Button — mobile only */}
            <button
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <span className="hamburger-bar bar1"></span>
              <span className="hamburger-bar bar2"></span>
              <span className="hamburger-bar bar3"></span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <nav className="mobile-menu-nav">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  onClick={handleNavClick}
                >
                  <span className="mobile-nav-number">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mobile-menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <a href="https://instagram.com/framestories.in" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <span className="mobile-menu-dot">·</span>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
              <button
                onClick={toggleTheme}
                className="mobile-theme-btn"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? '◐ Dark' : '◑ Light'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
