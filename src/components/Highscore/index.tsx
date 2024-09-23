import React, { useState } from 'react';

interface HighscoreProps {
  updateNewHighscore: () => void;
}

const Highscore: React.FC<HighscoreProps> = ({ updateNewHighscore }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    localStorage.setItem('name', name);
    updateNewHighscore();
  };

  return (
    <div data-testid="highscore-popup">
      <h2>Highscore: {name}</h2>
      <input
        data-testid="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Highscore;

// highscore.test passed 