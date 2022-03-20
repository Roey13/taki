import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn, togglePlus2Mode, setDeckDraw, toggleOpenTaki } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'
import { eventBusService } from '../services/eventBusService.js';

export function EndTurn({ card }) {
    const dispatch = useDispatch()
    const {
        cardDeck,
        shuffledDeck,
        playersDecks,
        playingDeck,
        playersTurn,
        numberOfPlayers,
        gameDirection,
        deckDraw,
        plus2Mode,
        changeColorMode
    } = useSelector(state => state.cardsModule)

    const handleEndTurn = () => {
        dispatch(toggleOpenTaki({ open: false, color: '' }))
        if (card.isSpecial && card.shape !== 'taki') eventBusService.emit('endTurn', true)
        if (card.shape === 'taki') return
        else setNextTurn()
    }

    const setNextTurn = () => {
        if (gameDirection === 'forward') {
            if (playersTurn == numberOfPlayers) {
                dispatch(setPlayersTurn(1))
            } else {
                dispatch(setPlayersTurn(playersTurn + 1))
            }
        } else {
            if (playersTurn === 1) {
                dispatch(setPlayersTurn(+numberOfPlayers))
            } else {
                dispatch(setPlayersTurn(playersTurn - 1))
            }
        }
    }

    return <div className="end-turn-container">
        <button onClick={handleEndTurn} className="end-turn-btn">End Turn</button>
    </div>
}