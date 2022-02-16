import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck } from '../store/actions/cardsActions.js'
import { Loading } from '../helpers/Loading.js'

export function Game() {

    const dispatch = useDispatch()
    const { cardDeck } = useSelector(state => state.cardsModule)
    
    useEffect(() =>{
        dispatch(getCardDeck())
    }, [dispatch])

    console.log('cardDeck', cardDeck);

    if (!cardDeck) return <Loading />

    return (
        <div className="game-page-container">
            {cardDeck.map((card)=>{
                return (
                    <div>{card.cardName}</div>
                )
            })}
        </div>
    )
}
