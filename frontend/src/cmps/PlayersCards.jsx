import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck,  getPlayersDecks, getPlayingDeck, setPlayersTurn } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';

export function PlayersCards({card, isTurn}) {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers} = useSelector(state => state.cardsModule)

    const playTurn = (card) =>{
        const TempPlayingDeck = playingDeck
        if (checkIfLegal(card, TempPlayingDeck)){
        TempPlayingDeck.unshift(card)
        dispatch(getPlayingDeck(TempPlayingDeck))

        let tempPlayersDecks = playersDecks
        const currPlayersDeck = tempPlayersDecks[playersTurn-1].deck

        let cardIdx

        currPlayersDeck.map((currCard, i) =>{
            if (currCard.cardName === card.cardName) cardIdx = i
        })

        currPlayersDeck.splice(cardIdx, 1)

        if (playersTurn == numberOfPlayers) {
            dispatch(setPlayersTurn(1))
        } else {
            dispatch(setPlayersTurn(playersTurn + 1))
        }
        }
    }

    if (isTurn) {
        return<div onClick={()=> playTurn(card)} style={{cursor: 'pointer'}}>{card.cardName}</div>
    } else {
        return<div>{card.cardName}</div>
    }

}