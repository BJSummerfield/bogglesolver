import Board from './models/board.js'
import Trie from './models/trie.js'
import Ui from './views/ui.js'
import Dictionary from './models/bogglewords.js'

var cells = document.querySelector('.dice-container')
const trie = new Trie
const board = new Board(4,4,trie)
const ui = new Ui({ element: cells, board})
ui.boardSetup()
console.log(board.trie)
// console.log(board.trie.containsWord('happy'))
// console.log(trie.isPrefix('unbee'))
board.solveWords()
// console.log(board.trie.wordList)
board.trie.wordList.forEach(function(word) {
	console.log(word, board.trie.containsWord(word))
})