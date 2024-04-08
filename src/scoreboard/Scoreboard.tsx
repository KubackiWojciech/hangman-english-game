import React, { useContext } from 'react'
import { GlobalScoreContext, TyposContext } from '../app/App';

import './scoreboard.sass';

export default function Scoreboard() {
    const [globalScore, setGlobalScore] = useContext(GlobalScoreContext);
    const [typos, setTypos] = useContext(TyposContext);

    return (
        <div id="score-board">
            <h1>{'Score: ' + globalScore}</h1>
            <h1>{'typos: ' + typos}</h1>
        </div>
    )
}
