import React from "react";

const Rules = () => {
  return (
    <div className="bg-amber-300 p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-900">Rules</h4>
      <p data-testid="rules-text" className="text-black">
        Click a card to reveal an image. Then click another card to reveal that image. Your job is to remember the images and click two of the same cards. Good luck beating the highscore!
      </p>
      <p data-testid="good-luck" className="text-gray-900">
        Good Luck!
      </p>
    </div>
  );
};

export default Rules;
