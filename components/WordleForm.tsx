import { useEffect, useState } from 'react';
import words from '../public/words.json';

import styles from '../styles/WordleForm.module.css';
import WordleFormWord, { LetterStatus } from './WordleFormWord';

const wordList = words.map((word: string) => word.toUpperCase());

export default function WordleForm() {
  const emptyRow = () => [
    {letter: '', status: LetterStatus.WHITE},
    {letter: '', status: LetterStatus.WHITE},
    {letter: '', status: LetterStatus.WHITE},
    {letter: '', status: LetterStatus.WHITE},
    {letter: '', status: LetterStatus.WHITE}
  ];

  const [guesses, setGuesses] = useState<Array<Array<{letter: string, status: LetterStatus}>>>([...Array(6)].map(() => emptyRow()));
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: { key: string; metaKey: boolean; preventDefault: () => void; }) => {
      const currentGuesses = [...guesses];
      const currentGuess = currentGuesses[currentRow].map(({letter}) => letter).join('');

      if (event.metaKey) {
        return;
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        if (currentGuess.length > 1 || (currentRow === 0 && currentGuess.length > 0)) {
          currentGuesses[currentRow][currentGuess.length - 1].letter = '';
        } else if (currentRow > 0) {
          currentGuesses[currentRow][0].letter = '';
          setCurrentRow(currentRow - 1);
        }
      } else if (currentGuess.length < 5 && /^[a-z]$/i.test(event.key)) {
        const upperCaseLetter = event.key.toUpperCase();
        currentGuesses[currentRow][currentGuess.length].letter = upperCaseLetter;
        if (currentGuess.length === 4 && currentRow < 5) {
          setCurrentRow(currentRow + 1);
        }
      }

      setGuesses(currentGuesses);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guesses, currentRow]);

  function handleSubmit(event: any) {
    event.preventDefault();
  
    const newPotentialWords: string[] = [];
    const currentGuesses = [...guesses];
  
    wordList.forEach((word) => {
      let potential = true;
  
      if (word.length !== 5) {
        potential = false;
      }
  
      currentGuesses.forEach(guess => {
        guess.forEach(({ letter, status }, i) => {
          if (status === LetterStatus.GREEN && word[i] !== letter) {
            console.log(word, 'green issue', letter, word.indexOf(letter));
            potential = false;
          }
  
          if (status === LetterStatus.YELLOW && (word[i] === letter || word.indexOf(letter) === -1)) {
            console.log(word, 'yellow issue', letter, word.indexOf(letter));
            potential = false;
          }
  
          if (status === LetterStatus.GRAY && word.indexOf(letter) > -1) {
            console.log(word, 'gray issue', letter, word.indexOf(letter));
            potential = false;
          }
        })
      });
  
      if (potential) {
        newPotentialWords.push(word);
      }
    });

    if (newPotentialWords.length > 0) {
      // Pick a random word from the list of potential words
      const randomWord = newPotentialWords[Math.floor(Math.random() * newPotentialWords.length)];
      
      randomWord.split('').forEach((letter, i) => {
        currentGuesses[currentRow][i].letter = letter.toUpperCase();
      });
      setGuesses(currentGuesses);

      if (currentRow < 5) {
        setCurrentRow(currentRow + 1);
      }
    }
  }


  return (
    <div>
      {guesses.map((row, idx) => (
        <div key={idx} className={styles.wordListContainer}>
          {row.map(({letter, status}, i) => (
            <WordleFormWord key={i} letter={letter} status={status} onStatusChange={newStatus => {
              const newGuesses = [...guesses];
              newGuesses[idx][i].status = newStatus;
              setGuesses(newGuesses);
            }} />
          ))}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button
          disabled={guesses[currentRow].map(({letter}) => letter).join('').length !== 0}
          className={styles.button}
          onClick={handleSubmit}>
            Guess
        </button>
      </div>
    </div>
  )
}
