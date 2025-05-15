import React from 'react';
import { Sun, Moon, Cloud, CloudRain, Music, GamepadIcon, MessageSquare } from 'lucide-react';
import './ControlPanel.css';

interface ControlPanelProps {
  timeOfDay: 'day' | 'night';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  weather: 'sunny' | 'rainy' | 'cloudy';
  soundEnabled: boolean;
  toggleTimeOfDay: () => void;
  cycleSeason: () => void;
  cycleWeather: () => void;
  toggleSound: () => void;
  toggleGames: () => void;
  toggleMessages: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  timeOfDay,
  season,
  weather,
  soundEnabled,
  toggleTimeOfDay,
  cycleSeason,
  cycleWeather,
  toggleSound,
  toggleGames,
  toggleMessages
}) => {
  // Get season icon based on current season
  const getSeasonIcon = () => {
    switch(season) {
      case 'spring': return '🌱';
      case 'summer': return '☀️';
      case 'autumn': return '🍂';
      case 'winter': return '❄️';
      default: return '🌱';
    }
  };
  
  // Get weather icon based on current weather
  const getWeatherIcon = () => {
    switch(weather) {
      case 'sunny': return <Sun />;
      case 'rainy': return <CloudRain />;
      case 'cloudy': return <Cloud />;
      default: return <Sun />;
    }
  };
  
  return (
    <div className={`control-panel ${timeOfDay}`}>
      <button 
        className="control-button" 
        onClick={toggleTimeOfDay}
        title={timeOfDay === 'day' ? 'Cambiar a noche' : 'Cambiar a día'}
      >
        {timeOfDay === 'day' ? <Moon /> : <Sun />}
        <span>{timeOfDay === 'day' ? 'Noche' : 'Día'}</span>
      </button>
      
      <button 
        className="control-button" 
        onClick={cycleSeason}
        title="Cambiar estación"
      >
        <span className="season-emoji">{getSeasonIcon()}</span>
        <span>{season}</span>
      </button>
      
      <button 
        className="control-button" 
        onClick={cycleWeather}
        title="Cambiar clima"
      >
        {getWeatherIcon()}
        <span>{weather}</span>
      </button>
      
      <button 
        className={`control-button ${soundEnabled ? 'active' : ''}`} 
        onClick={toggleSound}
        title={soundEnabled ? 'Apagar música' : 'Encender música'}
      >
        <Music />
        <span>{soundEnabled ? 'Silencio' : 'Música'}</span>
      </button>
      
      <button 
        className="control-button" 
        onClick={toggleGames}
        title="Mostrar juegos"
      >
        <GamepadIcon />
        <span>Juegos</span>
      </button>
      
      <button 
        className="control-button" 
        onClick={toggleMessages}
        title="Mostrar mensajes"
      >
        <MessageSquare />
        <span>Mensajes</span>
      </button>
    </div>
  );
};

export default ControlPanel;