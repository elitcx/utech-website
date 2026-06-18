import { CONTACT_URL } from '../config/signup';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <div className="footer-logo-img">
          <img src="/uploads/logo.png" alt="URSU Technology" />
        </div>
        <span className="footer-name">URSULINE TECHNOLOGY</span>
      </div>
      <ul className="footer-links">
        <li><a href="https://www.instagram.com/ursutech/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://github.com/elitcx/utech-website" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Contact</a></li>
      </ul>
      <div className="footer-copy-block">
        <div className="footer-copy">© 2026 URSU TECHNOLOGY</div>
        <div className="footer-copy">MADE BY KENNETH JEHEZKIEL MARVEL WIJAYA | IG: @kenneth_kiel</div>
      </div>
    </footer>
  );
}
