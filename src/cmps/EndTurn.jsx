import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn, togglePlus2Mode, setDeckDraw, toggleOpenTaki } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'
import { eventBusService } from '../services/eventBusService.js';

export function EndTurn({ game, updateGame }) {
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
    } = game

    const card = playingDeck[0]

    const handleEndTurn = () => {
        const entity = {isOpenTaki: { open: false, color: '' }}
        if (card.isSpecial && card.shape !== 'taki') eventBusService.emit('endTurn', true)
        if (card.shape === 'taki') return
        else setNextTurn()
    }

    const setNextTurn = () => {

        let  entity

        if (gameDirection === 'forward') {
            if (playersTurn == numberOfPlayers) {
                entity = {playersTurn: 1}
            } else {
                entity = {playersTurn: playersTurn + 1}
            }
        } else {
            if (playersTurn === 1) {
                entity = {playersTurn: +numberOfPlayers}
            } else {
                entity = {playersTurn: playersTurn - 1}
            }
        }

        updateGame(entity)


    }

    return <div className="end-turn-container">
        <button onClick={handleEndTurn} className="end-turn-btn">End Turn</button>
    </div>
}