const Block = require('../block')
const Blockchain = require('../blockchain')
const Transaction = require('../transaction')

test('new blockchain has one correct block', () => {
  const blockchain = new Blockchain(1)
  const block = blockchain.getLatestBlock()
  expect(block.hash).toBe(block.calculateHash())
})

test('new blockchain is valid', () => {
  const blockchain = new Blockchain()
  expect(blockchain.isChainValid()).toBe(true)
})

test('new blockchain can add block and is valid', () => {
  const blockchain = new Blockchain()
  const first_block = blockchain.getLatestBlock()
  blockchain.minePendingTransactions('ryano')
  const latest_block = blockchain.getLatestBlock()
  expect(latest_block.previousHash).toBe(first_block.hash)
  expect(blockchain.isChainValid()).toBe(true)
})

test('new blockchain can add block and edit block hash and is not valid', () => {
  const blockchain = new Blockchain()
  const first_block = blockchain.getLatestBlock()
  blockchain.minePendingTransactions('ryano')
  const latest_block = blockchain.getLatestBlock()
  expect(latest_block.previousHash).toBe(first_block.hash)
  latest_block.hash = 'something else'
  expect(blockchain.isChainValid()).toBe(false)
})

test('new blockchain can add block and edit prev block hash and is not valid', () => {
  const blockchain = new Blockchain()
  const first_block = blockchain.getLatestBlock()
  blockchain.minePendingTransactions('ryano')
  const latest_block = blockchain.getLatestBlock()
  expect(latest_block.previousHash).toBe(first_block.hash)
  first_block.hash = 'something else'
  expect(blockchain.isChainValid()).toBe(false)
})

test('new blockchain can add block verify transaction', () => {
  const blockchain = new Blockchain()
  blockchain.createTransaction(new Transaction('ryano', 'gerald', 100))
  blockchain.minePendingTransactions('ryano')
  expect(blockchain.getBalanceOfAddress('ryano')).toBe(400)
  expect(blockchain.getBalanceOfAddress('gerald')).toBe(100)
  expect(blockchain.isChainValid()).toBe(true)
})

test('new blockchain can add block does not add transaction', () => {
  const blockchain = new Blockchain()
  blockchain.createTransaction(new Transaction('ryano', null, 100))
  blockchain.minePendingTransactions('ryano')
  expect(blockchain.getBalanceOfAddress('ryano')).toBe(500)
  expect(blockchain.getBalanceOfAddress('gerald')).toBe(0)
  expect(blockchain.isChainValid()).toBe(true)
})
