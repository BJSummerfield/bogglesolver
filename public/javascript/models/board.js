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
			['qu', 'b', 'm', 'j', 'o', 'a'],
			['e', 'h', 'i', 's', 'p', 'n'],
			['v', 'e', 't', 'i', 'g', 'n'],
			['b', 'a', 'l', 'i', 'y', 't'],
			['e', 'z', 'a', 'v', 'n', 'd'],
			['r', 'a', 'l', 'e', 's', 'c'],
			['u', 'w', 'i', 'l', 'r', 'g'],
			['p', 'a', 'c', 'e', 'm', 'd'],
		]
		this.trie = trie
		this.highScore = 0
		this.setup()
		
	}

	setup() {
		this.shakeDice()
		this.boardGrid()
		this.solveWords()
		this.maxScore()
		console.log(this.highScore)
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
		this.visitTable()
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.columns; j ++) {
				this.getWords(i,j)
			}
		}
	}

	maxScore() {
		this.highScore = 0
		var score = 0
		this.trie.wordList.forEach(function(word) {
			if (word.length < 5) {
				score = score + 1
			}
			if (word.length === 5) {
				score = score + 2
			}
			if (word.length === 6) {
				score = score + 3
			}
			if (word.length === 7) {
				score = score + 5
			}
			if (word.length > 8) {
				score = score + 11
			}
		})
		this.highScore = score
	}

	getWords(x, y) {
		if (this.visited[x][y] === true) {
			return
		}
		this.word.push(this.dice[x][y])
		this.visited[x][y] = true
		if (this.trie.isPrefix(this.word.join("")) === true) {
			this.checkNeighbors(x,y)
			this.backTrack(x,y)

		
		} else {
			this.backTrack(x,y)
		}
	}

	backTrack(x,y) {
		var qu = 1
		if( this.dice[x][y] === 'qu') {
			qu = 0
		}
		for (var i = qu; i <= 1 ; i++) {
			this.word.pop()
			} 
		this.visited[x][y] = false
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
    for (var xoff = -1; xoff <=1; xoff++) {
      var x = i + xoff
      if (x < 0 || x >= this.rows) continue
      for (var yoff = -1; yoff <=1; yoff++) {
        var y = j + yoff
        if (y < 0 || y >= this.columns) continue
        if (xoff == 0 && yoff == 0) continue
  				this.getWords(x,y)
			}
    }
  }
}	

export default Board		