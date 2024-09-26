'use client'

import { useState } from "react";

type HighscoreProps = {
  newHighscore: number;
  updateNewHighscore: (name: string) => void;
};

const Highscore = ({ newHighscore, updateNewHighscore }: HighscoreProps) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("name", name);
          localStorage.setItem("highscore", newHighscore.toString());
        }
        updateNewHighscore(name);
      } catch (error) {
        console.error("Error saving to localStorage: ", error);
      }
    }
  };

  return (
    <div data-testid="highscore-popup" className="popup">
      <h2 className="text-amber-600 font-semibold">
        New highscore!: {newHighscore} moves
      </h2>
      <input
        data-testid="input"
        className="p-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button
        onClick={handleSubmit}
        data-testid="submit-highscore-btn"
        className="border border-green-700 hover:bg-green-100 text-green-700 font-semibold p-2 ml-1 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default Highscore;
