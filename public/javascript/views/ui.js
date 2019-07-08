class Ui {
	constructor ({ element, board}) {
		this.element = element
		this.board = board
	}

	boardSetup() {
		var counter = 0
		var element = this.element
		this.board.dice.forEach(function(rows) {
			rows.forEach(function(die) {
				var newNode = document.createElement('div')
				newNode.className = counter + ' dice'
				newNode.innerHTML = die
				element.appendChild(newNode)
				counter++
			})
		})
	}

	showAllWords() {
		var element = this.element
		this.board.trie.wordList.forEach(function(word) {
			var newNode = document.createElement('div')
			newNode.innerHTML = word
			element.appendChild(newNode)
		})
	}

}
export default Ui