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
    const playerId = socket.io
    console.log(`Player ${playerId} connected to the server`)
})

socket.on('setup', (state) => {
    game.setState(state)
})

socket.on('add-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    game.addPlayer(command);
});

