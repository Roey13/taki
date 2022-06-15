import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleOpenTaki, toggleGameDirection, togglePlus2Mode, setDeckDraw, toggleColorMode, toggleVictory } from '../store/actions/cardsActions.js'
import { checkIfLegal } from '../helpers/checkIfLegal.js';
import { GetCardImg } from './GetCardImg';
import { eventBusService } from '../services/eventBusService.js';
import { EndTurn } from './EndTurn.jsx';

export function PlayersCards({game, updateGame}) {

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, isOpenTaki, gameDirection, plus2Mode, deckDraw, changeColorMode, isVictory } = game

    const playTurn = (card, playersNum) => {

        let entity

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
                    entity = {isOpenTaki: { open: false, color: '' }}
                    updateGame(entity)
                    handlePlayersDeck(card)
                    handleSpecial(false, card)
                }
                else if (isColorIncluded === 1) {
                    handlePlayersDeck(card)
                    setNextTurn()
                    entity = {isOpenTaki: { open: false, color: '' }}
                    updateGame(entity)
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

        let entity

        if (card.shape === 'king') {
            entity = {plus2Mode: false, deckDraw: 0}
            updateGame(entity)
            handlePlayersDeck(card)
        } else {
            handlePlayersDeck(card)
            entity = {deckDraw: deckDraw + 2}
            updateGame(entity)
            setNextTurn()
        }

    }


    const setNextTurn = () => {

        let entity

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

    const handlePlayersDeck = (card) => {


        if (checkIfLegal(card, playingDeck, isOpenTaki)) {
            playingDeck.unshift(card)

            const entity = {playingDeck: playingDeck}
            updateGame(entity)

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

            if (shape === 'changeColor') {
                const entity = {changeColorMode: true}
                updateGame(entity)
            }

            if (shape === 'plus' || shape === 'king') return

            if (shape === 'revert') handleRevert()

            if (shape === 'taki' && cardColor.length === 1) handleTaki(card)

            if (shape === 'taki' && cardColor.length > 1) handleSuperTaki(card)

            if (shape === 'stop') handleStop()

            if (shape === '+2') handlePlus2()
        }

    }

    const handleTaki = (card) => {

        let entity

        const currClr = card.cardColor[0]
        const currPlayersDeck = playersDecks[playersTurn - 1].deck
        let isColorIncluded = 0
        currPlayersDeck.map((currCard) => {
            if (currCard.cardColor.includes(currClr)) {
                isColorIncluded++
            }
        })
        if (isColorIncluded === 0) {
            entity = {isOpenTaki: { open: true, color: currClr }}
            updateGame(entity)
            handlePlayersDeck(card)
            setNextTurn()
        } else {
            entity = {isOpenTaki: { open: true, color: currClr }}
            updateGame(entity)
        }
    }

    const handleRevert = () => {

        let entity

        if (gameDirection === 'forward') {
            entity = {gameDirection: 'backwards'}
            updateGame(entity)
            if (playersTurn === 1) {
                entity = {playersTurn: +numberOfPlayers}
                updateGame(entity)
            } else {
                entity = {playersTurn: playersTurn - 1}
                updateGame(entity)
            }
        } else {
            entity = {gameDirection: 'forward'}
            updateGame(entity)
            if (playersTurn == numberOfPlayers) {
                entity = {playersTurn: 1}
                updateGame(entity)
            } else {
                entity = {playersTurn: playersTurn + 1}
                updateGame(entity)
            }
        }
    }

    const handleStop = () => {

        let entity

        let playersAmount = +numberOfPlayers
        if (gameDirection === 'forward') {
            if (playersTurn === playersAmount) {
                entity = {playersTurn: 2}
            } else if (playersTurn === playersAmount - 1) {
                entity = {playersTurn: 1}
            } else {
                entity = {playersTurn: playersTurn + 2}
            }
        } else {
            if (playersTurn === 1) {
                entity = {playersTurn: playersAmount - 1}
            } else if (playersTurn === 2) {
                entity = {playersTurn: playersAmount}
            } else {
                entity = {playersTurn: playersTurn - 2}
            }
        }
        updateGame(entity)
    }

    const handlePlus2 = () => {
        const entity = {deckDraw: deckDraw +2, plus2Mode: true}
        updateGame(entity)
        setNextTurn()
    }

    const handleSuperTaki = () => {
        let entity
        const currClr = playingDeck[1].cardColor[0]
        if (playingDeck[1].cardColor.length === 1) {
            entity = {isOpenTaki: { open: true, color: currClr }}
            playingDeck.unshift({
                cardName: 'tempTaki', cardColor: [currClr], isSpecial: true, shape: 'taki',
            })
        } else {
            entity = {
                changeColorMode: true,
                isOpenTaki: { open: true, color: '' }
            }
        }
        updateGame(entity)
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
            {isOpenTaki.open && !changeColorMode && <EndTurn game={game} updateGame={updateGame}/>}
        </div>
    )



}