import { cardDeckService } from '../../services/cardDeckService'

export function getCardDeck(){
  return async dispatch => {
    try {
      const cardDeck = cardDeckService.cardDeck()
      dispatch({ type: 'GET_CARD_DECK', cardDeck })
    } catch (err) {}
  }
}

export function getShuffledDeck(shuffled){
  return async dispatch => {
    try {
      dispatch({ type: 'GET_SHUFFLED_DECK', shuffled })
    } catch (err) {}
  }
}

export function getPlayersDecks(players){
  return async dispatch => {
    try {
      dispatch({ type: 'GET_PLAYERS_DECKS', players })
    } catch (err) {}
  }
}

export function getPlayingDeck(playingDeck){
  return async dispatch => {
    try {
      dispatch({ type: 'GET_PLAYING_DECK', playingDeck })
    } catch (err) {}
  }
}