import React, { createContext, useEffect, useState } from 'react'

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

export const GuessedLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const MissedLettersContext = createContext<[string[], (x: string[]) => void]>(null!);
export const RequiredLettersContext = createContext<[string[], (x: string[]) => void]>(null!);

enum gameStatus {
  won = 'won',
  lost = 'lost',
  lasts = 'lasts'
}

export default function App() {
  const word = 'THE MOST IMPORTANT';
  const [selectedWord, setSelectedWord] = useState(word);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [missedLetters, setMissedLetters] = useState<string[]>([]);
  const [requiredLetters, setRequiredLetters] = useState<string[]>(selectedWord
    .toUpperCase()
    .split('')
    .filter(x => x !== ' ')
    .filter((x, pos, self) => self.indexOf(x) === pos));
  
  const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus.lasts)

  useEffect(() => {
    document.body.addEventListener('keydown', e => keyInputHandler(e));
  }, [])

  function keyInputHandler(e: KeyboardEvent) {
    let updatedGuessedLetters = guessedLetters;
    let updatedMissedLetters = missedLetters;
    let currentKey = e.key.toUpperCase()

    if (currentKey.length !== 1) { return }
    if (currentKey > 'Z' || currentKey < 'A') { return }
    if (updatedGuessedLetters.includes(currentKey) ||
      updatedMissedLetters.includes(currentKey)
    ) { return }

    if (requiredLetters.includes(currentKey)) {
      updatedGuessedLetters.push(currentKey);
      setGuessedLetters(structuredClone(updatedGuessedLetters));
      if (requiredLetters.sort() === updatedGuessedLetters) {
        wonGame();
      }
    } else {
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
  }

  function wonGame() {
    setCurrentGameStatus(gameStatus.won);
    setTimeout(() => {
      startNewGame();
    }, 700);
  }

  function startNewGame() {
    setCurrentGameStatus(gameStatus.lasts);
    setGuessedLetters([]);
    setMissedLetters([]);
  }

  return (
    <GuessedLettersContext.Provider value={[guessedLetters, setGuessedLetters]}>
      <MissedLettersContext.Provider value={[missedLetters, setMissedLetters]}>
        <RequiredLettersContext.Provider value={[requiredLetters, setRequiredLetters]}>
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
        </RequiredLettersContext.Provider>
      </MissedLettersContext.Provider>
    </GuessedLettersContext.Provider>
  )
}