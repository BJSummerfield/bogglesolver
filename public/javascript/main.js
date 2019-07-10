import Board from './models/board.js'
import Trie from './models/trie.js'
import Ui from './views/ui.js'
import Dictionary from './data/bogglewords.js'

const dictionary = new Dictionary
const trie = new Trie(dictionary)
const board = new Board(4,4,trie)
var allWords = document.querySelector('.word-container')
var input = document.querySelector('.ui-container')
var cells = document.querySelector('.dice-container')
var inputText = document.querySelector('.text-input')
const ui = new Ui({ element1: cells, element2: input, element3: allWords, element4: inputText, board})

