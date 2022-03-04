import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleOpenTaki, toggleGameDirection, togglePlus2Mode, setDeckDraw } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';
import { handleSpecial } from '../helpers/handleSpecial.js';
import { GetCardImg } from './GetCardImg';

export function PlayersCards({ card, isTurn }) {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, isOpenTaki, gameDirection, plus2Mode, deckDraw } = useSelector(state => state.cardsModule)

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


        } else if (plus2Mode){
            if (card.shape === '+2' || card.shape === 'king') handlePlus2Mode()
        } else {
            handlePlayersDeck()
            if (card.isSpecial) handleSpecial()
            else setNextTurn()
        }
    }

    const handlePlus2Mode = () => {
        if (card.shape === 'king'){
            dispatch(togglePlus2Mode(false))
            dispatch(setDeckDraw(0))
            handlePlayersDeck()
        } else {
            handlePlayersDeck()
            dispatch(setDeckDraw(deckDraw + 2))
            setNextTurn()
        }

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

        const { shape, cardColor } = card

        if (shape === 'plus' || shape === 'king') return

        if (shape === 'revert') handleRevert()

        if (shape === 'taki' && cardColor.length === 1) {
            const currClr = card.cardColor[0]
            dispatch(toggleOpenTaki({ open: true, color: currClr }))
        }

        if (shape === 'taki' && cardColor.length > 1) {
            handleSuperTaki()
        }

        if (shape === 'stop') handleStop()

        if (shape === '+2') handlePlus2()

    }

    const handleRevert = () => {
        if (gameDirection === 'forward') {
            dispatch(toggleGameDirection('backwards'))
            if (playersTurn === 1) {
                dispatch(setPlayersTurn(+numberOfPlayers))
            } else {
                dispatch(setPlayersTurn(playersTurn - 1))
            }
        } else {
            dispatch(toggleGameDirection('forward'))
            if (playersTurn == numberOfPlayers) {
                dispatch(setPlayersTurn(1))
            } else {
                dispatch(setPlayersTurn(playersTurn + 1))
            }
        }
    }

    const handleStop = () => {
        let playersAmount = +numberOfPlayers
        if (gameDirection === 'forward') {
            if (playersTurn === playersAmount) {
                dispatch(setPlayersTurn(2))
            } else if (playersTurn === playersAmount - 1) {
                dispatch(setPlayersTurn(1))
            } else {
                dispatch(setPlayersTurn(playersTurn + 2))
            }
        } else {
            if (playersTurn === 1) {
                dispatch(setPlayersTurn(playersAmount - 1))
            } else if (playersTurn === 2) {
                dispatch(setPlayersTurn(playersAmount))
            } else {
                dispatch(setPlayersTurn(playersTurn - 2))
            }
        }
    }

    const handlePlus2 = () => {
        dispatch(setDeckDraw(deckDraw + 2))
        dispatch(togglePlus2Mode(true))
        setNextTurn()
    }

    const handleSuperTaki = () => {
        if (playingDeck[1].cardColor.length === 1){
            const currClr = playingDeck[1].cardColor[0]
            console.log('currClr', currClr);
            dispatch(toggleOpenTaki({ open: true, color: currClr }))
            playingDeck.unshift({
                cardName: 'tempTaki', cardColor: [currClr], isSpecial: true , shape: 'taki',
            })
        }
    }



    if (isTurn) {
        return <div onClick={() => playTurn(card)} style={{ cursor: 'pointer' }}><GetCardImg card={card} /></div>
    } else {
        return <div><GetCardImg card={card} /></div>
    }

}