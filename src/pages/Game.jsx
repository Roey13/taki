import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck } from '../store/actions/cardsActions.js'
import { Loading } from '../helpers/Loading.js'

export function Game() {

    const dispatch = useDispatch()
    const { cardDeck } = useSelector(state => state.cardsModule)
    const [deck, setDeck] = useState([])
    const [numberOfPlayers, setnumberOfPlayer] = useState(2)
    const [playersDecks, setPlayersDecks] = useState([])
    const [currCard, setCurrCard] = useState()

    useEffect(() => {
        dispatch(getCardDeck())
    }, [dispatch])

    useEffect(() => {
        if (cardDeck) setDeck(cardDeck.sort((a, b) => 0.5 - Math.random()))
    }, [cardDeck])

    const startGame = () => {
        dispatch(getCardDeck())
        const playerDeck = deck.splice(0, 8 * numberOfPlayers)
        const allDecks = []
        for (let i = 0; i < playerDeck.length; i += 8) {
            const chunk = playerDeck.slice(i, i + 8);
            allDecks.push(chunk);
        }
        setPlayersDecks(allDecks)
        setCurrCard(deck.splice(0,1))
    }

    const updateNumberOfPlayers = (ev) => {
        setnumberOfPlayer(ev.target.value);
    }

    if (!deck) return <Loading />
    return (
        <div className="game-page-container">
            <button onClick={startGame}>Start Game</button>
            <input type="number" value={numberOfPlayers} min="2" max="4" onChange={updateNumberOfPlayers}></input>
            {playersDecks.map((deck, i) => {
                return <div style={{border: '1px solid black'}}>
                <div>Player No. {i+1}</div>
                {deck.map((card)=>{
                    return (
                    <div>
                        <div>{card.cardName}</div>
                    </div>
                    )
                })}
                </div>
            })}
            {currCard ? <div>{currCard[0].cardName}</div> : <div></div>}
        </div>
    )
}
