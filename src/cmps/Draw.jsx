/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn, togglePlus2Mode, setDeckDraw } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'

export function Draw({game, updateGame}) {

    const {
        cardDeck,
        initDeck,
        playersDecks,
        playingDeck,
        playersTurn,
        numberOfPlayers,
        gameDirection,
        deckDraw,
        plus2Mode,
        changeColorMode
    } = game

    const drawCard = () => {

        let entity

        if (initDeck.length === 2){
            const playingDeckNotFirst = playingDeck.splice (1, playingDeck.length)
            initDeck.push(...playingDeckNotFirst)
            const shuffled = initDeck.sort((a, b) => 0.5 - Math.random())
            entity = {initDeck: shuffled, playingDeck: playingDeck}
            updateGame(entity)
        }
        
        if (initDeck.length === 0) return

        if (!changeColorMode) {
            if (!plus2Mode) {
                if (initDeck[0].cardName === 'tempColor' || initDeck[0].cardName === 'tempTaki') {
                    initDeck.splice(0, 1)
                }

                const drawOne = initDeck.splice(0, 1)
                const tempPlayersDecks = playersDecks
                const currPlayersDeck = tempPlayersDecks[playersTurn - 1].deck;
                currPlayersDeck.push(drawOne[0])
                entity = {playersDecks: tempPlayersDecks}
                updateGame(entity)
                setNextTurn()
            } else {
                drawPlus2()
            }
        }
    }

    const drawPlus2 = () => {
        let entity
        let drawCards = initDeck.splice(0, +deckDraw)
        drawCards.map((card, i) => {
            if (card.cardName === 'tempColor' || card.cardName === 'tempTaki') {
                drawCards.splice(i, 1)
            }
        })
        if (drawCards.length != deckDraw) drawPlus2()
        else {
            const tempPlayersDecks = playersDecks
            const currPlayersDeck = tempPlayersDecks[playersTurn - 1].deck;
            drawCards.map((card) => {
                currPlayersDeck.push(card)
            })
            entity = {playersDecks: tempPlayersDecks}
            updateGame(entity)

            setNextTurn()
        }
        entity = {plus2Mode: false, deckDraw: 0}
        updateGame(entity)
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

    return <img className="draw-stack" src="imgs/stack.svg" alt="" onClick={drawCard} style={{ cursor: 'pointer' }} />
}