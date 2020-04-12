export default function createKeyBoardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
        console.log('keyboard playerid', state.playerId)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }


    function keyDownHandler(event) {
        const keyPressed = event.key
        const command = {
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command);
    }

    document.addEventListener('keydown', keyDownHandler)


    return {
        subscribe,
        registerPlayerId
    }
}


