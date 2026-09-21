import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tabLogo from '../assets/TAB-LOGO.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Lock scroll when mobile menu is active
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        {/* Logo Section */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="icon">
            {/* &lt;/&gt; */}

              <img src={tabLogo} alt="Developer logo" />

          </div>
          <span>_DEV.PRANAV____</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/skills" className="nav-link">Skills</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Action Button & Hamburger */}
        <div className="nav-actions">
          <Link to="/contact" className="nav-button desktop-only">
            Let's Build ↗
          </Link>
          
          <button 
            className={`hamburger ${isOpen ? 'active' : ''}`} 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Special Reveal Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <Link to="/home" className="mobile-link" onClick={closeMenu}>Home</Link>
          <Link to="/skills" className="mobile-link" onClick={closeMenu}>Skills</Link>
          <Link to="/projects" className="mobile-link" onClick={closeMenu}>Projects</Link>
          <Link to="/contact" className="mobile-link" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
