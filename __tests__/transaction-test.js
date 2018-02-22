const Transaction = require('../transaction')

test('can create transaction', () => {
  const transaction = new Transaction('ryano', 'gerald', 40)
  expect(transaction.fromAddress).toBe('ryano')
  expect(transaction.toAddress).toBe('gerald')
  expect(transaction.amount).toBe(40)
})
