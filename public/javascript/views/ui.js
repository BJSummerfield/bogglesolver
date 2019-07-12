class Ui {
	constructor ({ element1, element2, element3, element4, board}) {
		this.cells = element1
		this.input = element2
		this.wordContainer = element3
		this.inputText = element4
		this.playerContainer = document.querySelector('.player-container')
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

	removePlayerWords() {
		var playerContainer = this.playerContainer
		while (playerContainer.firstChild) {
			playerContainer.removeChild(playerContainer.firstChild)
		}
	}

	playerWord() {
		var playerContainer = this.playerContainer
		this.removePlayerWords()
		var playerScore = document.createElement('div')
		playerScore.className = 'score'
		playerScore.innerHTML = 'Score: ' + this.board.playerScore
		playerContainer.appendChild(playerScore)
		var newDiv = document.createElement('div')
		newDiv.className = 'playerWords'
		playerContainer.appendChild(newDiv)
		var playerWords = document.querySelector('.playerWords')
		this.board.foundWords.forEach(function(word) {
			var newNode = document.createElement('a')
			newNode.setAttribute('href', `https://en.wiktionary.org/wiki/${word}`)
			newNode.setAttribute('target',"_blank")
			newNode.innerHTML = word
			playerWords.appendChild(newNode)
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
		this.removePlayerWords()
		this.board.trie.wordList = []
		this.board.foundWords = []
		this.board.setup()
		this.boardSetup()
	}

	textInput() {
		this.textEnter()
		this.textSubmit()
	}

	textEnter() {
		var board = this.board
		var inputText = this.inputText
		inputText.addEventListener("input", function(event) {
			board.inputWord = event.target.value.split('')
			for (var x = 0; x < board.inputWord.length; x++) {
  			if (board.inputWord[x] === 'q') {
  				board.inputWord[x] = board.inputWord[x] + 'u'
  				board.inputWord.splice(x+1,1)
	  		}
	  	}
			board.onBoard()
		})
	}

	textSubmit() {		
		var board = this.board
		this.inputText.addEventListener("keyup", () => {
			if (event.keyCode === 13) {
				if (board.trie.containsWord(event.target.value) === true && !board.foundWords.includes(event.target.value) && board.wordBoard === true) {
					board.foundWords.push(event.target.value)
					board.playerScore = board.playerScore + board.playersScore(event.target.value)
					this.playerWord()
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