export function checkIfLegal(card, playingDeck) {

    const currPLayingCard = playingDeck[0]

    const playingCardColors = currPLayingCard.cardColor
    const playersCardColors = card.cardColor

    let isLegal = false

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

    return isLegal

}