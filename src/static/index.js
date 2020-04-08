const screen = document.getElementById('screen')
        const context = screen.getContext('2d')

        function createGame() {
            const state = {
                players: {
                    'player1': { x: 1, y: 1 },
                    'player2': { x: 9, y: 9 }
                },
                fruits: {
                    'fruit1': { x: 3, y: 1 }
                }
            }

            function movePlayer(command) {
                const acceptedMoves = {
                    ArrowUp(player) {
                        player.y = Math.max(player.y - 1, 0);
                    },
                    ArrowDown(player) {
                        player.y = Math.min(player.y + 1, screen.height -1);
                    },
                    ArrowRight(player) {
                        player.x = Math.min(player.x + 1, screen.width -1);
                    },
                    ArrowLeft(player) {
                        player.x = Math.max(player.x - 1, 0);
                    }
                }
                const keyPressed = command.keyPressed
                const player = state.players[command.playerId]
                const moveFunction = acceptedMoves[keyPressed]

                if (moveFunction) moveFunction(player)
            }


            return {
                state,
                movePlayer
            }
        }

        const game = createGame()


        const keyboardListener = createKeyBoardListener()
        keyboardListener.subscribe(game.movePlayer)


        function createKeyBoardListener() {
            const state = {
                observers: []
            }

            function subscribe(observerFunction) {
                state.observers.push(observerFunction)
            }

            function notifyAll(command) {
                console.log(`Notifying ${state.observers.length} observer`)

                for (const observerFunction of state.observers) {
                    observerFunction(command)
                }
            }


            document.addEventListener('keydown', keyDownHandler)

            function keyDownHandler(event) {
                const keyPressed = event.key

                const command = {
                    playerId: 'player1',
                    keyPressed
                }

                notifyAll(command);
            }

            return {
                subscribe
            }
        }




        (function renderScreen() {
            context.fillStyle = 'white'
            context.clearRect(0, 0, 10, 10)

            for (const playerId in game.state.players) {
                const player = game.state.players[playerId]

                context.fillStyle = 'black'
                context.fillRect(player.x, player.y, 1, 1)
            }

            for (const fruitId in game.state.fruits) {
                const fruit = game.state.fruits[fruitId]

                context.fillStyle = 'green'
                context.fillRect(fruit.x, fruit.y, 1, 1)
            }

            requestAnimationFrame(renderScreen)
        })();