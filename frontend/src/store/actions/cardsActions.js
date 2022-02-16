import { landingsService } from '../../services/landingsService'
import { cardDeckService } from '../../services/cardDeckService'

export function getCardDeck(){
  return async dispatch => {
    try {
      const cardDeck = cardDeckService.cardDeck()
      dispatch({ type: 'GET_CARD_DECK', cardDeck })
    } catch (err) {}
  }
}

export function getLandingById(id){
  return async dispatch => {
    try {
      const currLanding = await landingsService.getLandingById(id)
      dispatch({ type: 'GET_LANDING_BY_ID', currLanding })
    } catch (err) {}
  }
}

export function getRocketById(id){
  return async dispatch => {
    try {
      const currRocket = await landingsService.getRocketById(id)
      dispatch({ type: 'GET_ROCKET_BY_ID', currRocket })
    } catch (err) {}
  }
}

export function getLaunchpadById(id){
  return async dispatch => {
    try {
      const currLaunchpad = await landingsService.getLaunchpadById(id)
      dispatch({ type: 'GET_LAUNCHPAD_BY_ID', currLaunchpad })
    } catch (err) {}
  }
}