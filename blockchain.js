const Block = require('./block')
const Transaction = require('./transaction')

class Blockchain {
  constructor(difficulty = 3) {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = difficulty
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block(Date.now(), [new Transaction(null, 'ryano', 500)], '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  createTransaction(transaction) {
    if (!transaction.toAddress) {
      console.log('Transaction requires toAddress')
    } else {
      this.pendingTransactions.push(transaction)
    }
  }

  minePendingTransactions(miningRewardAddress) {
    const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
    block.mineBlock(this.difficulty)

    this.chain.push(block)

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  getBalanceOfAddress(address) {
    let balance = 0

    for (const block of this.chain) {
      for (const transaction of block.transactions) {

        if (transaction.fromAddress === address) {
          balance -= transaction.amount
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount
        }
      }
    }

    return balance
  }

  chainHasIntegrity(chain) {
    return chain.every((block, index) => {
      if (index === 0) {
        // NOTE: for Genesis Block
        return true
      }

      const prevBlock = chain[index - 1]

      if (block.hash !== block.calculateHash()) {
        return false
      }
      if (block.previousHash !== prevBlock.hash) {
        return false
      }

      return true
    })
  }

  isChainValid() {
    return this.chainHasIntegrity(this.chain)
  }

  replaceChain(newChain, success, failure) {
    if (this.chainHasIntegrity(newChain) && (newChain.length > this.chain.length)) {
      console.log('Recieved new chain')
      this.chain = newChain
      success()
    } else {
      failure()
    }
  }
}

module.exports = Blockchain
