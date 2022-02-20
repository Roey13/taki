import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers } from '../store/actions/cardsActions.js'

export function HandleChangeColor() {

    const dispatch = useDispatch()

    const { playingDeck } = useSelector(state => state.cardsModule)

    const [selectedColor, setSelectedColor] = useState('')


    const handleClick = (ev) => {
        setSelectedColor(ev.target.value);
    }

    const createColorCard = () =>{
        playingDeck.unshift({
            cardName: 'tempColor', cardColor: [selectedColor], isSpecial: true , shape: 'changeColor',
        })
        dispatch(getPlayingDeck(playingDeck))
    }


    return (
        <div className="colorSelect">
            <option value='green' onClick={handleClick}>Green</option>
            <option value='red' onClick={handleClick}>Red</option>
            <option value='blue' onClick={handleClick}>Blue</option>
            <option value='Yellow' onClick={handleClick}>Yellow</option>
            <button onClick={createColorCard}>Click Me</button>
        </div>
    )
}