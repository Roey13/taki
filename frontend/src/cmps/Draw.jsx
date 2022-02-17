import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'

export function Draw(){

    const dispatch = useDispatch()
    const {
        cardDeck,
        shuffledDeck,
        playersDecks,
        playingDeck,
        playersTurn,
        numberOfPlayers
    } = useSelector(state => state.cardsModule)

    const drawCard = () => {
        const drawOne = shuffledDeck.splice(0, 1)
        const tempPlayersDecks = playersDecks
        const currPlayersDeck = tempPlayersDecks[playersTurn-1].deck;
        currPlayersDeck.push(drawOne[0])
        dispatch(getPlayersDecks(tempPlayersDecks))
        
        if (playersTurn == numberOfPlayers) {
            dispatch(setPlayersTurn(1))
        } else {
            dispatch(setPlayersTurn(playersTurn + 1))
        }
    }

    return <button className="drawBtn" onClick={drawCard}>Draw</button>
}