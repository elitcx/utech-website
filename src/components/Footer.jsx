import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <div className="footer-logo-img">
          <img src="/uploads/logo.png" alt="URSU Technology" />
        </div>
        <span className="footer-name">URSU TECHNOLOGY</span>
      </div>
      <ul className="footer-links">
        <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">Discord</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="footer-copy">© 2026 URSU TECHNOLOGY</div>
    </footer>
  );
}
