import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, toggleVictory } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'
import { Draw } from '../cmps/Draw'
import { GetCardImg } from '../cmps/GetCardImg'
import { HandleChangeColor } from '../cmps/HandleChangeColor'
import { EndTurn } from '../cmps/EndTurn.jsx';
import { Victory } from '../cmps/Victory.jsx';

export function Game() {

    const dispatch = useDispatch()
    const {
        cardDeck,
        shuffledDeck,
        playersDecks,
        playingDeck,
        playersTurn,
        numberOfPlayers,
        gameDirection,
        plus2Mode,
        deckDraw,
        changeColorMode,
        isOpenTaki,
        isVictory
    } = useSelector(state => state.cardsModule)

    const currTurnStyle = { backgroundColor: '#00d0ff' }

    useEffect(() => {
        dispatch(getCardDeck())
    }, [dispatch])

    useEffect(() => {
        if (cardDeck) {
            const shuffled = cardDeck.sort((a, b) => 0.5 - Math.random())
            dispatch(getShuffledDeck(shuffled))
        }
    }, [cardDeck, dispatch])

    const startGame = () => {
        const playerDeck = shuffledDeck.splice(0, 8 * numberOfPlayers)
        const allDecks = []
        const players = []

        for (let i = 0; i < playerDeck.length; i += 8) {
            const chunk = playerDeck.slice(i, i + 8);
            allDecks.push(chunk);
        }

        for (let i = 0; i < allDecks.length; i++) {
            players.push({ playerNo: i + 1, deck: allDecks[i] })
        }


        dispatch(getPlayersDecks(players))
        const newPlayingDeck = shuffledDeck.splice(0, 1)
        dispatch(getPlayingDeck(newPlayingDeck))
    }

    const updateNumberOfPlayers = (ev) => {
        dispatch(setNumberOfPlayers(ev.target.value))
    }

    let isOver = false

    playersDecks.forEach((player) => {
        if (player.deck.length === 0) isOver = true
    })

    if (!isOver) return (
        <div className="game-page-container">
            {!playingDeck &&
                <div className="game-options-container">
                    <button onClick={startGame}>Start Game</button>
                    <input type="number" value={numberOfPlayers} min="2" max="4" onChange={updateNumberOfPlayers}></input>
                </div>}

            <div className="players-container">
                {playersDecks.map((deck, i) => {
                    let style = {}
                    if (deck.playerNo === playersTurn) style = currTurnStyle
                    return <div className={`player-container-${deck.playerNo}`} key={i}>
                        <div style={style}>Player No. {deck.playerNo}</div>
                        {deck.deck.map((card) => {
                            return (
                                <PlayersCards card={card} isTurn={deck.playerNo === playersTurn} key={card.cardName} />
                            )
                        })}
                    </div>
                })}
            </div>


            {playingDeck &&
                <div className="playing-area">
                    {gameDirection}
                    {deckDraw}
                    {isOpenTaki.open && !changeColorMode && <EndTurn />}
                    {plus2Mode && <div>+2MODE!!!</div>}
                    <GetCardImg card={playingDeck[0]} className={'playing-deck'} />
                    <Draw />
                    {changeColorMode && <HandleChangeColor />}
                </div>}

        </div>
    )
    else return <Victory />
}
