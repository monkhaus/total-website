import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'

const HangmanGame: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedWord, setGuessedWord] = useState<string>('');
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const response = await axios.get('/get_random_word/');
        const randomWord = response.data.word;
        setSelectedWord(randomWord);
        setGuessedWord('_'.repeat(randomWord.length));
      } catch (error) {
        console.error('Error fetching random word:', error);
      }
    };
  
    fetchRandomWord();
  }, []);
  

  const handleGuess = (letter: string) => {
    const lowerCaseLetter = letter.toLowerCase();
    
    let updatedGuessedWord = guessedWord;
    if (selectedWord.includes(lowerCaseLetter)) {
      updatedGuessedWord = guessedWord
        .split('')
        .map((char, index) =>
          selectedWord[index] === lowerCaseLetter ? letter : char
        )
        .join('');
    } else {
      setWrongGuesses([...wrongGuesses, letter]);
    }
  
    setGuessedWord(updatedGuessedWord);
  
    if (updatedGuessedWord.toLowerCase() === selectedWord.toLowerCase()) {
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
