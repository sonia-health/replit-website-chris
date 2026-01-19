import { Linkedin, Instagram } from "lucide-react";
import "./Footer.css";

// X (Twitter) icon - not available in lucide-react
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <img src="/sonia-logo.svg" alt="Sonia" className="footer__logo" />
          <nav className="footer__links">
            <a href="/privacy.html" className="footer__link">Privacy</a>
            <a href="/terms.html" className="footer__link">Terms</a>
            <a href="mailto:info@soniahealth.com" className="footer__link">Contact</a>
          </nav>
        </div>
        <div className="footer__social">
          <a
            href="https://www.linkedin.com/company/sonia-health/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/Sonia_Health"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="X (Twitter)"
          >
            <XIcon size={20} />
          </a>
          <a
            href="https://www.instagram.com/talktosonia/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
        <div className="footer__bottom">
          <p className="footer__tagline">emotional support for the rest of us</p>
          <p className="footer__copyright">
            San Francisco / {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
