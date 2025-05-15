import React, { useEffect, useState } from 'react';
import './Butterfly.css';

interface ButterflyProps {
  x: number;
  y: number;
}

const Butterfly: React.FC<ButterflyProps> = ({ x, y }) => {
  const [position, setPosition] = useState({ x, y });
  const [moving, setMoving] = useState(false);
  const [caught, setCaught] = useState(false);
  
  // Colors for butterflies
  const colors = [
    '#ffaa00',
    '#ff00aa',
    '#00aaff',
    '#aa00ff',
    '#aaff00'
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Move butterfly randomly around initial position
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!caught) {
        const newX = position.x + (Math.random() * 10 - 5);
        const newY = position.y + (Math.random() * 10 - 5);
        
        // Keep butterfly within garden boundaries
        const boundedX = Math.max(5, Math.min(95, newX));
        const boundedY = Math.max(5, Math.min(75, newY));
        
        setPosition({ x: boundedX, y: boundedY });
        setMoving(prev => !prev);
      }
    }, 2000);
    
    return () => clearInterval(moveInterval);
  }, [position, caught]);
  
  // Handle click to "catch" butterfly
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCaught(true);
    
    // Butterfly escapes after a while
    setTimeout(() => {
      const newX = Math.random() * 90 + 5;
      const newY = Math.random() * 50 + 10;
      setPosition({ x: newX, y: newY });
      setCaught(false);
    }, 2000);
  };
  
  return (
    <div 
      className={`butterfly ${moving ? 'flying-right' : 'flying-left'} ${caught ? 'caught' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={handleClick}
    >
      <div 
        className="wing wing-left" 
        style={{ backgroundColor: randomColor }}
      ></div>
      <div 
        className="wing wing-right" 
        style={{ backgroundColor: randomColor }}
      ></div>
      <div className="butterfly-body"></div>
    </div>
  );
};

export default Butterfly;