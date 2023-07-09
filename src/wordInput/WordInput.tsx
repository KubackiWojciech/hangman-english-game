import React, { useContext, useEffect } from 'react'

import './wordInput.sass'
import { GuessedLettersContext } from '../app/App'

interface params {
    word: string
}

export default function WordInput(param: params) {
    const [guessedLetters, setGuessedLetters] = useContext(GuessedLettersContext);

    return (
        <div id='word-input-container'>
            {
                param.word.toUpperCase().split('').map((letter, index) => (
                    <div className={letter !== ' ' ? "letter container" : "space container"} key={index}>{
                        guessedLetters.map(x => x.toUpperCase()).includes(letter.toUpperCase()) ? letter : null
                    }</div>
                ))
            }
        </div>
    )
}
