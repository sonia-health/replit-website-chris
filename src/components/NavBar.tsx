import { useState, useEffect } from 'react';
import './NavBar.css';

import { Tab } from '../App';

interface NavBarProps {
  onTabChange: (tab: Tab) => Promise<void>;
  currentTab: Tab;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function NavBar({ onTabChange, isMenuOpen, setIsMenuOpen }: NavBarProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('sonia');
  const [sliderStyle, setSliderStyle] = useState({ width: '0px', left: '0px' });

  const tabs: Tab[] = ['why', 'hiring', 'sonia', 'research', 'partnerships'];

  const updateSliderPosition = () => {
    const button = document.querySelector(`button[data-tab="${selectedTab}"]`) as HTMLElement;
    if (button) {
      setSliderStyle({
        width: `${button.clientWidth - 40}px`,
        left: `${button.offsetLeft + 20}px`
      });
    }
  };

  useEffect(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
    return () => window.removeEventListener('resize', updateSliderPosition);
  }, [selectedTab]);

  return (
    <nav className="navbar">
      <div className="mobile-title">
        {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
      </div>
      <div className={`nav-container ${isMenuOpen ? 'show' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-item ${selectedTab === tab ? 'selected' : ''}`}
            onClick={() => {
              setSelectedTab(tab);
              onTabChange(tab);
              // setIsMenuOpen(false); // Added to close the menu
            }}
            data-tab={tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <div 
          className="slider" 
          style={{ 
            '--slider-width': sliderStyle.width,
            '--slider-left': sliderStyle.left
          } as React.CSSProperties} 
        />
      </div>
    </nav>
  );
}