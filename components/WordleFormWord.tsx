import { useState } from 'react';

import styles from '../styles/WordleForm.module.css';

export enum LetterStatus {
  WHITE = "white",
  GREEN = "green",
  YELLOW = "yellow",
  GRAY = "gray"
}

export default function WordleFormWord(props: {letter: string, status: LetterStatus, onStatusChange: (newStatus: LetterStatus) => void}) {
  const { letter, status, onStatusChange } = props;

  const handleClick = () => {
    if (letter !== '') {
      switch (status) {
        case LetterStatus.WHITE:
          onStatusChange(LetterStatus.GREEN);
          break;
        case LetterStatus.GREEN:
          onStatusChange(LetterStatus.YELLOW);
          break;
        case LetterStatus.YELLOW:
          onStatusChange(LetterStatus.GRAY);
          break;
        case LetterStatus.GRAY:
          onStatusChange(LetterStatus.WHITE);
          break;
      }
    }
  }

  return (
    <div
      className={[styles.letter, styles[status]].join(' ')}
      onClick={handleClick}
    >
      {letter}
    </div>
  );
}
