const Block = require('./Block')

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    const latest_block = this.getLatestBlock()
    newBlock.index = latest_block.index + 1
    newBlock.previousHash = latest_block.hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
    return newBlock
  }

  isChainValid() {
    return this.chain.every((block, index) => {
      if (index === 0) {
        // NOTE: for Genesis Block
        return true
      }

      const prevBlock = this.chain[index - 1]

      if (block.hash !== block.calculateHash()) {
        return false
      }
      if (block.previousHash !== prevBlock.hash) {
        return false
      }

      return true
    })
  }
}

module.exports = Blockchain
