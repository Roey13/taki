import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck,  getPlayersDecks, getPlayingDeck } from '../store/actions/cardsActions.js'

export function Game() {

    const dispatch = useDispatch()
    const {
        cardDeck,
        shuffledDeck,
        playersDecks,
        playingDeck,
        playersTurn
    } = useSelector(state => state.cardsModule)

    const [numberOfPlayers, setNumberOfPlayers] = useState(2)

    const currTurnStyle = {backgroundColor: '#00d0ff'}

    useEffect(() => {
        dispatch(getCardDeck())
    }, [dispatch])

    useEffect(() => {
        if (cardDeck){
            const shuffled = cardDeck.sort((a, b) => 0.5 - Math.random())
            dispatch(getShuffledDeck(shuffled))
        }
    }, [cardDeck])

    const startGame = () => {
        const playerDeck = shuffledDeck.splice(0, 8 * numberOfPlayers)
        const allDecks = []
        const players = []
        for (let i = 0; i < playerDeck.length; i += 8) {
            const chunk = playerDeck.slice(i, i + 8);
            allDecks.push(chunk);
        }

        for (let i = 0; i < allDecks.length; i++){
            players.push({playerNo: i+1, deck: allDecks[i]})
        }


        dispatch(getPlayersDecks(players))
        const newPlayingDeck = shuffledDeck.splice(0, 1)
        dispatch(getPlayingDeck(newPlayingDeck))
    }

    const updateNumberOfPlayers = (ev) => {
        setNumberOfPlayers(ev.target.value);
    }
    
    return (
        <div className="game-page-container">
            {!playingDeck &&
            <div className="game-options-container">
            <button onClick={startGame}>Start Game</button>
            <input type="number" value={numberOfPlayers} min="2" max="4" onChange={updateNumberOfPlayers}></input>
            </div>}
            <div className="players-container">
                {playersDecks.map((deck) => {
                    let style = {}
                    if (deck.playerNo === playersTurn) style = currTurnStyle
                    return <div className="player-container">
                        <div style={style}>Player No. {deck.playerNo}</div>
                        {deck.deck.map((card) => {
                            return (
                                <div>
                                    <div>{card.cardName}</div>
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>
            {playingDeck && <div>{playingDeck[0].cardName}</div>}
        </div>
    )
}
