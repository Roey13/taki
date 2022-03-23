/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { PlayersCards } from '../cmps/PlayersCards'
import { eventBusService } from '../services/eventBusService.js';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { setNumberOfPlayers } from '../store/actions/cardsActions.js'


export function Home() {

    const dispatch = useDispatch()

    const [playersAmount, setPlayersAmount] = useState(4)
    const [isReady, setIsReady] = useState(false)
    const roomId = uuidv4()

    const updatePlayersAmount = (ev) => {
        setPlayersAmount(+ev.target.value)
    }

    const createLink = () => {
        dispatch(setNumberOfPlayers(playersAmount))
        setIsReady(true)
    }

    return (
        <div className="home-container">
            <button onClick={createLink}>Create Game</button>
            <input type="number" value={playersAmount} min="2" max="4" onChange={updatePlayersAmount}></input>
            {isReady && <Link to={`/room/${roomId}`}>Enter Game</Link>}
        </div>
    )
}