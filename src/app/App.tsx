import React, { StrictMode, createContext, useEffect, useState } from 'react'
import _, { create, delay } from 'lodash';

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

import phrases from './phrases.json';

export const GuessedLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const MissedLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const RequiredLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const PolishTranslationContext = createContext<string>(null!);

export const specialChars = [' ', '.', ',', '?'];

enum gameStatus {
  won = 'won',
  lost = 'lost',
  lasts = 'lasts'
}

export default function App() {
  const firstPhrase = phrases[Math.floor(phrases.length * Math.random())];
  const [selectedWord, setSelectedWord] = useState(firstPhrase[1]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [missedLetters, setMissedLetters] = useState<string[]>([]);
  const [requiredLetters, setRequiredLetters] = useState<string[]>(generateRequiredLetters(firstPhrase[1]));
  const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus.lasts);
  const [polishTranslation, setPolishTranslation] = useState(firstPhrase[0]);

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
    // let newWord = phrases[10]; //to test specific phrase
    setSelectedWord(newWord[1]);
    setPolishTranslation(newWord[0]);
    setRequiredLetters(structuredClone(generateRequiredLetters(newWord[1])));
    setCurrentGameStatus(gameStatus.lasts);
    setGuessedLetters(structuredClone([]));
    setMissedLetters(structuredClone([]));
  };

  return (
    <GuessedLettersContext.Provider value={[guessedLetters, setGuessedLetters]}>
      <MissedLettersContext.Provider value={[missedLetters, setMissedLetters]}>
        <RequiredLettersContext.Provider value={[requiredLetters, setRequiredLetters]}>
          <PolishTranslationContext.Provider value={polishTranslation}>
            <div id='app-container'>
              {
                currentGameStatus === gameStatus.lasts ?
                  <>
                    <Drawing />
                    <WordInput
                      word={selectedWord}
                    />
                  </>
                  : currentGameStatus === gameStatus.lost ?
                    <span>you lost</span>
                    : <span>you won</span>
              }
            </div>
          </PolishTranslationContext.Provider>
        </RequiredLettersContext.Provider>
      </MissedLettersContext.Provider>
    </GuessedLettersContext.Provider>
  )
}

function generateRequiredLetters(word: string) {
  return word
    .toUpperCase()
    .split('')
    .filter(x => !specialChars.includes(x))
    .filter((x, pos, self) => self.indexOf(x) === pos)
    .sort();
}