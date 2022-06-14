/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCardDeck, getShuffledDeck, getPlayersDecks, getPlayingDeck, setNumberOfPlayers, setPlayersTurn, togglePlus2Mode, setDeckDraw, toggleOpenTaki } from '../store/actions/cardsActions.js'
import { PlayersCards } from '../cmps/PlayersCards'
import { eventBusService } from '../services/eventBusService.js';

export function Victory() {

    return <div className="victory-container">
        Victory!
    </div>
}