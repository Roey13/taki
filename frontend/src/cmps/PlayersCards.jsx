import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';
import { handleSpecial } from '../helpers/handleSpecial.js';
import { GetCardImg } from './GetCardImg';

export function PlayersCards({ card, isTurn }) {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers } = useSelector(state => state.cardsModule)

    const playTurn = (card) => {

        if (playingDeck[0].cardName.includes('tempColor')){
            let tempPlayingDeck = playingDeck.splice(0, 1)
            dispatch(getPlayingDeck(tempPlayingDeck))
        }

        const TempPlayingDeck = playingDeck
        if (checkIfLegal(card, TempPlayingDeck)) {
            TempPlayingDeck.unshift(card)
            dispatch(getPlayingDeck(TempPlayingDeck))

            let tempPlayersDecks = playersDecks
            const currPlayersDeck = tempPlayersDecks[playersTurn - 1].deck

            let cardIdx
            currPlayersDeck.map((currCard, i) => {
                if (currCard.cardName === card.cardName) cardIdx = i
            })

            currPlayersDeck.splice(cardIdx, 1)

            if (card.isSpecial){
                handleSpecial(card)
            }else{
                if (playersTurn == numberOfPlayers) {
                    dispatch(setPlayersTurn(1))
                } else {
                    dispatch(setPlayersTurn(playersTurn + 1))
                }
            }
        }
    }

    if (isTurn) {
        return <div onClick={() => playTurn(card)} style={{ cursor: 'pointer' }}><GetCardImg card={card}/></div>
    } else {
        return <div><GetCardImg card={card}/></div>
    }

}