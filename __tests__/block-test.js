const Block = require('../block')

test('new block creates correct hash', () => {
  const test_block = new Block(1519233279412, [], '0')
  expect(test_block.hash).toBe('4d4b4d72d99959fd9684e0761ad0c7094d2715b015112889d1a5bc550ee3ac34');
})
