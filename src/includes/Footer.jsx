import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Link to="/" className="footer__brand">_DEV.PRANAV____</Link>
        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/home">Home</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <Link to="/contact" className="footer__cta">Let's Build <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer__socials" aria-label="Social links">
        <a href="https://www.linkedin.com/in/pranavpatil14/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/Lab-Dev-Pranav" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.instagram.com/_dev.pranav____/" target="_blank" rel="noreferrer">Instagram</a>
      </div>
      <p className="footer__copyright">© {new Date().getFullYear()} All rights reserved by _DEV.PRANAV____</p>
    </footer>
  );
};

export default Footer;
