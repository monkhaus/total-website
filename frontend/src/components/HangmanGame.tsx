import React, { useState, useEffect } from 'react';

const words = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS']; // List of words for the game

const HangmanGame: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedWord, setGuessedWord] = useState<string>('');
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
    setGuessedWord('_'.repeat(randomWord.length));
  }, []);

  const handleGuess = (letter: string) => {
    let updatedGuessedWord = guessedWord;
    if (selectedWord.includes(letter)) {
      updatedGuessedWord = guessedWord
        .split('')
        .map((char, index) =>
          selectedWord[index] === letter ? letter : char
        )
        .join('');
    } else {
      setWrongGuesses([...wrongGuesses, letter]);
    }
  
    setGuessedWord(updatedGuessedWord);
  
    if (updatedGuessedWord === selectedWord) {
      setIsGameOver(true);
      setMessage('Congratulations! You won!');
    } else if (wrongGuesses.length >= 6) {
      setIsGameOver(true);
      setMessage('Game Over! You lost.');
    }
  };
  

  return (
    <div className="hangman-game">
      <div className="hangman-word">
        {guessedWord.split('').map((letter, index) => (
          <span key={index} className="letter">
            {letter}
          </span>
        ))}
      </div>
      <div className="hangman-wrong-guesses">
        {wrongGuesses.length > 0 && (
          <p>Wrong guesses: {wrongGuesses.join(', ')}</p>
        )}
      </div>
      <div className="hangman-buttons">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
          (letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={wrongGuesses.includes(letter) || guessedWord.includes(letter) || isGameOver}
            >
              {letter}
            </button>
          )
        )}
      </div>
      {isGameOver && <p className="message">{message}</p>}
    </div>
  );
};

export default HangmanGame;
