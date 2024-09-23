import React, { useState } from 'react';

type HighscoreProps = {
  // updateNewHighscore: () => void;
  newHighscore: number;
  onSubmitName: (name: string) => void;
  isNewHighscore: boolean;
}

const Highscore = ({ newHighscore, onSubmitName, isNewHighscore }:HighscoreProps) => {
  const [name, setName] = useState('');

  // const number = localStorage.highscore;

  const handleSubmit = () => {
    // localStorage.setItem('name', name);
    if (name.trim( )) {
      onSubmitName(name);
    }
    // updateNewHighscore();
  };

  return (
    <div className='w-full '>
      {isNewHighscore ? (
        <div  data-testid="highscore-popup" className='popup'>
          <h2 className='text-amber-600 font-semibold'>New highscore!: {newHighscore} moves</h2>
          <input
            data-testid="input"
            className='p-2'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
          />
          <button onClick={handleSubmit} className='border border-green-700 hover:bg-green-100 text-green-700 font-semibold p-2 ml-1 rounded'>Submit</button>
        </div>
        ) : (
          <div data-testid="highscore-display">
            <div className='flex space-x-1'>
              <h2>Highscore: <span className='text-amber-600'>{localStorage.getItem('name')}</span> -</h2>
              <h2 className='text-amber-600'>{localStorage.getItem('highscore')}</h2>
            </div>
          </div>
        )}
    </div>
  );
};

export default Highscore;