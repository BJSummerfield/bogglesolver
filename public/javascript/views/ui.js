class Ui {
	constructor ({ element1, element2, element3, element4, board}) {
		this.cells = element1
		this.input = element2
		this.wordContainer = element3
		this.inputText = element4
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
			var highScore = document.createElement('div')
			highScore.className = 'score'
			highScore.innerHTML = 'Total Points: ' + this.board.highScore
			wordContainer.appendChild(highScore)
			var newDiv = document.createElement('div')
			newDiv.className = 'allWords'
			wordContainer.appendChild(newDiv)
			var allWords = document.querySelector('.allWords')
			this.board.trie.wordList.forEach(function(word) {
				var newNode = document.createElement('a')
				newNode.setAttribute('href', `https://en.wiktionary.org/wiki/${word}`)
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
		this.textInput()
	}

	newGame() {
		while(this.cells.firstChild) {
			this.cells.removeChild(this.cells.firstChild)
		}
		this.index = 0
		this.removeWords()
		this.board.trie.wordList = []
		this.board.setup()

	

		this.boardSetup()
		// this.showAllWords(this.index)
	}

	textInput() {
		this.textEnter()
		this.textSubmit()
	}

	textEnter() {
		var board = this.board
		var inputText = this.inputText
		inputText.addEventListener("input", function(event) {
			var x = event.target.value
			board.onBoard(x)
		})
	}

	textSubmit() {		
		var board = this.board
		this.inputText.addEventListener("keyup", function(event){
			if (event.keyCode === 13) {
				if (board.trie.containsWord(event.target.value) === true) {
					console.log(event.target.value, "is a word")
					event.target.value = ""
				} else {
					console.log(event.target.value, "is not a word")
				}
			}
		})
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