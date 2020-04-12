import createKeyBoardListener from './keyboard-listener';
import renderScreen from './render';
import createGame from './game';
import io from 'socket.io-client';

const screen = document.getElementById('screen')
const keyboardListener = createKeyBoardListener(document)
const game = createGame()
keyboardListener.subscribe(game.movePlayer)


renderScreen(screen, game, requestAnimationFrame);

const socket = io()

socket.on('connect', () => {
    const playerId = socket.id
    console.log(`Player ${playerId} connected to the server`)
})

socket.on('setup', (state) => {
    console.log(`Getting state from the server`)
    console.log(state)
    game.state = state
})
