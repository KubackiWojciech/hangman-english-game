import React, { createContext, useEffect, useState } from 'react'

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

export const GuessedLettersContext = createContext<[string[], (x: string[]) => void] | null>(null!);

export default function App() {
  const word = 'THE MOST IMPORTANT';
  const [selectedWord, setSelectedWord] = useState(word);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  useEffect(() => {
    document.body.addEventListener('keydown', e => {
      keyInputHandler(guessedLetters, setGuessedLetters, e)
    })
  }, [])

  return (
    <GuessedLettersContext.Provider value={[guessedLetters, setGuessedLetters]}>
      <div id='app-container'>
        <Drawing />
        <WordInput
          word={selectedWord}
          guessedLetters={guessedLetters}
        />
      </div>
    </GuessedLettersContext.Provider>
  )
}

function keyInputHandler(guessedLetters: string[], setGuessedLetters: (x: string[]) => void, e: KeyboardEvent) {
  let updatedGuessedLetters = guessedLetters;
  if (!updatedGuessedLetters.includes(e.key)) {
    updatedGuessedLetters.push(e.key);
    setGuessedLetters(structuredClone(updatedGuessedLetters));
  } else {
    console.log('You already have typed this letter')
  }
}