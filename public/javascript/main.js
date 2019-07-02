import Board from './models/board.js'
import Ui from './views/ui.js'

var cells = document.querySelector('.dice-container')
const board = new Board(4,4)
const ui = new Ui({ element: cells, board})
ui.boardSetup()
console.log(board)