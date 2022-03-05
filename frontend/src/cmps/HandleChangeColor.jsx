import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleColorMode } from '../store/actions/cardsActions.js'

export function HandleChangeColor() {

    const dispatch = useDispatch()

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, gameDirection } = useSelector(state => state.cardsModule)

    const [selectedColor, setSelectedColor] = useState('')


    const handleClick = (ev) => {
        setSelectedColor(ev.target.value);
    }

    const createColorCard = () =>{
        playingDeck.unshift({
            cardName: 'tempColor', cardColor: [selectedColor], isSpecial: true , shape: 'changeColor',
        })
        dispatch(getPlayingDeck(playingDeck))
        dispatch(toggleColorMode(false))
        setNextTurn()
    }

    const setNextTurn = () => {
        if (gameDirection === 'forward'){
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


    return (
        <div className="color-select">
            <option value='green' onClick={handleClick}>Green</option>
            <option value='red' onClick={handleClick}>Red</option>
            <option value='blue' onClick={handleClick}>Blue</option>
            <option value='yellow' onClick={handleClick}>Yellow</option>
            <button onClick={createColorCard}>Click Me</button>
        </div>
    )
}