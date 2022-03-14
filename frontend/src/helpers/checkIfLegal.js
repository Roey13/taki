export function checkIfLegal(card, playingDeck, isOpenTaki) {

    const currPLayingCard = playingDeck[0]

    const playingCardColors = currPLayingCard.cardColor
    const playingCardShape = currPLayingCard.shape

    const playersCardColors = card.cardColor
    const playersCardShape = card.shape

    let isLegal = false

    if (playingCardShape === playersCardShape && !isOpenTaki.open) {
        isLegal = true
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

// if (isOpenTaki.open && playersCardColors[0] !== isOpenTaki.color) {
//     isLegal = false