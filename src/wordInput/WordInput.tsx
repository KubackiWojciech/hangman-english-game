import React from 'react'

import './wordInput.sass'

interface params {
    word: string,
    guessedLetters: string[]
}

export default function WordInput(param: params) {
    return (
        <div id='word-input-container'>
            {
                param.word.toUpperCase().split('').map((letter, index) => (
                    <div className="letter-container" key={index}>{letter}</div>
                ))
            }
        </div>
    )
}
