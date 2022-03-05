import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn, togglePlus2Mode, setDeckDraw } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'

export function Draw() {

    const dispatch = useDispatch()
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
    } = useSelector(state => state.cardsModule)

    const drawCard = () => {
        if (!changeColorMode) {
            if (!plus2Mode) {
                if (shuffledDeck[0].cardName === 'tempColor' || shuffledDeck[0].cardName === 'tempTaki') {
                    shuffledDeck.splice(0, 1)
                }

                const drawOne = shuffledDeck.splice(0, 1)
                const tempPlayersDecks = playersDecks
                const currPlayersDeck = tempPlayersDecks[playersTurn - 1].deck;
                currPlayersDeck.push(drawOne[0])
                dispatch(getPlayersDecks(tempPlayersDecks))
                setNextTurn()
            } else {
                drawPlus2()
            }
        }
    }

    const drawPlus2 = () => {
        let drawCards = shuffledDeck.splice(0, +deckDraw)
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
                console.log('card', card);
                currPlayersDeck.push(card)
            })
            console.log('currPlayersDeck', currPlayersDeck);
            dispatch(getPlayersDecks(tempPlayersDecks))

            setNextTurn()
        }
        dispatch(togglePlus2Mode(false))
        dispatch(setDeckDraw(0))
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

    return <img src="imgs/stack.svg" alt="" onClick={drawCard} style={{ cursor: 'pointer' }} />
}