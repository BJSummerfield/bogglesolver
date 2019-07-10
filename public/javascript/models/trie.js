class Trie {
	constructor(dictionary) {
    this.dictionary = dictionary
		this.trie = {}
		this.wordList = []
		this.addWords()
	}

	addWords() {
		var length = this.dictionary.words.length
		var word = this.dictionary.words
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
		}
	}

  containsWord(word) {
    var currentNode = this.trie
    var split = word.split('')
    for (var i = 0; i < split.length; i++) {
    	if (!(split[i] in currentNode)) {
        return false
        break
      }
      currentNode = currentNode[split[i]]
    }
  
    // console.log(word, currentNode.isWord)
    return currentNode.isWord
  }

  isPrefix(prefix) {
    var currentNode = this.trie
    var split = prefix.split('')
    for (var i = 0; i < split.length; i++) {
      if (!(split[i] in currentNode)) {
        return false
        break
      }
      currentNode = currentNode[split[i]]
    }
    if (currentNode.isWord === true && !this.wordList.includes(prefix)) {
      this.wordList.push(prefix)
    }
    return true
  }
}

export default Trie