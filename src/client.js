import createKeyBoardListener from './keyboard-listener';
import renderScreen from './render';
import createGame from './game';
import io from 'socket.io-client';

const screen = document.getElementById('screen')
const keyboardListener = createKeyBoardListener(document)
const game = createGame()



const socket = io()

socket.on('connect', () => {
    const playerId = socket.id
    renderScreen(screen, game, requestAnimationFrame, playerId);
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
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    game.addPlayer(command);
});

socket.on('remove-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`);
    game.removePlayer(command);
});

socket.on('add-fruit', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`);
    game.addFruit(command);
});

socket.on('remove-fruit', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`);
    game.removeFruit(command);
});


socket.on('move-player', (command) => {
    const playerId = socket.id

    if (playerId !== command.playerId) {
        game.movePlayer(command)
    }
});

