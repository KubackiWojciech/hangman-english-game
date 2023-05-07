import React, { useContext, useEffect } from 'react'

import './drawing.sass'
import { GuessedLettersContext, MissedLettersContext } from '../app/App'

export default function Drawing() {
  const [guessedLetters, setGuessedLetters] = useContext(GuessedLettersContext);
  const [missedLetters, setMissedLetters] = useContext(MissedLettersContext);

  // useEffect(() => {
  //   setMissedLetters(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
  // })

  return (
    <div id='drawing-container'>
      <div id="drawing">
        { missedLetters.length >= 1 ? <div data-order={1}></div> : null}
        { missedLetters.length >= 2 ? <div data-order={2}></div> : null}
        { missedLetters.length >= 3 ? <div data-order={3}></div> : null}
        { missedLetters.length >= 4 ? <div data-order={4}></div> : null}
        { missedLetters.length >= 5 ? <div data-order={5}></div> : null}
        { missedLetters.length >= 6 ? <div data-order={6}></div> : null}
        { missedLetters.length >= 7 ? <div data-order={7}></div> : null}
        { missedLetters.length >= 8 ? <div data-order={8}></div> : null}
        { missedLetters.length >= 9 ? <div data-order={9}></div> : null}
      </div>
      <div id="guessed-letters">
        <span>Guessed Letters:</span>
        <span>{guessedLetters}</span>
      </div>
      <div id="missed-letters">
        <span>Missed Letters:</span>
        <span>{missedLetters}</span>
      </div>
    </div>
  )
}
