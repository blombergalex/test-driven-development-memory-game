import React from "react";

type NewGameButtonProps = {
  newRound: () => void;
};

const NewGameButton = ({ newRound }: NewGameButtonProps) => {
  return (
    <button
      data-testid="new-game-btn"
      onClick={newRound} 
      className="bg-amber-500 text-white py-2 px-4 m-4 rounded hover:bg-amber-600"
    >
      New Game
    </button>
  );
};

export default NewGameButton;
