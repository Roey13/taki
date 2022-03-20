export function checkIfLegal(card, playingDeck, isOpenTaki) {

    const currPLayingCard = playingDeck[0]

    const playingCardColors = currPLayingCard.cardColor
    const playingCardShape = currPLayingCard.shape

    const playersCardColors = card.cardColor
    const playersCardShape = card.shape

    let isLegal = false
    console.log('isLegal', isLegal);
    if (playingCardShape === playersCardShape && !isOpenTaki.open) {
        isLegal = true
        console.log('isLegal', isLegal);
    } else {
        if (playingCardColors.length > playersCardColors.length) {
            playingCardColors.forEach((color) => {
                if (playersCardColors.includes(color)) {
                    isLegal = true
                    console.log('isLegal', isLegal);
                    return
                }
            })
        } else {
            playersCardColors.forEach((color) => {
                if (playingCardColors.includes(color)) {
                    isLegal = true
                    console.log('isLegal', isLegal);
                    return
                }
            })
        }
    }

    console.log('isLegal', isLegal);

    return isLegal

}

// if (isOpenTaki.open && playersCardColors[0] !== isOpenTaki.color) {
//     isLegal = false