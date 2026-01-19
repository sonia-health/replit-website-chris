import { useEffect, useState } from 'react';
import Button from './Button';
import './HeroSection.css';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const whySection = document.getElementById('why');
    if (whySection) {
      const navHeight = 80;
      const elementPosition = whySection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className={`hero ${isLoaded ? 'hero--loaded' : ''}`}>
      <div className="hero__content">
        <div className="hero__brand">
          <img src="/logosoniabora.svg" alt="" className="hero__logo" />
          <span className="hero__brand-name">Sonia</span>
        </div>
        <h1 className="hero__title">
          Your AI companion for emotional wellbeing
        </h1>
        <p className="hero__subtitle">
          Your partner to grow, anytime and lifelong.
        </p>
        <div className="hero__cta">
          <Button
            href="https://apps.apple.com/us/app/sonia-ai-emotional-support/id6472111765"
            variant="primary"
            size="large"
            external
          >
            Download the app
          </Button>
        </div>
      </div>

      <button
        className="hero__scroll-indicator"
        onClick={scrollToContent}
        aria-label="Scroll to content"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}
