import React from 'react';

interface CardProps {
  image: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, isFlipped, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-24 h-32 flex justify-center items-center bg-white border-2 border-amber-500 shadow-md rounded-lg cursor-pointer transition-transform transform hover:scale-105"
      data-testid="card"
    >
      {isFlipped ? (
        <img data-testid="card-image" src={image} alt="card image" className="w-full h-full object-contain"/>
      ) : (
        <div className="text-4xl font-bold text-amber-900">
          ?
        </div>
      )}
    </div>
  );
};

export default Card;
