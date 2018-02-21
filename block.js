const sha256 = require('crypto-js/sha256')

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.transactions = transactions
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return sha256(
      this.timestamp +
      this.previousHash +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString()
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++
      this.hash = this.calculateHash()
    }
    console.log(`BLOCK MINED: ${this.hash}`)
  }
}

module.exports = Block
