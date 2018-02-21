const Block = require('../block')

test('new block creates correct hash', () => {
  const test_block = new Block(0, 1519233279412, 'test block', '0')
  expect(test_block.hash).toBe('f2803f3ea837c59e80d167475cfa9fa0c4ca602c5e09e63cd6af42e19f17919d');
})
