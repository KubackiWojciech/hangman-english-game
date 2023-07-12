import React from 'react'
import { gameStatus } from '../app/App'

import './gameOver.sass';

export default function GameOver(param: { gameStatus: gameStatus }) {
    return (
        param.gameStatus !== gameStatus.lasts &&
        <div id='game-over-container' style={{color: (param.gameStatus === gameStatus.lost ? 'red' : 'green')}}>
            {param.gameStatus === gameStatus.lost ? 'Lost' : 'Win'}
        </div>
    )
}
