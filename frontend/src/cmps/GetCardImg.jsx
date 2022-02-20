export function GetCardImg({card}) {

    let tempName = card.cardName;
    tempName = tempName.split(' ').join('');
    tempName = tempName.slice(0, -1)

    return (
        <img src={`TakiCards/${tempName}.svg`} alt="" />
    )

}


