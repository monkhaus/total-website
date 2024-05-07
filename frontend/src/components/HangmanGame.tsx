import React, { useState } from 'react';
import axios from '../axiosConfig';
import 'bulma/css/bulma.min.css';

const HangmanGame: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedWord, setGuessedWord] = useState<string>('');
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isFetchingWord, setIsFetchingWord] = useState<boolean>(false);

  const fetchRandomWord = async () => {
    setIsFetchingWord(true);
    try {
      const response = await axios.get('/get_random_word/');
      const randomWord = response.data.word;
      setSelectedWord(randomWord);
      setGuessedWord('_'.repeat(randomWord.length));
      setWrongGuesses([]);
      setIsGameOver(false);
      setMessage('');
    } catch (error) {
      console.error('Error fetching random word:', error);
    } finally {
      setIsFetchingWord(false);
    }
  };

  const handleGuess = (letter: string) => {
    if (!selectedWord) return;
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
      setMessage(`Game Over! The word was: ${selectedWord}`);
    }
  };

  return (
    <div className="container is-max-desktop">
      <div className="hangman-game has-text-centered">
        <div className="hangman-word mb-4">
          {guessedWord.split('').map((letter, index) => (
            <span key={index} className="letter is-size-3">
              {letter}
            </span>
          ))}
        </div>
        <div className="hangman-wrong-guesses mb-4">
          {wrongGuesses.length > 0 && (
            <p>Wrong guesses: {wrongGuesses.join(', ')}</p>
          )}
        </div>
        <div className="hangman-buttons">
          <button
            className="button is-medium is-link mb-4"
            onClick={fetchRandomWord}
            disabled={isFetchingWord}
          >
            {isFetchingWord ? 'Fetching Word...' : 'New Word'}
          </button>
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((letter) => (
            <button
              key={letter}
              className="button is-medium is-dark mx-1"
              onClick={() => handleGuess(letter)}
              disabled={
                !selectedWord ||
                isGameOver ||
                guessedWord.includes(letter) ||
                wrongGuesses.includes(letter)
              }
            >
              {letter}
            </button>
          ))}
        </div>
        {isGameOver && <p className="message mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default HangmanGame;
