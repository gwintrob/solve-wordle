import { useState } from 'react';
import { words } from 'popular-english-words';

import styles from '../styles/WordleForm.module.css';

export default function WordleForm() {
  const [knownLetters, setKnownLetters] = useState("");
  const [requiredLetters, setRequiredLetters] = useState("");
  const [badLetters, setBadLetters] = useState("");
  const [potentialWords, setPotentialWords] = useState<Array<string>>([]);

  function handleSubmit(event: any) {
    event.preventDefault();

    const newPotentialWords: string[] = [];

    words.getMostPopularLength(10000, 5).forEach((word) => {
      let potential = true;

      if (word.length !== 5) {
        potential = false;
      }

      knownLetters.split('').forEach((letter, i) => {
        if (letter !== 'X' && word[i] !== letter) {
          potential = false;
        }
      })

      requiredLetters.split('').forEach(letter => {
        if(word.indexOf(letter) === -1) {
          potential = false;
        }
      })

      badLetters.split('').forEach(letter => {
        if(word.indexOf(letter) > -1) {
          potential = false;
        }
      })

      if (potential) {
        newPotentialWords.push(word);
      }
    });

    setPotentialWords(newPotentialWords);
  }

  return (
    <div>
      <form className={styles.wordleForm} onSubmit={handleSubmit}>
        <div className={styles.formInput}>
          <div>
            <label htmlFor="knownLetters">
              Best Guess{' '}
              <div className={styles.tooltip}>?
                <span className={styles.tooltipText}>Use lowercase for green letters from your Wordle guess. Use uppercase {`"X"`} for gray letters.</span>
              </div>
            </label>
          </div>
          <input
            type="text"
            id="knownLetters"
            name="knownLetters"
            placeholder="sXXrX"
            value={knownLetters}
            onChange={(e) => setKnownLetters(e.target.value)}
          />
        </div>
        <div className={styles.formInput}>
          <div>
            <label htmlFor="requiredLetters">Yellow Letters</label>
          </div>
          <input
            type="text"
            id="requiredLetters"
            name="requiredLetters"
            placeholder="ta"
            value={requiredLetters}
            onChange={(e) => setRequiredLetters(e.target.value)}
          />
        </div>
        <div className={styles.formInput}>
          <div>
            <label htmlFor="badLetters">Other Gray Letters</label>
          </div>
          <input
            type="text"
            id="badLetters"
            name="badLetters"
            placeholder="qpl"
            value={badLetters}
            onChange={(e) => setBadLetters(e.target.value)}
          />
        </div>
        <input type="submit" value="Get suggestions" />
      </form>

      <div className={styles.potentialWords}>
        {potentialWords.slice(0, 10).map((word, i) => {
          return (
            <div className={styles.potentialWord} key={`potential-word-${i}`}>
              {word.split('').map((letter, j) => {
                return (
                  <div
                    className={styles.letter}
                    key={`potential-word-${i}-${j}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  )
}