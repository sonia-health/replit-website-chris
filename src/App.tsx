
import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import MenuButton from './components/MenuButton'
import Footer from './components/Footer'

export type Tab = 'why' | 'hiring' | 'sonia' | 'research' | 'partnerships';

export default function App() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('sonia');
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [contentHeight, setContentHeight] = useState('auto');

  const tabContent = {
    why: "Millions of people struggle with their mental health but can’t access a therapist. We’re not trying to replace the Tuesday 4 pm in-person human therapy session. Our aim is to build something for people who would otherwise suffer alone on Tuesday at 4 pm. Or 4 am. Or any other time.",
    hiring: "We’re hiring engineers and psychologists. We recently raised $3.5m from Y Combinator, the founders of Reddit, Instacart, Verkada and many others. We care about intelligence, hard work and kindness. Email jobs@soniahealth.com if you want to join us in San Francisco to make people happier at scale.",
    sonia: "Sonia is a conversational AI for emotional support that offers voice based wellbeing sessions. Download the free research preview to try it out.",
    research: "Our sole focus is to build the provably most effective AI solution for emotional support. We are actively pursuing research collaborations with academic institutions for clinical trials, real-world data analysis and other research. Please reach out to research@soniahealth.com to collaborate.",
    partnerships: "In select cases we partner with employers and healthcare organizations to offer Sonia as a mobile app, API or white-label solution. Please reach out to info@soniahealth.com for more information."
  };

  const handleTabChange = async (tab: Tab) => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      setIsContentVisible(false);
      await new Promise(resolve => setTimeout(resolve, 50));
      setIsMenuOpen(false);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentTab(tab);
      // Small delay to ensure content switch happens after menu animation
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsContentVisible(true);
    } else {
      // Desktop animation sequence
      setIsContentVisible(false);
      setIsButtonVisible(false);
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentTab(tab);
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsContentVisible(true);
      setIsButtonVisible(true);
    }
  };

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
      setTimeout(() => {
        setShowLogo(false);
        setTimeout(() => {
          setShowContent(true);
        }, 300);
      }, 500);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <main className={`${isAnimated ? 'animated' : ''}`}>
      <img 
        src="/logosoniacoconut.svg" 
        alt="Sonia Logo" 
        className={`logo ${!showLogo ? 'hidden' : ''}`} 
      />
      <div className={`content ${showContent ? 'visible' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <NavBar onTabChange={handleTabChange} currentTab={currentTab} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="content-area">
          <div className={`content-wrapper ${!isContentVisible ? 'shrunk' : ''}`}>
            {currentTab === 'sonia'}
            <div className="content-text">
              {tabContent[currentTab]}
            </div>
            {currentTab === 'sonia' && (
              <a 
                href="https://apps.apple.com/us/app/sonia-ai-voice-therapy/id6472111765" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button"
              >
                Download Sonia
              </a>
            )}
            {currentTab === 'hiring' && (
              <img 
                src="/yclogo.svg" 
                alt="YC Logo" 
                className="content-image"
              />
            )}
          </div>
        </div>
      </div>
      <div className={`footer-wrapper ${showContent ? 'visible' : ''}`}>
        <Footer />
      </div>
    </main>
  )
}
