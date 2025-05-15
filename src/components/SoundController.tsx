import React, { useEffect, useRef } from 'react';

interface SoundControllerProps {
  timeOfDay: 'day' | 'night';
  weather: 'sunny' | 'rainy' | 'cloudy';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

const SoundController: React.FC<SoundControllerProps> = ({ timeOfDay, weather, season }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambienceRef = useRef<HTMLAudioElement | null>(null);
  
  const getAmbientSound = () => {
    if (weather === 'rainy') {
      return 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3';
    }
    
    if (timeOfDay === 'night') {
      return 'https://assets.mixkit.co/sfx/preview/mixkit-night-crickets-loop-1773.mp3';
    }
    
    switch(season) {
      case 'spring':
        return 'https://assets.mixkit.co/sfx/preview/mixkit-morning-birds-2472.mp3';
      case 'summer':
        return 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambiance-1210.mp3';
      case 'autumn':
        return 'https://assets.mixkit.co/sfx/preview/mixkit-wind-and-leaves-loop-1234.mp3';
      case 'winter':
        return 'https://assets.mixkit.co/sfx/preview/mixkit-blizzard-wind-loop-1155.mp3';
      default:
        return 'https://assets.mixkit.co/sfx/preview/mixkit-morning-birds-2472.mp3';
    }
  };
  
  const getBackgroundMusic = () => {
    return 'https://assets.mixkit.co/sfx/preview/mixkit-relaxing-garden-loop-3803.mp3';
  };
  
  useEffect(() => {
    // Ambient sounds
    if (!audioRef.current) {
      audioRef.current = new Audio(getAmbientSound());
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    } else {
      audioRef.current.src = getAmbientSound();
    }
    
    // Background music
    if (!ambienceRef.current) {
      ambienceRef.current = new Audio(getBackgroundMusic());
      ambienceRef.current.loop = true;
      ambienceRef.current.volume = 0.1;
    }
    
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
        if (ambienceRef.current) {
          await ambienceRef.current.play();
        }
      } catch (error) {
        console.log('Audio autoplay prevented:', error);
      }
    };
    
    playAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (ambienceRef.current) {
        ambienceRef.current.pause();
        ambienceRef.current.src = '';
      }
    };
  }, [timeOfDay, weather, season]);
  
  return null;
};

export default SoundController;