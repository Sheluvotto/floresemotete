import React, { useState, useEffect } from 'react';
import Flower from './Flower';
import Butterfly from './Butterfly';
import './Garden.css';

interface GardenProps {
  timeOfDay: 'day' | 'night';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  weather: 'sunny' | 'rainy' | 'cloudy';
}

const Garden: React.FC<GardenProps> = ({ timeOfDay, season, weather }) => {
  const [flowers, setFlowers] = useState<Array<{id: number, x: number, y: number, type: string, size: number}>>([]);
  const [butterflies, setButterflies] = useState<Array<{id: number, x: number, y: number}>>([]); 
  const [secretFound, setSecretFound] = useState(false);

  // Define flower types based on season
  const getFlowerTypes = () => {
    switch(season) {
      case 'spring': 
        return ['tulip', 'daffodil', 'daisy', 'lilac'];
      case 'summer': 
        return ['rose', 'sunflower', 'lily', 'poppy'];
      case 'autumn': 
        return ['chrysanthemum', 'dahlia', 'marigold', 'aster'];
      case 'winter': 
        return ['snowdrop', 'winterberry', 'holly', 'pine'];
      default: 
        return ['daisy', 'rose', 'lily', 'tulip'];
    }
  };

  // Generate initial flowers
  useEffect(() => {
    const flowerTypes = getFlowerTypes();
    const newFlowers = [];
    
    // Generate random flowers
    for (let i = 0; i < 20; i++) {
      newFlowers.push({
        id: i,
        x: Math.random() * 90 + 5, // 5-95% of width
        y: Math.random() * 60 + 30, // 30-90% of height
        type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
        size: Math.random() * 0.5 + 0.75 // 0.75-1.25 scale
      });
    }
    
    setFlowers(newFlowers);
    
    // Generate butterflies in day time only
    if (timeOfDay === 'day' && weather !== 'rainy') {
      const newButterflies = [];
      for (let i = 0; i < 5; i++) {
        newButterflies.push({
          id: i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 50 + 10
        });
      }
      setButterflies(newButterflies);
    } else {
      setButterflies([]);
    }
  }, [season, timeOfDay, weather]);

  // Handle click on the garden to add a new flower
  const handleGardenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const gardenRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - gardenRect.left) / gardenRect.width) * 100;
    const y = ((e.clientY - gardenRect.top) / gardenRect.height) * 100;
    
    const flowerTypes = getFlowerTypes();
    const newFlower = {
      id: flowers.length + 1,
      x,
      y,
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
      size: Math.random() * 0.5 + 0.75
    };
    
    setFlowers([...flowers, newFlower]);
    
    // Easter egg - if you plant 10 flowers in a small area, reveal a secret garden feature
    const nearbyFlowers = flowers.filter(flower => 
      Math.abs(flower.x - x) < 10 && Math.abs(flower.y - y) < 10
    );
    
    if (nearbyFlowers.length >= 9) {
      setSecretFound(true);
      setTimeout(() => setSecretFound(false), 5000);
    }
  };

  return (
    <div 
      className={`garden ${timeOfDay} ${season} ${weather} ${secretFound ? 'secret-found' : ''}`}
      onClick={handleGardenClick}
    >
      <div className="garden-ground"></div>
      
      {/* Render all flowers */}
      {flowers.map(flower => (
        <Flower 
          key={flower.id}
          type={flower.type}
          x={flower.x}
          y={flower.y}
          size={flower.size}
          timeOfDay={timeOfDay}
          weather={weather}
        />
      ))}
      
      {/* Render butterflies in daytime only */}
      {timeOfDay === 'day' && weather !== 'rainy' && 
        butterflies.map(butterfly => (
          <Butterfly 
            key={butterfly.id} 
            x={butterfly.x} 
            y={butterfly.y} 
          />
        ))
      }
      
      {/* Fireflies at night */}
      {timeOfDay === 'night' && 
        [...Array(15)].map((_, i) => (
          <div 
            key={`firefly-${i}`} 
            className="firefly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))
      }
      
      {/* Secret garden element */}
      {secretFound && 
        <div className="secret-garden-element">
          <span>✨ ¡Un regalo especial para Emotete! ✨</span>
        </div>
      }
    </div>
  );
};

export default Garden;