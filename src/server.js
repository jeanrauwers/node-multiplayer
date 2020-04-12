const express = require('express');
const http = require('http');
const createGame = require('./game')
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = 3000;
const socket = socketio(server);


app.use(express.static('dist'));


const game = createGame();


// initial state
game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'player2', playerX: 4, playerY: 9 })
game.addFruit({ fruitId: 'fruit1', fruitX: 2, fruitY: 6 })
game.addFruit({ fruitId: 'fruit2', fruitX: 5, fruitY: 9 })


console.log(game.state)

socket.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player connected on server with id: ${playerId}`)


    socket.emit('setup', game.state)
})

server.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`)
})