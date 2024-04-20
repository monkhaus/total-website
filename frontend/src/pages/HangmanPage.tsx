import React from 'react';
import HangmanGame from '../components/HangmanGame';

const HangmanPage: React.FC = () => {
  return (
    <div className="hangman-page">
      <h1>Hangman Game</h1>
      <HangmanGame />
    </div>
  );
};

export default HangmanPage;
