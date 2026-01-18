
import React from 'react';
import './MenuButton.css';

interface MenuButtonProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function MenuButton({ isMenuOpen, setIsMenuOpen }: MenuButtonProps) {
  return (
    <button 
      className={`menu-button ${isMenuOpen ? 'hidden' : ''}`} 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      ☰
    </button>
  );
}
