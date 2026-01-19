import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <img src="/logosoniabora.svg" alt="Sonia" className="footer__logo" />
          <nav className="footer__links">
            <a href="/privacy.html" className="footer__link">Privacy</a>
            <a href="/terms.html" className="footer__link">Terms</a>
            <a href="mailto:info@soniahealth.com" className="footer__link">Contact</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="footer__tagline">support for the rest of us</p>
          <p className="footer__copyright">
            San Francisco / {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
