const initialState = {
  cardDeck: null,
  shuffledDeck: null,
  playersDecks: [],
  playingDeck: null,
  playersTurn: 1,
  numberOfPlayers: 2
}

export function cardsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_CARD_DECK':
      return { ...state, cardDeck: action.cardDeck }
    case 'GET_SHUFFLED_DECK':
      return { ...state, shuffledDeck: action.shuffled }
    case 'GET_PLAYERS_DECKS':
      return { ...state, playersDecks: action.players }
    case 'GET_PLAYING_DECK':
      return { ...state, playingDeck: action.playingDeck }
    case 'SET_PLAYERS_TURN':
      return { ...state, playersTurn: action.playersTurn }
    case 'SET_NUMBER_OF_PLAYERS':
      return { ...state, numberOfPlayers: action.num }
    default:
      return state
  }
}