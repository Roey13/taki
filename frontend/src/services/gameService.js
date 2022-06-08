import { httpService } from './http.service.js'

export const gameService = {
    save
}

async function save(game) {
    if (game.roomId) {
        return await httpService.put(`room/${game.roomId}`, game)
    } else {
        return await httpService.post('game', game)
    }
}