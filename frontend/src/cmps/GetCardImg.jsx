export function GetCardImg({ card }) {

    // console.log('card', card);

    let tempName = card.cardName;
    if (card.cardName === 'tempColor') {
        tempName = 'changeColor' + card.cardColor[0];
    } else if (card.cardName === 'tempTaki') {
        tempName = 'taki' + card.cardColor[0];
    } else {
        tempName = tempName.split(' ').join('');
        tempName = tempName.slice(0, -1)
    }

    return (
        <img src={`TakiCards/${tempName}.svg`} alt="" />
    )

}

