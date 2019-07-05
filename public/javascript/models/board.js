class Board {
	constructor(columns, rows, trie) {
		this.columns = columns
		this.rows = rows
		this.dice = []
		this.word = []
		this.visited = []
		this.diceArray = [
			['r', 'i', 'f', 'o', 'b', 'x'],
			['i', 'f', 'e', 'h', 'e', 'y'],
			['d', 'e', 'n', 'o', 'w', 's'],
			['u', 't', 'o', 'k', 'n', 'd'],
			['h', 'm', 's', 'r', 'a', 'o'],
			['l', 'u', 'p', 'e', 't', 's'],
			['a', 'c', 'i', 't', 'o', 'a'],
			['y', 'l', 'g', 'k', 'u', 'e'],
			['q', 'b', 'm', 'j', 'o', 'a'],
			['e', 'h', 'i', 's', 'p', 'n'],
			['v', 'e', 't', 'i', 'g', 'n'],
			['b', 'a', 'l', 'i', 'y', 't'],
			['e', 'z', 'a', 'v', 'n', 'd'],
			['r', 'a', 'l', 'e', 's', 'c'],
			['u', 'w', 'i', 'l', 'r', 'g'],
			['p', 'a', 'c', 'e', 'm', 'd']
		]
		this.trie = trie
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

	solveWords() {
		
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.columns; j ++) {
				this.visitTable()
				this.getWords(i,j)
			}
		}
	}

	getWords(x, y) {
		if(this.visited[x][y] === true) {
			return
		}
		// console.log(x,y)
		// console.log(this.word)
		this.word.push(this.dice[x][y])
		// console.log(this.word.join(''))
		this.visited[x][y] = true
		if (this.trie.isPrefix(this.word.join("")) === true) {
			this.checkNeighbors(x,y)
		} else {
			// console.log(this.word)
			this.word.pop()
			// this.word.pop()
			this.visited[x][y] = false
			return
		}
		// this.visited[x][y] = false
		this.word = []
		// this.word = []

		// if (this.visited[x][y] === true) {
		// 	return
		// }
		// this.word.push(this.dice[x][y])
		// this.visited[x][y] = true
		// this.checkNeighbors(x,y)
		// this.visited[x][y] = false
		// console.log(this.word)
		// this.word = []
	}
	

	visitTable() {
		var grid = new Array(this.rows)		
		for (var row = 0; row < this.rows; row++) {
      grid[row] = new Array(this.columns);
      for (var col = 0; col < this.columns; col++) {
        grid[row][col] = false;
      }
    }
    this.visited = grid
	}



	checkNeighbors(i, j) {
      // X axis offsets
    for (var xoff = -1; xoff <=1; xoff++) {
      var x = i + xoff
      if (x < 0 || x >= this.rows) continue
        
      // Y axis offsets
      for (var yoff = -1; yoff <=1; yoff++) {
        var y = j + yoff
        if (y < 0 || y >= this.columns) continue
  			this.getWords(x,y)
      	
      }
 
    }
  }
}	


export default Board		

