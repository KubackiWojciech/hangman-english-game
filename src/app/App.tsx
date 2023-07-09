import React, { StrictMode, createContext, useEffect, useState } from 'react'
import _, { delay } from 'lodash';

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

import phrases from './phrases.json';

export const GuessedLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const MissedLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const RequiredLettersContext = createContext<[string[], (x: string[]) => void]>(null!);

enum gameStatus {
  won = 'won',
  lost = 'lost',
  lasts = 'lasts'
}

export default function App() {
  const [selectedWord, setSelectedWord] = useState('the most important');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [missedLetters, setMissedLetters] = useState<string[]>([]);
  const [requiredLetters, setRequiredLetters] = useState<string[]>(generateRequiredLetters(selectedWord));
  const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus.lasts)

  useEffect(() => {
    document.body.addEventListener('keydown', keyInputHandler);
    return () => {
      document.body.removeEventListener('keydown', keyInputHandler);
    }
  }, [currentGameStatus]);

  function keyInputHandler(e: KeyboardEvent) {
    let currentKey = e.key.toUpperCase();
  
    if (currentGameStatus !== gameStatus.lasts) { return }
    if (currentKey.length !== 1) { return }
    if (currentKey > 'Z' || currentKey < 'A') { return }
    if (guessedLetters.includes(currentKey) ||
      missedLetters.includes(currentKey)
    ) { return }
  
    if (requiredLetters.includes(currentKey)) {
      let updatedGuessedLetters = guessedLetters;
      updatedGuessedLetters.push(currentKey);
      updatedGuessedLetters.sort();
      setGuessedLetters(structuredClone(updatedGuessedLetters));
      if (_.isEqual(requiredLetters, updatedGuessedLetters)) {
        wonGame();
      }
    } else {
      let updatedMissedLetters = missedLetters;
      updatedMissedLetters.push(currentKey);
      setMissedLetters(structuredClone(updatedMissedLetters));
      if (missedLetters.length >= 9) {
        lostGame();
      }
    }
  }
  
  function lostGame() {
    setCurrentGameStatus(gameStatus.lost);
    setTimeout(() => {
      startNewGame();
    }, 700);
  };
  
  function wonGame() {
    setCurrentGameStatus(gameStatus.won);
    setTimeout(() => {
      startNewGame();
    }, 700);
  };
  
  function startNewGame() {
    let newWord = phrases[Math.floor(phrases.length * Math.random())];
    setSelectedWord(newWord[1]);
    setRequiredLetters(generateRequiredLetters(newWord[1]));
    setCurrentGameStatus(gameStatus.lasts);
    setGuessedLetters(structuredClone([]));
    setMissedLetters(structuredClone([]));
  };

  return (
    <GuessedLettersContext.Provider value={[guessedLetters, setGuessedLetters]}>
      <MissedLettersContext.Provider value={[missedLetters, setMissedLetters]}>
        <RequiredLettersContext.Provider value={[requiredLetters, setRequiredLetters]}>
          <div id='app-container'>
            {
              currentGameStatus === gameStatus.lasts ?
                <>
                  <Drawing />
                  <button
                    onClick={() => setGuessedLetters([])}
                  >CLEAR GUESSED LETTERS</button>
                  <WordInput
                    word={selectedWord}
                  />
                </>
                : currentGameStatus === gameStatus.lost ?
                  <span>you lost</span>
                  : <span>you won</span>
            }
          </div>
        </RequiredLettersContext.Provider>
      </MissedLettersContext.Provider>
    </GuessedLettersContext.Provider>
  )
}

function generateRequiredLetters(word: string) {
  return word
  .toUpperCase()
  .split('')
  .filter(x => x !== ' ')
  .filter((x, pos, self) => self.indexOf(x) === pos)
  .sort();
}