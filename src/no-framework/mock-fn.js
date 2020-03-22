const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}

const originalGetWinner = utils.getWinner
const getWinnerStub = (player1, player2) => player1
utils.getWinner = fn(getWinnerStub)

const winner = thumbWar('Jon', 'Marc')
assert.strictEqual(winner, 'Jon')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Jon', 'Marc'],
  ['Jon', 'Marc']
])

utils.getWinner = originalGetWinner
