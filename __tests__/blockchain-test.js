const Block = require('../block')
const Blockchain = require('../blockchain')

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
  blockchain.minePendingTransactions(new Block(Date.now(), [], '0'))
  const latest_block = blockchain.getLatestBlock()
  expect(latest_block.previousHash).toBe(first_block.hash)
  expect(blockchain.isChainValid()).toBe(true)
})

test('new blockchain can add block and edit block hash and is not valid', () => {
  const blockchain = new Blockchain()
  const first_block = blockchain.getLatestBlock()
  blockchain.minePendingTransactions(new Block(Date.now(), [], '0'))
  const latest_block = blockchain.getLatestBlock()
  expect(latest_block.previousHash).toBe(first_block.hash)
  latest_block.hash = 'something else'
  expect(blockchain.isChainValid()).toBe(false)
})

test('new blockchain can add block and edit prev block hash and is not valid', () => {
  const blockchain = new Blockchain()
  const first_block = blockchain.getLatestBlock()
  blockchain.minePendingTransactions(new Block(Date.now(), [], '0'))
  const latest_block = blockchain.getLatestBlock()
  expect(latest_block.previousHash).toBe(first_block.hash)
  first_block.hash = 'something else'
  expect(blockchain.isChainValid()).toBe(false)
})
