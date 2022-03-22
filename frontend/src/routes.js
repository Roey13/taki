import { Home } from './pages/Home.jsx'
import { Game } from './pages/Game.jsx'

export const routes = [{
    path: '/',
    component: Home,
},
{
    path: '/room/:roomId?/players/:numberOfPlayers?',
    component: Game
}
]