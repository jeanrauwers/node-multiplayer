export default function createKeyBoardListener(document) {
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        console.log('subscribe event')
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log('notified event')

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', keyDownHandler)

    function keyDownHandler(event) {
        const keyPressed = event.key

        console.log('keyDown', keyPressed)

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


