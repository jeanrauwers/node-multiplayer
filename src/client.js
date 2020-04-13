import createKeyBoardListener from './keyboard-listener';
import renderScreen, { setupScreen } from './render'
import createGame from './game';
import io from 'socket.io-client';

const screen = document.getElementById('screen')
const keyboardListener = createKeyBoardListener(document)
const game = createGame()



const socket = io()

socket.on('connect', () => {
    const playerId = socket.id
    const scoreTable = document.getElementById('score-table')

    setupScreen(screen, game)
    renderScreen(screen, scoreTable, game, requestAnimationFrame, playerId);
})

socket.on('disconnect', () => {
    keyboardListener.unsubscribeAll();
})

socket.on('setup', (state) => {
    const playerId = socket.id
    game.setState(state)

    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.movePlayer)
    keyboardListener.subscribe((command) => {
        socket.emit('move-player', command)
    })
})

socket.on('add-player', (command) => {
    game.addPlayer(command);
});

socket.on('remove-player', (command) => {
    game.removePlayer(command);
});

socket.on('add-fruit', (command) => {
    game.addFruit(command);
});

socket.on('remove-fruit', (command) => {
    game.removeFruit(command);
});


socket.on('move-player', (command) => {
    const playerId = socket.id

    if (playerId !== command.playerId) {
        game.movePlayer(command)
    }
});

