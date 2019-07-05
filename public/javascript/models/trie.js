import Dictionary from './bogglewords.js'
class Trie {
	constructor() {
		this.trie = {}
		this.wordList = []
		this.addWords()
	}

	addWords() {
		var dictionary = new Dictionary
		var length = dictionary.words.length
		var word = dictionary.words
		for (var i = 0; i < length; i++) {
			var currentNode = this.trie
			word[i].toLowerCase().split('').forEach((letter, index) => {
				if(!currentNode[letter]) {
					currentNode[letter] = {}
					currentNode[letter].isWord = false
					
				}
				if(index === word[i].length - 1) {
					currentNode[letter].isWord = true
				} else {
					currentNode = currentNode[letter]

				}
			})
		// this.containsWord(word[i])
		}
	}

  containsWord(word) {
    var currentNode = this.trie
    var split = word.split('')
    split.forEach(function(letter) {
    	if(!currentNode[letter]){
    		return false
    	}
    	currentNode = currentNode[letter]
    })
    // console.log(currentNode)
    // console.log(word, currentNode.isWord)
    return currentNode.isWord
  }

  isPrefix(prefix) {
    var currentNode = this.trie
    return prefix.split('').every(letter => {
      if(!currentNode[letter]) {
        return false;
      }
      currentNode = currentNode[letter]
      if (currentNode.isWord === true) {
      	if (!this.wordList.includes(prefix)) {
      		this.wordList.push(prefix)
      	}
    	}
      return true
    });
  }

}

export default Trie