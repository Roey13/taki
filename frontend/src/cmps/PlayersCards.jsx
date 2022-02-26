import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleOpenTaki, toggleGameDirection } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';
import { handleSpecial } from '../helpers/handleSpecial.js';
import { GetCardImg } from './GetCardImg';

export function PlayersCards({ card, isTurn }) {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, isOpenTaki, gameDirection } = useSelector(state => state.cardsModule)

    const playTurn = (card) => {
        if (isOpenTaki.open) {

            const currPlayersDeck = playersDecks[playersTurn - 1].deck
            let isColorIncluded = 0
            currPlayersDeck.map((card) => {
                if (card.cardColor.includes(isOpenTaki.color)) {
                    isColorIncluded++
                }
            })
            if (isColorIncluded > 1) {
                handlePlayersDeck()
            } else {
                handlePlayersDeck()
                setNextTurn()
                dispatch(toggleOpenTaki({ open: false, color: '' }))
            }


        } else {
            if (playingDeck.length > 1 && playingDeck[1].cardName.includes('tempColor')) {
                let tempPlayingDeck = playingDeck.splice(1, 1)
                dispatch(getPlayingDeck(tempPlayingDeck))
            }
            handlePlayersDeck()
            if (card.isSpecial) handleSpecial()
            else setNextTurn()
            
        }
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

    const handlePlayersDeck = () => {
        if (checkIfLegal(card, playingDeck)) {
            playingDeck.unshift(card)
            dispatch(getPlayingDeck(playingDeck))

            const currPlayersDeck = playersDecks[playersTurn - 1].deck

            let cardIdx
            currPlayersDeck.map((currCard, i) => {
                if (currCard.cardName === card.cardName) cardIdx = i
            })

            currPlayersDeck.splice(cardIdx, 1)
        }
    }

    const handleSpecial = () => {

        const { shape } = card

        if (shape === 'plus' || shape === 'king') return

        if (shape === 'revert') handleRevert()

    }

    const handleRevert = () => {
        if (gameDirection === 'forward'){
            dispatch(toggleGameDirection('backwards'))
            if (playersTurn === 1) {
                dispatch(setPlayersTurn(+numberOfPlayers))
            } else {
                dispatch(setPlayersTurn(playersTurn - 1))
            }
        }else {
            dispatch(toggleGameDirection('forward'))
            if (playersTurn == numberOfPlayers) {
                dispatch(setPlayersTurn(1))
            } else {
                dispatch(setPlayersTurn(playersTurn + 1))
            }
        }


    }


    if (isTurn) {
        return <div onClick={() => playTurn(card)} style={{ cursor: 'pointer' }}><GetCardImg card={card} /></div>
    } else {
        return <div><GetCardImg card={card} /></div>
    }

}



// if (handleSpecial(card)) {
//     const currClr = card.cardColor[0]
//     dispatch(toggleOpenTaki({ open: true, color: currClr }))
//     return
// }