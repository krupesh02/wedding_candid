export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      {/* Left: Nav Links */}
      <div className="footer-social">
        <a href="/portfolio">Portfolio</a>
        <a href="/about">About</a>
        <a href="/enquire">Contact</a>
      </div>

      {/* Center: Copyright */}
      <div className="footer-center">
        <span className="footer-copyright">
          {new Date().getFullYear()} © Wedding Candids
        </span>
      </div>

      {/* Right: Social */}
      <div className="footer-social" style={{ justifyContent: 'flex-end' }}>
        <a href="https://instagram.com/framestories.in" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
      </div>
    </footer>
  );
}
