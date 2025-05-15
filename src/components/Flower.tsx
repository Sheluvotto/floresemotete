import React, { useState } from 'react';
import './Flower.css';

interface FlowerProps {
  type: string;
  x: number;
  y: number;
  size: number;
  timeOfDay: 'day' | 'night';
  weather: 'sunny' | 'rainy' | 'cloudy';
}

const Flower: React.FC<FlowerProps> = ({ type, x, y, size, timeOfDay, weather }) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  
  // Handle interaction when clicking on a flower
  const handleFlowerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent garden click event
    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 1000);
  };
  
  // Handle hover effect
  const handleHover = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  };
  
  // Get flower colors based on flower type
  const getFlowerColors = () => {
    switch(type) {
      case 'tulip':
        return { primary: '#ff5e7b', secondary: '#ff87a1' };
      case 'daffodil':
        return { primary: '#ffef5e', secondary: '#fffaa1' };
      case 'daisy':
        return { primary: '#ffffff', secondary: '#fff9a1' };
      case 'rose':
        return { primary: '#ff3a5e', secondary: '#ff8aa1' };
      case 'sunflower':
        return { primary: '#ffcf3a', secondary: '#664500' };
      case 'lily':
        return { primary: '#ffffff', secondary: '#ffaaff' };
      case 'poppy':
        return { primary: '#ff3a3a', secondary: '#ff8a8a' };
      case 'chrysanthemum':
        return { primary: '#ffaa3a', secondary: '#ff8a3a' };
      case 'dahlia':
        return { primary: '#9a3aff', secondary: '#bf8aff' };
      case 'marigold':
        return { primary: '#ff8a3a', secondary: '#ffce8a' };
      case 'aster':
        return { primary: '#9a3aff', secondary: '#cf8aff' };
      case 'snowdrop':
        return { primary: '#ffffff', secondary: '#e0f0ff' };
      case 'winterberry':
        return { primary: '#ff3a3a', secondary: '#005c00' };
      case 'holly':
        return { primary: '#005c00', secondary: '#ff3a3a' };
      case 'pine':
        return { primary: '#006622', secondary: '#004400' };
      default:
        return { primary: '#ff87a1', secondary: '#fff9a1' };
    }
  };
  
  const { primary, secondary } = getFlowerColors();
  
  // Adjust appearance based on time of day
  const getOpacity = () => {
    if (timeOfDay === 'night') {
      return 0.7; // Flowers are less vibrant at night
    }
    if (weather === 'cloudy') {
      return 0.85; // Slightly muted in cloudy weather
    }
    return 1;
  };
  
  // Get stem color based on season and time
  const getStemColor = () => {
    if (timeOfDay === 'night') {
      return '#305030'; // Darker at night
    }
    return '#40a040'; // Default
  };
  
  // Render different flower types
  const renderFlower = () => {
    // Night time glow effect
    const nightGlow = timeOfDay === 'night' && isGlowing 
      ? { filter: `drop-shadow(0 0 8px ${primary})` } 
      : {};
      
    switch(type) {
      case 'tulip':
        return (
          <div className="flower-container" style={nightGlow}>
            <div 
              className="flower-stem" 
              style={{ backgroundColor: getStemColor() }}
            ></div>
            <div 
              className="flower-tulip" 
              style={{ 
                backgroundColor: primary,
                opacity: getOpacity()
              }}
            ></div>
          </div>
        );
      case 'sunflower':
        return (
          <div className="flower-container" style={nightGlow}>
            <div 
              className="flower-stem" 
              style={{ backgroundColor: getStemColor() }}
            ></div>
            <div 
              className="flower-center" 
              style={{ 
                backgroundColor: secondary,
                opacity: getOpacity()
              }}
            ></div>
            <div 
              className="flower-petals sunflower-petals" 
              style={{ 
                backgroundColor: primary,
                opacity: getOpacity()
              }}
            ></div>
          </div>
        );
      case 'rose':
        return (
          <div className="flower-container" style={nightGlow}>
            <div 
              className="flower-stem" 
              style={{ backgroundColor: getStemColor() }}
            ></div>
            <div 
              className="flower-rose" 
              style={{ 
                backgroundColor: primary,
                opacity: getOpacity()
              }}
            ></div>
          </div>
        );
      default:
        // Default daisy-like flower
        return (
          <div className="flower-container" style={nightGlow}>
            <div 
              className="flower-stem" 
              style={{ backgroundColor: getStemColor() }}
            ></div>
            <div 
              className="flower-center" 
              style={{ 
                backgroundColor: secondary,
                opacity: getOpacity() 
              }}
            ></div>
            <div 
              className="flower-petals" 
              style={{ 
                backgroundColor: primary,
                opacity: getOpacity()
              }}
            ></div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`flower ${isShaking ? 'shake' : ''} ${weather === 'rainy' ? 'rainy-sway' : ''}`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: `scale(${size})`, 
        zIndex: Math.floor(y)
      }}
      onClick={handleFlowerClick}
      onMouseEnter={handleHover}
    >
      {renderFlower()}
    </div>
  );
};

export default Flower;