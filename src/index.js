import createGame from './game';
import createKeyBoardListener from './keyboard-listener';
import renderScreen from './render';

const screen = document.getElementById('screen')
const context = screen.getContext('2d')

//initialization
const game = createGame()
const keyboardListener = createKeyBoardListener()


keyboardListener.subscribe(game.movePlayer)

renderScreen(context, game);
