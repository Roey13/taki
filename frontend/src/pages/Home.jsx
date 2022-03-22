/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn, togglePlus2Mode, setDeckDraw, toggleOpenTaki } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'
import { eventBusService } from '../services/eventBusService.js';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'

export function Home() {

    const [numberOfPlayers, setNumberOfPlayers] = useState(4)
    const [isReady, setIsReady] = useState(false)
    const roomId = uuidv4()

    const updateNumberOfPlayers = (ev) => {
        setNumberOfPlayers(+ev.target.value)
    }

    const createLink = () => {
        setIsReady(true)
    }

    return (
        <div className="home-container">
            <button onClick={createLink}>Create Game</button>
            <input type="number" value={numberOfPlayers} min="2" max="4" onChange={updateNumberOfPlayers}></input>
            {isReady && <Link to={{pathname: `/room/${roomId}/players/${numberOfPlayers}`, state: {roomId: roomId, numberOfPlayers: numberOfPlayers}}}>Enter Game</Link>}
        </div>
    )
}