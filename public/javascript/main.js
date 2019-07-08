import Board from './models/board.js'
import Trie from './models/trie.js'
import Ui from './views/ui.js'
import Dictionary from './data/bogglewords.js'

const dictionary = new Dictionary
const trie = new Trie(dictionary)
const board = new Board(4,4,trie)

var cells = document.querySelector('.dice-container')
const ui = new Ui({ element: cells, board})
ui.boardSetup()


var allWords = document.querySelector('.allWords')
const theWords = new Ui({ element: allWords, board})

trie.addWords()
// console.log(board.trie)
// console.log(trie)
// console.log(trie.wordList)
board.solveWords()
theWords.showAllWords()


// board.trie.wordList.forEach(function(word) {
// 	console.log(word, board.trie.containsWord(word))
// })

// console.log(board.trie.wordList.length)
