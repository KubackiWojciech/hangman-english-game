import React, { createContext, useEffect, useState } from 'react'

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

export const guessedLettersContext = createContext<string[]>([])

export default function App() {
  const word = 'the most important';
  const [selectedWord, setSelectedWord] = useState(word);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  useEffect(() => {
    document.body.addEventListener('keydown', e => {
      keyInputHandler(guessedLetters, setGuessedLetters, e)
    })
  }, [])

  return (
    <div id='app-container'>
      <span>{guessedLetters}</span>
      <Drawing />
      <WordInput
        word={selectedWord}
        guessedLetters={guessedLetters}
      />
    </div>
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