class Ui {
	constructor ({ element1, element2, element3, board}) {
		this.cells = element1
		this.input = element2
		this.wordContainer = element3
		this.board = board
		this.index = 0
		this.boardSetup()
		this.showAllWords()
		this.addListeners()
	}

	boardSetup() {
		var counter = 0
		var cells = this.cells
		this.board.dice.forEach(function(rows) {
			rows.forEach(function(die) {
				var newNode = document.createElement('div')
				newNode.className = counter + ' dice'
				newNode.innerHTML = die
				cells.appendChild(newNode)
				counter++
			})
		})
	}

	showAllWords(index) {
		if(index === 1) {
			var wordContainer = this.wordContainer
			var newDiv = document.createElement('div')
			newDiv.className = 'allWords'
			wordContainer.appendChild(newDiv)
			var allWords = document.querySelector('.allWords')
			this.board.trie.wordList.forEach(function(word) {
				var newNode = document.createElement('a')
				newNode.setAttribute('href', `https://www.dictionary.com/browse/${word}?s=t`)
				newNode.setAttribute('target',"_blank")
				newNode.innerHTML = word
				allWords.appendChild(newNode)
			})
		}
		if (index === 0 ) {
			this.removeWords()
		}
	}

	removeWords() {
		var allWords = this.wordContainer
		while (allWords.firstChild) {
			allWords.removeChild(allWords.firstChild)
		}
	}

	addListeners() {
		this.buttons()
	}

	newGame() {
		var cells = document.querySelector('.dice-container')
		while(cells.firstChild) {
			cells.removeChild(cells.firstChild)
		}
		this.index = 0
		this.removeWords()
		this.board.setup()

		this.board.trie.wordList = []
		this.board.solveWords()
		this.boardSetup()
		// this.showAllWords(this.index)
	}

	buttons() {
		this.input.addEventListener('click', () => {
			if (event.target.value === "New Game") {
				this.newGame()
			}
			if (event.target.value === "Show All Words") {
				if(this.index === 0) {
					this.index = 1
				} else {
					this.index = 0
				}
				this.showAllWords(this.index)
			}
		})
	}
}
export default Ui