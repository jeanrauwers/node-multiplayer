import createGame from './game';
import createKeyBoardListener from './keyboard-listener';
import renderScreen from './render';

const screen = document.getElementById('screen')
const game = createGame()
const keyboardListener = createKeyBoardListener()
keyboardListener.subscribe(game.movePlayer)

renderScreen(screen, game, requestAnimationFrame);

game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'player2', playerX: 4, playerY: 9 })
game.addFruit({ fruitId: 'fruit1', fruitX: 2, fruitY: 6 })