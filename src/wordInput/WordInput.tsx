import React, { useContext, useEffect } from 'react'

import './wordInput.sass'
import { GuessedLettersContext, specialChars } from '../app/App'


interface params {
    word: string
}

export default function WordInput(param: params) {
    const [guessedLetters, setGuessedLetters] = useContext(GuessedLettersContext);
    console.log(param.word.toUpperCase().split(''))

    return (
        <div id='word-input-container'>
            {
                param.word.toUpperCase().split('').map((letter, index) => (
                    <div className={!specialChars.includes(letter) ? "letter container" : "space container"} key={index}>{
                        guessedLetters.map(x => 
                            x.toUpperCase())
                            .includes(letter.toUpperCase()) ||
                            specialChars.includes(letter) ? letter : null
                    }</div>
                ))
            }
        </div>
    )
}
