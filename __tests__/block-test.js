const Block = require('../block')

test('new block creates correct hash', () => {
  const test_block = new Block(0, 1519233279412, 'test block', '0')
  expect(test_block.hash).toBe('09bceef466132ceacbde0afec37c64631874a71c0f39993e13a7605c1c8beeba');
})
