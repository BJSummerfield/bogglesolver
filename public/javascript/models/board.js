class Board {
	constructor(columns, rows) {
		this.columns = columns
		this.rows = rows
		this.dice = []
		this.diceArray = [
			['R', 'I', 'F', 'O', 'B', 'X'],
			['I', 'F', 'E', 'H', 'E', 'Y'],
			['D', 'E', 'N', 'O', 'W', 'S'],
			['U', 'T', 'O', 'K', 'N', 'D'],
			['H', 'M', 'S', 'R', 'A', 'O'],
			['L', 'U', 'P', 'E', 'T', 'S'],
			['A', 'C', 'I', 'T', 'O', 'A'],
			['Y', 'L', 'G', 'K', 'U', 'E'],
			['Q', 'B', 'M', 'J', 'O', 'A'],
			['E', 'H', 'I', 'S', 'P', 'N'],
			['V', 'E', 'T', 'I', 'G', 'N'],
			['B', 'A', 'L', 'I', 'Y', 'T'],
			['E', 'Z', 'A', 'V', 'N', 'D'],
			['R', 'A', 'L', 'E', 'S', 'C'],
			['U', 'W', 'I', 'L', 'R', 'G'],
			['P', 'A', 'C', 'E', 'M', 'D']
		]
		this.setup()
	}

	setup() {
		this.shakeDice()
		this.boardGrid()
	}

	shakeDice() {
		for (var i = 0; i < this.diceArray.length; i++) {
			var temp = this.randomize(this.diceArray[i])
			this.dice[i] = temp[0]
		}
		this.dice = this.randomize(this.dice)
	}


	randomize(array) {
		var i = 0
		var j = 0
		var temp = null
		for (i = array.length - 1; i > 0; i-=1) {
			j = Math.floor(Math.random() * (i +1))
			temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
		return array
	}

	boardGrid() {
		var grid = []
		while (this.dice.length > 0) {
			grid.push(this.dice.splice(0, this.columns))
		}
		this.dice = grid
	}

}	

export default Board		

