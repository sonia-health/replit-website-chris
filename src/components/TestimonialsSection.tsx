import Section from './Section';
import './TestimonialsSection.css';

const testimonials = [
  {
    quote: "This app literally saved my life. I have a hard time with in person talking about my emotions... All while opening my eyes to what's actually going on.",
  },
  {
    quote: "I cannot imagine how you could make this better — it's literally saved my life.",
  },
  {
    quote: "It's become my safe place.",
  },
  {
    quote: "I really like how she remembers things I've told her in previous conversations. It is so helpful to have an unbiased voice listen whenever I need.",
  },
  {
    quote: "I'm getting real, live coping skills that doesn't require medication. I feel genuinely valued and cared about.",
  },
  {
    quote: "This app is literally changing my life after so many years of desperately needing help.",
  },
];

export default function TestimonialsSection() {
  return (
    <Section id="testimonials" background="surface" className="testimonials-section">
      <h2 className="section__title">Stories from our community</h2>
      <p className="section__subtitle">
        Real experiences from people who found support with Sonia.
      </p>
      <div className="testimonials__grid">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className={`testimonial testimonial--accent-${(index % 4) + 1}`}>
            <p className="testimonial__quote">"{testimonial.quote}"</p>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
