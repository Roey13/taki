/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setPlayersTurn, toggleColorMode, toggleOpenTaki } from '../store/actions/cardsActions.js'

export function HandleChangeColor({game, updateGame}) {

    const { playingDeck, playersDecks, playersTurn, numberOfPlayers, gameDirection, changeColorMode, isOpenTaki } = game

    const [selectedColor, setSelectedColor] = useState('')


    const handleClick = (ev) => {
        setSelectedColor(ev.target.value);
    }

    const createColorCard = () =>{
        let entity
        if (selectedColor === '') return
        if (changeColorMode && !isOpenTaki.open){

            playingDeck.unshift({
                cardName: 'tempColor', cardColor: [selectedColor], isSpecial: true , shape: 'changeColor',
            })

            entity = {playingDeck: playingDeck, changeColorMode: false}
            updateGame(entity)
            setNextTurn()
        } else if (changeColorMode && isOpenTaki.open){
            playingDeck.unshift({
                cardName: 'tempTaki', cardColor: [selectedColor], isSpecial: true, shape: 'taki',
            })
            entity = {
                isOpenTaki: { open: true, color: selectedColor },
                playingDeck: playingDeck,
                changeColorMode: false
            }
            updateGame(entity)
        }

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