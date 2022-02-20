import { HandleChangeColor } from '../cmps/HandleChangeColor.jsx'

export function handleSpecial(card) {


    switch (card.shape) {
        case 'plus':
            break;
        case 'stop':
            break;
        case 'king':
            break;
        case '+2':
            console.log('card.shape', card.shape);
            break;
        case 'taki':
            console.log('card.shape', card.shape);
            break;
        case 'revert':
            console.log('card.shape', card.shape);
            break;
        case 'changeColor':
            break;
    }
}