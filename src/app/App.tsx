import React, { createContext, useEffect, useState } from 'react'

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

export const GuessedLettersContext = createContext<[string[], (x: string[]) => void] | null>(null!);
export const MissedLettersContext = createContext<[string[], (x: string[]) => void] | null>(null!);

export default function App() {
  const word = 'THE MOST IMPORTANT';
  const [selectedWord, setSelectedWord] = useState(word);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [missedLetters, setMissedLetters] = useState<string[]>([]);


  useEffect(() => {
    document.body.addEventListener('keydown', e => keyInputHandler(guessedLetters, setGuessedLetters, e, selectedWord, missedLetters, setMissedLetters))
  }, [])

  return (
    <GuessedLettersContext.Provider value={[guessedLetters, setGuessedLetters]}>
      <MissedLettersContext.Provider value={[missedLetters, setMissedLetters]}>
        <div id='app-container'>
          <Drawing />
          <WordInput
            word={selectedWord}
          />
        </div>
      </MissedLettersContext.Provider>
    </GuessedLettersContext.Provider>
  )
}

function keyInputHandler(
  guessedLetters: string[],
  setGuessedLetters: (x: string[]) => void,
  e: KeyboardEvent,
  selectedWord: string,
  missedLetters: string[],
  setMissedLetters: (x: string[]) => void,
) {

  let updatedGuessedLetters = guessedLetters;
  let updatedMissedLetters = missedLetters;
  let currentKey = e.key.toUpperCase()

  if (currentKey.length !== 1) { return }
  if (currentKey > 'Z' || currentKey < 'A') { return }
  if (updatedGuessedLetters.includes(currentKey) ||
    updatedMissedLetters.includes(currentKey)
  ) { return }

  if (selectedWord.toUpperCase().includes(currentKey)) {
    updatedGuessedLetters.push(currentKey);
    setGuessedLetters(structuredClone(updatedGuessedLetters));
  } else {
    updatedMissedLetters.push(currentKey);
    setMissedLetters(structuredClone(updatedMissedLetters));
  }
}