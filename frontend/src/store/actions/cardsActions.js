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

export function setPlayersTurn(playersTurn){
  return async dispatch => {
    try {
      dispatch({ type: 'SET_PLAYERS_TURN', playersTurn })
    } catch (err) {}
  }
}

export function setNumberOfPlayers(num){
  return async dispatch => {
    try {
      dispatch({ type: 'SET_NUMBER_OF_PLAYERS', num })
    } catch (err) {}
  }
}

export function toggleOpenTaki(openTaki){
  console.log('openTaki', openTaki);
  return async dispatch => {
    try {
      dispatch({ type: 'TOGGLE_OPEN_TAKI', openTaki })
    } catch (err) {}
  }
}

export function toggleGameDirection(gameDirection){
  let newDirection
  if (gameDirection === 'forward') newDirection = 'backwards'
  else newDirection = 'forward'
  return async dispatch => {
    try {
      dispatch({ type: 'TOGGLE_GAME_DIRECTION', newDirection })
    } catch (err) {}
  }
}