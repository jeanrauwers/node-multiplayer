export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            height: 10,
            width: 10
        }
    };


    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    };

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    };

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    };

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    };

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision between ${playerId} `)
                removeFruit({ fruitId })
            }
        }
    };

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                player.y = Math.max(player.y - 1, 0);
            },
            ArrowDown(player) {
                player.y = Math.min(player.y + 1, state.screen.height - 1);
            },
            ArrowRight(player) {
                player.x = Math.min(player.x + 1, state.screen.width - 1);
            },
            ArrowLeft(player) {
                player.x = Math.max(player.x - 1, 0);
            }
        };
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        };
    };

    return {
        state,
        addPlayer,
        removePlayer,
        addFruit,
        removePlayer,
        movePlayer
    }
}