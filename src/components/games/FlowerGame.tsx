import React, { useState, useEffect } from 'react';
import './FlowerGame.css';

const FlowerGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [flowers, setFlowers] = useState<Array<{id: number, x: number, y: number, type: string, clicked: boolean}>>([]);
  
  // Flower types
  const flowerTypes = ['🌷', '🌹', '🌻', '🌼', '💐', '🌺'];
  
  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    generateFlowers();
  };
  
  // Generate random flowers
  const generateFlowers = () => {
    const newFlowers = [];
    for (let i = 0; i < 10; i++) {
      newFlowers.push({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 60 + 5,
        type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
        clicked: false
      });
    }
    setFlowers(newFlowers);
  };
  
  // Handle flower click
  const handleFlowerClick = (id: number) => {
    if (!gameActive) return;
    
    setFlowers(prev => prev.map(flower => 
      flower.id === id ? { ...flower, clicked: true } : flower
    ));
    
    setScore(prev => prev + 10);
    
    // Check if all flowers are clicked
    const allClicked = flowers.every(flower => flower.id === id || flower.clicked);
    if (allClicked) {
      generateFlowers();
    }
  };
  
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
    <div className="flower-game">
      <div className="game-info">
        <div className="game-stat">
          <span>Puntos:</span>
          <span className="game-value">{score}</span>
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
                <p>Tu puntuación: {score}</p>
              </>
            ) : (
              <h3>Jardín Encantado</h3>
            )}
            <p className="game-instructions">
              Recoge todas las flores antes de que se acabe el tiempo.
            </p>
            <button className="game-button" onClick={startGame}>
              {timeLeft === 0 ? 'Jugar de nuevo' : 'Comenzar'}
            </button>
          </div>
        </div>
      )}
      
      <div className="game-field">
        {flowers.map(flower => (
          <div
            key={flower.id}
            className={`game-flower ${flower.clicked ? 'clicked' : ''}`}
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`
            }}
            onClick={() => !flower.clicked && handleFlowerClick(flower.id)}
          >
            {flower.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerGame;