import React, { useState, useEffect, useRef } from 'react';
import './ButterflyGame.css';

const ButterflyGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [butterflies, setButterflies] = useState<Array<{id: number, x: number, y: number, speed: number, caught: boolean}>>([]);
  const gameFieldRef = useRef<HTMLDivElement>(null);
  
  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    generateButterflies();
  };
  
  // Generate butterflies
  const generateButterflies = () => {
    const newButterflies = [];
    for (let i = 0; i < 8; i++) {
      newButterflies.push({
        id: i,
        x: Math.random() * 90,
        y: Math.random() * 90,
        speed: Math.random() * 2 + 1,
        caught: false
      });
    }
    setButterflies(newButterflies);
  };
  
  // Handle butterfly click (catch)
  const catchButterfly = (id: number) => {
    if (!gameActive) return;
    
    setButterflies(prev => prev.map(butterfly => 
      butterfly.id === id ? { ...butterfly, caught: true } : butterfly
    ));
    
    setScore(prev => prev + 10);
    
    // Create new butterfly after catch
    setTimeout(() => {
      setButterflies(prev => {
        const updated = prev.filter(b => b.id !== id);
        
        const newButterfly = {
          id: Date.now(),
          x: Math.random() * 90,
          y: Math.random() * 90,
          speed: Math.random() * 2 + 1,
          caught: false
        };
        
        return [...updated, newButterfly];
      });
    }, 500);
  };
  
  // Move butterflies
  useEffect(() => {
    if (!gameActive) return;
    
    const moveInterval = setInterval(() => {
      setButterflies(prev => prev.map(butterfly => {
        if (butterfly.caught) return butterfly;
        
        // Create random movement
        const dx = (Math.random() - 0.5) * butterfly.speed * 5;
        const dy = (Math.random() - 0.5) * butterfly.speed * 5;
        
        // Keep in bounds
        let newX = butterfly.x + dx;
        let newY = butterfly.y + dy;
        
        newX = Math.max(0, Math.min(90, newX));
        newY = Math.max(0, Math.min(90, newY));
        
        return {
          ...butterfly,
          x: newX,
          y: newY
        };
      }));
    }, 200);
    
    return () => clearInterval(moveInterval);
  }, [gameActive]);
  
  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive]);
  
  return (
    <div className="butterfly-game">
      <div className="game-info">
        <div className="game-stat">
          <span>Mariposas:</span>
          <span className="game-value">{score / 10}</span>
        </div>
        <div className="game-stat">
          <span>Tiempo:</span>
          <span className="game-value">{timeLeft}s</span>
        </div>
      </div>
      
      {!gameActive && (
        <div className="game-overlay">
          <div className="game-message">
            {timeLeft === 0 ? (
              <>
                <h3>¡Juego terminado!</h3>
                <p>Mariposas atrapadas: {score / 10}</p>
              </>
            ) : (
              <h3>Atrapa Mariposas</h3>
            )}
            <p className="game-instructions">
              ¡Atrapa tantas mariposas como puedas antes de que se acabe el tiempo! Haz clic en las mariposas para atraparlas.
            </p>
            <button className="game-button" onClick={startGame}>
              {timeLeft === 0 ? 'Jugar de nuevo' : 'Comenzar'}
            </button>
          </div>
        </div>
      )}
      
      <div className="game-field butterfly-field" ref={gameFieldRef}>
        {butterflies.map(butterfly => (
          <div
            key={butterfly.id}
            className={`game-butterfly ${butterfly.caught ? 'caught' : ''}`}
            style={{
              left: `${butterfly.x}%`,
              top: `${butterfly.y}%`,
              animationDuration: `${0.5 / butterfly.speed}s`
            }}
            onClick={() => !butterfly.caught && catchButterfly(butterfly.id)}
          >
            <span className="butterfly-emoji">🦋</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButterflyGame;