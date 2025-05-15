import React, { useState, useEffect } from 'react';
import Garden from './components/Garden';
import Header from './components/Header';
import MessageCenter from './components/MessageCenter';
import GameCenter from './components/GameCenter';
import ControlPanel from './components/ControlPanel';
import SoundController from './components/SoundController';
import './App.css';

function App() {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'cloudy'>('sunny');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showGames, setShowGames] = useState<boolean>(false);
  const [showMessages, setShowMessages] = useState<boolean>(false);

  // Toggle time of day
  const toggleTimeOfDay = () => {
    setTimeOfDay(prev => prev === 'day' ? 'night' : 'day');
  };

  // Cycle through seasons
  const cycleSeason = () => {
    const seasons: Array<'spring' | 'summer' | 'autumn' | 'winter'> = ['spring', 'summer', 'autumn', 'winter'];
    const currentIndex = seasons.indexOf(season);
    const nextIndex = (currentIndex + 1) % seasons.length;
    setSeason(seasons[nextIndex]);
  };

  // Cycle through weather
  const cycleWeather = () => {
    const weatherTypes: Array<'sunny' | 'rainy' | 'cloudy'> = ['sunny', 'rainy', 'cloudy'];
    const currentIndex = weatherTypes.indexOf(weather);
    const nextIndex = (currentIndex + 1) % weatherTypes.length;
    setWeather(weatherTypes[nextIndex]);
  };

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Toggle games panel
  const toggleGames = () => {
    setShowGames(prev => !prev);
    if (!showGames) setShowMessages(false);
  };

  // Toggle messages panel
  const toggleMessages = () => {
    setShowMessages(prev => !prev);
    if (!showMessages) setShowGames(false);
  };

  // Auto cycle time every 2 minutes if enabled
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleTimeOfDay();
    }, 120000);
    return () => clearTimeout(timer);
  }, [timeOfDay]);

  return (
    <div className={`app-container ${timeOfDay} ${season} ${weather}`}>
      <Header 
        title="Un Jardín para Emotete" 
        timeOfDay={timeOfDay} 
        season={season} 
      />
      
      <Garden 
        timeOfDay={timeOfDay} 
        season={season} 
        weather={weather} 
      />
      
      <ControlPanel 
        timeOfDay={timeOfDay}
        season={season}
        weather={weather}
        soundEnabled={soundEnabled}
        toggleTimeOfDay={toggleTimeOfDay}
        cycleSeason={cycleSeason}
        cycleWeather={cycleWeather}
        toggleSound={toggleSound}
        toggleGames={toggleGames}
        toggleMessages={toggleMessages}
      />
      
      {showGames && <GameCenter />}
      {showMessages && <MessageCenter recipient="Emotete" />}
      
      {soundEnabled && <SoundController 
        timeOfDay={timeOfDay} 
        weather={weather} 
        season={season} 
      />}
    </div>
  );
}

export default App;