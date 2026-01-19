import { useState, useEffect } from 'react';
import './Navigation.css';

const navLinks = [
  { id: 'why', label: 'Why' },
  { id: 'product', label: 'Product' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'research', label: 'Research' },
  { id: 'partnerships', label: 'Partnerships' },
  { id: 'hiring', label: 'Careers' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`navigation ${isScrolled ? 'navigation--scrolled' : ''} ${isMenuOpen ? 'navigation--menu-open' : ''}`}>
      <nav className="navigation__inner">
        <a href="#hero" className="navigation__logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <img src="/sonia-logo-light.svg" alt="Sonia" className="navigation__logo-img" />
        </a>

        {/* Desktop Navigation */}
        <ul className="navigation__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="navigation__link"
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={`navigation__menu-btn ${isMenuOpen ? 'navigation__menu-btn--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="navigation__menu-line" />
          <span className="navigation__menu-line" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`navigation__overlay ${isMenuOpen ? 'navigation__overlay--open' : ''}`}>
        <ul className="navigation__mobile-links">
          {navLinks.map((link, index) => (
            <li key={link.id} style={{ transitionDelay: `${index * 50}ms` }}>
              <a
                href={`#${link.id}`}
                className="navigation__mobile-link"
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
