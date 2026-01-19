import { useEffect, useRef, useState } from 'react';
import './Section.css';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'surface';
}

export default function Section({
  id,
  children,
  className = '',
  background = 'default',
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section section--${background} ${isVisible ? 'section--visible' : ''} ${className}`}
    >
      <div className="section__container">
        {children}
      </div>
    </section>
  );
}
