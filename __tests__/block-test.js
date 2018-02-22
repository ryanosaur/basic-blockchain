const Block = require('../block')

test('new block creates correct hash', () => {
  const block = new Block(Date.now(), [], '0')
  expect(block.hash).toBe(block.calculateHash())
  block.mineBlock(1)
  expect(block.hash).toBe(block.calculateHash())
})
