export function handleSpecial(card) {

    const { shape, cardColor } = card

    if (shape === 'plus' || shape === 'king') return false;

    if (shape === 'taki' && cardColor.length === 1){
        const takiClr = cardColor[0]
        return true
    }
}