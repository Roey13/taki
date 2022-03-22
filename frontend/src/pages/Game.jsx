/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { PlayersCards } from '../cmps/PlayersCards'
import { Draw } from '../cmps/Draw'
import { GetCardImg } from '../cmps/GetCardImg'
import { HandleChangeColor } from '../cmps/HandleChangeColor'
import { EndTurn } from '../cmps/EndTurn.jsx';
import { Victory } from '../cmps/Victory.jsx';
import { v4 as uuidv4 } from 'uuid';
import { cardDeck } from '../services/cardDeckService.js'
import { useLocation } from 'react-router-dom'

export function Game() {

    const location = useLocation()

    const [game, setGame] = useState({
        roomId: null,
        initDeck: null,
        playersDecks: [],
        playingDeck: null,
        playersTurn: 1,
        numberOfPlayers: null,
        isOpenTaki: { open: false, color: '' },
        gameDirection: 'forward',
        plus2Mode: false,
        deckDraw: 0,
        changeColorMode: false,
        isVictory: false
    })

    useEffect(() => {
        startGame()
    }, [])

    const updateGame = (entity) => {
        setGame(prevGame => ({
            ...prevGame,
            ...entity
        }))
    }

    const startGame = () => {
        const shuffledDeck = cardDeck.sort((a, b) => 0.5 - Math.random())
        const { roomId, numberOfPlayers } = location.state
        const tempPlayersDeck = shuffledDeck.splice(0, 8 * numberOfPlayers)
        const allDecks = []
        const playersDecks = []

        for (let i = 0; i < tempPlayersDeck.length; i += 8) {
            const chunk = tempPlayersDeck.slice(i, i + 8);
            allDecks.push(chunk);
        }

        for (let i = 0; i < allDecks.length; i++) {
            playersDecks.push({ playerNo: i + 1, deck: allDecks[i] })
        }

        const playingDeck = shuffledDeck.splice(0, 1)

        const entity = {
            numberOfPlayers: numberOfPlayers,
            roomId: roomId,
            playersDecks: playersDecks,
            playingDeck: playingDeck,
            initDeck: shuffledDeck
        }

        updateGame(entity)
    }

    game.playersDecks.forEach((player) => {
        if (player.deck.length === 0) {
            const entity = {isVictory: true}
            updateGame(entity)
        }
    })

    const { isVictory, playingDeck, gameDirection, deckDraw, plus2Mode, changeColorMode } = game

    if (!isVictory) return (
        <div className="game-page-container">

            <PlayersCards game={game} updateGame={updateGame} />

            {
                playingDeck &&
                <div className="playing-area">
                    {gameDirection}
                    {deckDraw}
                    {plus2Mode && <div>+2MODE!!!</div>}
                    <GetCardImg card={playingDeck[0]} className={'playing-deck'} />
                    <Draw game={game} updateGame={updateGame}/>
                    {changeColorMode && <HandleChangeColor game={game} updateGame={updateGame}/>}
                </div>
            }

        </div>
    )
    else return <Victory />
}
