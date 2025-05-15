import React, { useEffect, useRef } from 'react';

interface SoundControllerProps {
  timeOfDay: 'day' | 'night';
  weather: 'sunny' | 'rainy' | 'cloudy';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

const SoundController: React.FC<SoundControllerProps> = ({ timeOfDay, weather, season }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Get the appropriate ambient sound based on time of day, weather, and season
  const getAmbientSound = () => {
    if (weather === 'rainy') {
      return 'https://soundbible.com/mp3/rain_noise-Mike_Koenig-964933911.mp3';
    }
    
    if (timeOfDay === 'night') {
      return 'https://soundbible.com/mp3/Crickets-SoundBible.com-1908213323.mp3';
    }
    
    switch(season) {
      case 'spring':
        return 'https://soundbible.com/mp3/birds_singing-Mike_Koenig-700179639.mp3';
      case 'summer':
        return 'https://soundbible.com/mp3/meadow-birds-close-mike-koenig.mp3';
      case 'autumn':
        return 'https://soundbible.com/mp3/Fall_Wind-Mark_DiAngelo-321569370.mp3';
      case 'winter':
        return 'https://soundbible.com/mp3/wind-blustery-sounds.mp3';
      default:
        return 'https://soundbible.com/mp3/birds_singing-Mike_Koenig-700179639.mp3';
    }
  };
  
  // Update the audio source when environment changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getAmbientSound());
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    } else {
      audioRef.current.src = getAmbientSound();
    }
    
    audioRef.current.play().catch(error => {
      console.log('Audio autoplay prevented:', error);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [timeOfDay, weather, season]);
  
  return null; // This is a non-visual component
};

export default SoundController;