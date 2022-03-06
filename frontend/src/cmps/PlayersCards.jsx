import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleOpenTaki, toggleGameDirection, togglePlus2Mode, setDeckDraw, toggleColorMode } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';
import { handleSpecial } from '../helpers/handleSpecial.js';
import { GetCardImg } from './GetCardImg';

export function PlayersCards({ card, isTurn }) {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, isOpenTaki, gameDirection, plus2Mode, deckDraw, changeColorMode } = useSelector(state => state.cardsModule)

    const playTurn = (card) => {
        if (isOpenTaki.open) {
            console.log('isOpenTaki.color', isOpenTaki.color);
            const currPlayersDeck = playersDecks[playersTurn - 1].deck
            let isColorIncluded = 0
            currPlayersDeck.map((card) => {
                if (card.cardColor.includes(isOpenTaki.color)) {
                    isColorIncluded++
                }
            })
            console.log('isColorIncluded', isColorIncluded);
            if (isColorIncluded === 1 && (card.isSpecial)) {
                console.log('2');
                dispatch(toggleOpenTaki({ open: false, color: '' }))
                handlePlayersDeck()
                handleSpecial()
            }
            else if (isColorIncluded === 1) {
                console.log('3');
                handlePlayersDeck()
                setNextTurn()
                dispatch(toggleOpenTaki({ open: false, color: '' }))
            } else if (isColorIncluded > 1) {
                console.log('4');
                handlePlayersDeck()
            }


        } else if (plus2Mode) {
            if (card.shape === '+2' || card.shape === 'king') handlePlus2Mode()
        } else {
            handlePlayersDeck()
            if (card.isSpecial) handleSpecial()
            else {
                if (checkIfLegal(card, playingDeck)) setNextTurn()
            }
        }
    }

    const handlePlus2Mode = () => {
        if (card.shape === 'king') {
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

        if (checkIfLegal(card, playingDeck)) {

            const { shape, cardColor } = card

            if (shape === 'changeColor') dispatch(toggleColorMode(true))

            if (shape === 'plus' || shape === 'king') return

            if (shape === 'revert') handleRevert()

            if (shape === 'taki' && cardColor.length === 1) handleTaki()

            if (shape === 'taki' && cardColor.length > 1) handleSuperTaki()

            if (shape === 'stop') handleStop()

            if (shape === '+2') handlePlus2()
        }

    }

    const handleTaki = (currClr = card.cardColor[0]) => {
        console.log('currClr', currClr);
        const currPlayersDeck = playersDecks[playersTurn - 1].deck
        let isColorIncluded = 0
        currPlayersDeck.map((currCard) => {
            if (currCard.cardColor.includes(currClr)) {
                isColorIncluded++
            }
        })
        if (isColorIncluded === 0) {
            dispatch(toggleOpenTaki({ open: true, color: currClr }))
            handlePlayersDeck()
            setNextTurn()
        } else {
            dispatch(toggleOpenTaki({ open: true, color: currClr }))
        }
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
        const currClr = playingDeck[1].cardColor[0]
        if (playingDeck[1].cardColor.length === 1) {
            dispatch(toggleOpenTaki({ open: true, color: currClr }))
            playingDeck.unshift({
                cardName: 'tempTaki', cardColor: [currClr], isSpecial: true, shape: 'taki',
            })
            // handleTaki(currClr)
        } else {
            dispatch(toggleColorMode(true))
            dispatch(toggleOpenTaki({ open: true, color: '' }))
            // handleTaki(currClr)
        }
    }

    if (isTurn && !changeColorMode) {
        return <div onClick={() => playTurn(card)} style={{ cursor: 'pointer' }}><GetCardImg card={card} /></div>
    } else {
        return <div><GetCardImg card={card} /></div>
    }

}