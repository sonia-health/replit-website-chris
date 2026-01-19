import { useEffect, useState, useRef } from 'react';
import Button from './Button';
import './HeroSection.css';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let wobbleOffset = { x: 0, y: 0 };
    let animationId: number;

    // Wobble animation
    const animateWobble = () => {
      const time = Date.now() * 0.002;
      wobbleOffset.x = Math.sin(time) * 15 + Math.sin(time * 1.3) * 10;
      wobbleOffset.y = Math.cos(time * 0.9) * 15 + Math.cos(time * 1.1) * 10;

      hero.style.setProperty('--mouse-x', `${mouseX + wobbleOffset.x}px`);
      hero.style.setProperty('--mouse-y', `${mouseY + wobbleOffset.y}px`);

      animationId = requestAnimationFrame(animateWobble);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(animateWobble);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
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
    <section id="hero" ref={heroRef} className={`hero ${isLoaded ? 'hero--loaded' : ''}`}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__fog" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__brand">
          <span className="hero__brand-name">Sonia</span>
        </div>
        <h1 className="hero__title">
          Your AI companion for emotional wellbeing
        </h1>
        <p className="hero__subtitle">
          Your partner to grow. Anytime and lifelong.
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
