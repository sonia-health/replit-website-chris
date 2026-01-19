import './App.css';
import { Mic, Clock, Shield } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Section from './components/Section';
import TestimonialsSection from './components/TestimonialsSection';
import Button from './components/Button';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navigation />

      <main>
        <HeroSection />

        {/* Why Section */}
        <Section id="why">
          <h2 className="section__title">Why Sonia exists</h2>
          <p className="section__text">
            Millions of people struggle with their mental health but can't access human support.
            The waiting lists are long, the costs are high, and the stigma is real.
          </p>
          <p className="section__text">
            Every human deserves access to help when they need it.{' '}
            <span className="section__text--large">We are building a resource for the rest of us.</span>
          </p>
        </Section>

        {/* Product Section */}
        <Section id="product" background="surface">
          <h2 className="section__title">Meet Sonia</h2>
          <p className="section__text">
            Sonia is a conversational AI companion specifically built for emotional support. Sonia offers voice- and text-based wellbeing sessions, and by using her therapeutic conceptualization that she builds on top of, she provides helpful content in form of meditations, journals, recommendations and exercises.
          </p>
          <p className="section__text">
            You can talk through what's on your mind, process your emotions and build skills — all through natural conversation.
          </p>
          <p className="section__text">
            Sonia's proprietary system is built on a foundation of cognitive behavioral therapy (CBT) and Acceptance and Commitment Therapy (ACT). This allows her to provide you with evidence-based interventions that are tailored to your specific needs.
          </p>
          <div className="product-features">
            <div className="product-feature">
              <div className="product-feature__icon product-feature__icon--sky">
                <Mic size={28} strokeWidth={1.5} />
              </div>
              <h3 className="product-feature__title">Voice-first</h3>
              <p className="product-feature__text">
                Sometimes you just need to talk it out. Sonia listens and responds
                naturally, like a conversation with a trusted friend.
              </p>
            </div>
            <div className="product-feature">
              <div className="product-feature__icon product-feature__icon--sage">
                <Clock size={28} strokeWidth={1.5} />
              </div>
              <h3 className="product-feature__title">Always available</h3>
              <p className="product-feature__text">
                Life doesn't wait for office hours. Sonia is there whenever you
                need support — day or night.
              </p>
            </div>
            <div className="product-feature">
              <div className="product-feature__icon product-feature__icon--lavender">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <h3 className="product-feature__title">Private & secure</h3>
              <p className="product-feature__text">
                Your conversations are yours. We take privacy seriously and protect
                your data with industry-leading security and HIPAA standards.
              </p>
            </div>
          </div>
          <div className="product-cta">
            <Button
              href="https://apps.apple.com/us/app/sonia-ai-emotional-support/id6472111765"
              variant="primary"
              size="large"
              external
            >
              Download Sonia
            </Button>
          </div>
        </Section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Research Section */}
        <Section id="research">
          <h2 className="section__title">Research partnerships</h2>
          <p className="section__text">
            We are committed to building the provably most effective AI solution for
            emotional support. We are actively pursuing research collaborations with leading
            academic institutions for clinical trials, real-world data analysis, and
            AI safety research.
          </p>
          <p className="section__text">
            If you're a researcher interested in studying AI-powered mental health
            support, reach out to our research team.
          </p>
          <div className="section-cta">
            <Button
              href="mailto:research@soniahealth.com"
              variant="secondary"
              size="medium"
            >
              Contact research team
            </Button>
          </div>
        </Section>

        {/* Partnerships Section */}
        <Section id="partnerships" background="surface">
          <h2 className="section__title">Enterprise partnerships</h2>
          <p className="section__text">
            We partner with various organizations to integrate Sonia into their workflows, products and services. Bring
            accessible emotional support to your employees, patients or customers.
          </p>
          <div className="section-cta">
            <Button
              href="mailto:info@soniahealth.com"
              variant="secondary"
              size="medium"
            >
              Get in touch
            </Button>
          </div>
        </Section>

        {/* Hiring Section */}
        <Section id="hiring">
          <div className="hiring-header">
            <h2 className="section__title">Join our team</h2>
            <img src="/yclogo.svg" alt="Y Combinator" className="yc-badge" />
          </div>
          <p className="section__text">
            We're hiring engineers, designers, psychologists and more. We raised capital from top investors including
            Y Combinator, the founders of Reddit, Instacart, Verkada, and many others.
          </p>
          <p className="section__text">
            We care about intelligence, curiosity and genuine kindness towards others. If you want to join
            us in San Francisco to contribute to the future of mental health support, we'd love to hear
            from you.
          </p>
          <div className="section-cta">
            <Button
              href="mailto:jobs@soniahealth.com"
              variant="primary"
              size="medium"
            >
              Reach out
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
