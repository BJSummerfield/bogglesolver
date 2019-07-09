import Board from './models/board.js'
import Trie from './models/trie.js'
import Ui from './views/ui.js'
import Dictionary from './data/bogglewords.js'

const dictionary = new Dictionary
const trie = new Trie(dictionary)
const board = new Board(4,4,trie)
var allWords = document.querySelector('.allWords')
var input = document.querySelector('.ui-container')
var cells = document.querySelector('.dice-container')
const ui = new Ui({ element1: cells, element2: input, element3: allWords, board})



// const buttons = new Ui({ element1: input, board})

// const theWords = new Ui({ element: allWords, board })
ui.boardSetup()
ui.showAllWords()
ui.addListeners()




// board.trie.wordList.forEach(function(word) {
// 	console.log(word, board.trie.containsWord(word))
// })

// console.log(board.trie.wordList.length)
