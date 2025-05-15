import React, { useState } from 'react';
import { X, Gamepad2 } from 'lucide-react';
import FlowerGame from './games/FlowerGame';
import ButterflyGame from './games/ButterflyGame';
import './GameCenter.css';

const GameCenter: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
  const games = [
    { id: 'flower', name: 'Jardín Encantado', component: FlowerGame },
    { id: 'butterfly', name: 'Atrapa Mariposas', component: ButterflyGame }
  ];
  
  return (
    <div className="game-center">
      <div className="game-header">
        <h2>
          <Gamepad2 className="game-icon" size={18} />
          Juegos del Jardín
        </h2>
      </div>
      
      <div className="game-content">
        {selectedGame ? (
          <>
            <button 
              className="back-button"
              onClick={() => setSelectedGame(null)}
            >
              ← Volver a juegos
            </button>
            
            {games.find(game => game.id === selectedGame)?.component && 
              React.createElement(
                games.find(game => game.id === selectedGame)!.component
              )
            }
          </>
        ) : (
          <div className="game-list">
            {games.map(game => (
              <div 
                key={game.id}
                className="game-card"
                onClick={() => setSelectedGame(game.id)}
              >
                <h3>{game.name}</h3>
                <p>Haz clic para jugar</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCenter;