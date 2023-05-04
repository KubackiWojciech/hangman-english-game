import React, { useState } from 'react'

import './app.sass'
import Drawing from '../drawing/Drawing'
import WordInput from '../wordInput/WordInput'

export default function App() {
  const word = 'the most important';
  const [selectedWord, setSelectedWord] = useState(word);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  return (
    <div id='app-container'
      onKeyDown={e => {
        console.log('dupa')
        keyInputHandler({guessedLetters, setGuessedLetters, e})
      }}
    >
        <Drawing />
        <WordInput 
        word={selectedWord}
        guessedLetters={guessedLetters}
        />
    </div>
  )
}

interface keyInputHandlerParams {
  guessedLetters: string[],
  setGuessedLetters: (x: string[]) => void,
  e: React.KeyboardEvent
}

function keyInputHandler(param: keyInputHandlerParams) {
  console.log('param.e.code')
  console.log(param.e.code)
}