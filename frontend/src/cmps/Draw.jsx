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
        numberOfPlayers,
        gameDirection
    } = useSelector(state => state.cardsModule)

    const drawCard = () => {
        if (shuffledDeck[0].cardName === 'tempColor' || shuffledDeck[0].cardName === 'tempTaki'){
            shuffledDeck.splice(0, 1)
        }
        
        const drawOne = shuffledDeck.splice(0, 1)
        const tempPlayersDecks = playersDecks
        const currPlayersDeck = tempPlayersDecks[playersTurn-1].deck;
        currPlayersDeck.push(drawOne[0])
        dispatch(getPlayersDecks(tempPlayersDecks))
        
        setNextTurn()
    }

    const setNextTurn = () => {
        if (gameDirection === 'forward'){
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

    return <img src="imgs/stack.svg" alt="" onClick={drawCard} style={{cursor: 'pointer'}}/>
}