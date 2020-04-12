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


sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player connected on server with id: ${playerId}`);
    game.addPlayer({ playerId });

    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        console.log(`Player ${playerId} disconnected`)
        game.removePlayer({ playerId })
    });
})


server.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`)
})