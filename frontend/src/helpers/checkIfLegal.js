export function checkIfLegal(card, playingDeck) {

    const currPLayingCard = playingDeck[0]

    const playingCardColors = currPLayingCard.cardColor
    const playingCardShape = currPLayingCard.shape

    const playersCardColors = card.cardColor
    const playersCardShape = card.shape

    let isLegal = false

    if (playingCardShape === playersCardShape){
        isLegal = true
        return isLegal
    } else {
        if (playingCardColors.length > playersCardColors.length) {
            playingCardColors.forEach((color) => {
                if (playersCardColors.includes(color)) {
                    isLegal = true
                    return
                }
            })
        } else {
            playersCardColors.forEach((color) => {
                if (playingCardColors.includes(color)) {
                    isLegal = true
                    return
                }
            })
        }
    }

    return isLegal

}