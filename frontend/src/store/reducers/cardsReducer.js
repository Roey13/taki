const initialState = {
  cardDeck: null,
  shuffledDeck: null,
  playersDecks: [],
  playingDeck: null,
  playersTurn: 1,
  numberOfPlayers: 4,
  isOpenTaki: { open: false, color: '' },
  gameDirection: 'forward',
  plus2Mode: false,
  deckDraw: 0,
  changeColorMode: false,
  isVictory: false
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
    case 'TOGGLE_OPEN_TAKI':
      return { ...state, isOpenTaki: action.openTaki }
    case 'TOGGLE_GAME_DIRECTION':
      return { ...state, gameDirection: action.newDirection }
    case 'TOGGLE_PLUS_2_MODE':
      return { ...state, plus2Mode: action.bool }
    case 'SET_DECK_DRAW':
      return { ...state, deckDraw: action.num }
    case 'TOGGLE_CHANGE_COLOR_MODE':
      return { ...state, changeColorMode: action.boolean }
    case 'TOGGLE_VICTORY_MODE':
      return { ...state, isVictory: action.isVictory }
    default:
      return state
  }
}