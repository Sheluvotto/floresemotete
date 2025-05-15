import React, { useState } from 'react';
import { X, Heart, Send } from 'lucide-react';
import './MessageCenter.css';

interface MessageCenterProps {
  recipient: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({ recipient }) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string}>>([
    { id: 1, text: `¡Hola ${recipient}! Este jardín es para ti con mucho cariño.` },
    { id: 2, text: 'Planta flores haciendo clic en el jardín.' },
    { id: 3, text: 'Intenta atrapar las mariposas cuando sea de día.' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  
  // Add a new message
  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage }]);
      setNewMessage('');
    }
  };
  
  // Add a predefined message
  const addPredefinedMessage = (message: string) => {
    setMessages([...messages, { id: Date.now(), text: message }]);
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddMessage();
    }
  };
  
  return (
    <div className="message-center">
      <div className="message-header">
        <h2>Mensajes para {recipient} <Heart className="message-icon" size={16} /></h2>
        <div className="predefined-messages">
          <button onClick={() => addPredefinedMessage('¡Tu jardín está precioso!')}>¡Tu jardín está precioso!</button>
          <button onClick={() => addPredefinedMessage('¡Feliz día!')}>¡Feliz día!</button>
          <button onClick={() => addPredefinedMessage('🌸 ¡Te quiero! 🌸')}>🌸 ¡Te quiero! 🌸</button>
        </div>
      </div>
      
      <div className="message-list">
        {messages.map(message => (
          <div key={message.id} className="message-item">
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      
      <div className="message-input">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleAddMessage}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessageCenter;