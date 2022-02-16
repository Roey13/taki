const initialState = {
  cardDeck: null,
  currLanding: null,
  currRocket: null,
  currLaunchpad: null
}

export function cardsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_CARD_DECK':
      return { ...state, cardDeck: action.cardDeck}
    case 'GET_LANDING_BY_ID':
      return { ...state, currLanding: action.currLanding }
    case 'GET_ROCKET_BY_ID':
      return { ...state, currRocket: action.currRocket }
    case 'GET_LAUNCHPAD_BY_ID':
      return { ...state, currLaunchpad: action.currLaunchpad }
    default:
      return state
  }
}