import React from 'react';
import { Sun, Moon, Flower, CloudRain } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  title: string;
  timeOfDay: 'day' | 'night';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

const Header: React.FC<HeaderProps> = ({ title, timeOfDay, season }) => {
  // Get icon based on time of day
  const TimeIcon = timeOfDay === 'day' ? Sun : Moon;
  
  // Get season name in Spanish
  const getSeasonName = () => {
    switch(season) {
      case 'spring': return 'Primavera';
      case 'summer': return 'Verano';
      case 'autumn': return 'Otoño';
      case 'winter': return 'Invierno';
      default: return 'Primavera';
    }
  };
  
  return (
    <header className={`garden-header ${timeOfDay}`}>
      <div className="title-container">
        <Flower className="header-icon" />
        <h1>{title}</h1>
      </div>
      <div className="header-info">
        <div className="header-item">
          <TimeIcon className="header-icon" />
          <span>{timeOfDay === 'day' ? 'Día' : 'Noche'}</span>
        </div>
        <div className="header-item">
          <CloudRain className="header-icon" />
          <span>{getSeasonName()}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;