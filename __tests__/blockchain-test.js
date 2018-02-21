const Block = require('../block')
const Blockchain = require('../blockchain')

test('new blockchain has one correct block', () => {
  const blockchain = new Blockchain()
  const latest_block = blockchain.getLatestBlock()
  const test_block = new Block(0, latest_block.timestamp, "Genesis Block", '0')
  expect(latest_block.hash).toBe(test_block.hash);
})

test('new blockchain is valid', () => {
  const blockchain = new Blockchain()
  expect(blockchain.isChainValid()).toBe(true);
})
