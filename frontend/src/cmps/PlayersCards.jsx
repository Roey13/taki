import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleOpenTaki, toggleGameDirection, togglePlus2Mode, setDeckDraw, toggleColorMode, toggleVictory } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';
import { GetCardImg } from './GetCardImg';
import { eventBusService } from '../services/eventBusService.js';
import { EndTurn } from './EndTurn.jsx';

export function PlayersCards() {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, isOpenTaki, gameDirection, plus2Mode, deckDraw, changeColorMode, isVictory } = useSelector(state => state.cardsModule)

    const playTurn = (card, playersNum) => {

        if (playersNum === playersTurn) {
            if (isOpenTaki.open) {
                const currPlayersDeck = playersDecks[playersTurn - 1].deck
                let isColorIncluded = 0
                currPlayersDeck.map((card) => {
                    if (card.cardColor.includes(isOpenTaki.color)) {
                        isColorIncluded++
                    }
                })
                if (isColorIncluded === 1 && (card.isSpecial)) {
                    dispatch(toggleOpenTaki({ open: false, color: '' }))
                    handlePlayersDeck(card)
                    handleSpecial(false, card)
                }
                else if (isColorIncluded === 1) {
                    handlePlayersDeck(card)
                    setNextTurn()
                    dispatch(toggleOpenTaki({ open: false, color: '' }))
                } else if (isColorIncluded > 1) {
                    handlePlayersDeck(card)
                }


            } else if (plus2Mode) {
                if (card.shape === '+2' || card.shape === 'king') handlePlus2Mode(card)
            } else {
                handlePlayersDeck(card)
                if (card.isSpecial) handleSpecial(false, card)
                else {
                    if (checkIfLegal(card, playingDeck, isOpenTaki)) setNextTurn()
                }
            }
        } else return
    }

    const handlePlus2Mode = (card) => {
        if (card.shape === 'king') {
            dispatch(togglePlus2Mode(false))
            dispatch(setDeckDraw(0))
            handlePlayersDeck(card)
        } else {
            handlePlayersDeck(card)
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

    const handlePlayersDeck = (card) => {
        if (checkIfLegal(card, playingDeck, isOpenTaki)) {
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

    const handleSpecial = (isEndTurn = isOpenTaki.open, card) => {
        eventBusService.on('endTurn', handleSpecial)

        let shape
        let cardColor
        let isLegal

        if (!isEndTurn) {
            shape = card.shape
            cardColor = card.cardColor
            isLegal = checkIfLegal(card, playingDeck, isOpenTaki)
        } else {
            shape = playingDeck[0].shape
            cardColor = playingDeck[0].cardColor
            isLegal = true
        }

        if (isLegal) {

            if (shape === 'changeColor') dispatch(toggleColorMode(true))

            if (shape === 'plus' || shape === 'king') return

            if (shape === 'revert') handleRevert()

            if (shape === 'taki' && cardColor.length === 1) handleTaki(card)

            if (shape === 'taki' && cardColor.length > 1) handleSuperTaki(card)

            if (shape === 'stop') handleStop()

            if (shape === '+2') handlePlus2()
        }

    }

    const handleTaki = (card) => {
        const currClr = card.cardColor[0]
        const currPlayersDeck = playersDecks[playersTurn - 1].deck
        let isColorIncluded = 0
        currPlayersDeck.map((currCard) => {
            if (currCard.cardColor.includes(currClr)) {
                isColorIncluded++
            }
        })
        if (isColorIncluded === 0) {
            dispatch(toggleOpenTaki({ open: true, color: currClr }))
            handlePlayersDeck(card)
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
        } else {
            dispatch(toggleColorMode(true))
            dispatch(toggleOpenTaki({ open: true, color: '' }))
        }
    }

    const currTurnStyle = { backgroundColor: '#00d0ff' }
    return (
        <div className="players-container">
            {playersDecks.map((deck, i) => {
                let style = {}
                if (deck.playerNo === playersTurn) style = currTurnStyle
                return <div className={`player-container-${deck.playerNo}`} key={i}>
                    <div style={style}>Player No. {deck.playerNo}</div>
                    {deck.deck.map((card) => {
                        return (
                            <div onClick={() => playTurn(card, deck.playerNo)} style={{ cursor: 'pointer' }}><GetCardImg card={card} /></div>
                        )
                    })}
                </div>
            })}
            {isOpenTaki.open && !changeColorMode && <EndTurn card={playingDeck[0]}/>}
        </div>
    )



}