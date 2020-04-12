const express = require('express');
const http = require('http');
const createGame = require('./game')
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = 3000;
const sockets = socketio(server);


app.use(express.static('dist'));


const game = createGame();

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id;

    game.addPlayer({ playerId });

    socket.emit('setup', game.state);

    socket.on('add-player', (command) => {
        console.log(`Receiving ${command.type} -> ${command.playerId}`);
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


    socket.on('disconnect', () => {
        game.removePlayer({ playerId })
    })

})


server.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`)
})