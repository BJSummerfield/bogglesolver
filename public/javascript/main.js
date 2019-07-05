import Board from './models/board.js'
import Trie from './models/trie.js'
import Ui from './views/ui.js'
import Dictionary from './models/bogglewords.js'

var cells = document.querySelector('.dice-container')
const board = new Board(4,4)
const ui = new Ui({ element: cells, board})
const trie = new Trie
console.log(trie)
ui.boardSetup()
console.log(board)

// setTimeOut(function() {
// 	trie.containsWord('retarded')
// }, 5000)

setTimeout(function(){ trie.containsWord('happying'); }, 3000);
