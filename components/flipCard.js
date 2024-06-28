import React, { useState } from 'react';
import '../src/app/FlipCard.css'; // Estilos CSS para la carta

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
            {frontContent}
        </div>
        <div className="flip-card-back">
            {backContent}
        </div>
      </div>
    </div>
  );
};

export {FlipCard};
