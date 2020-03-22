const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

function spyOn(obj, prop) {
  const originalMethod = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalMethod)

  const mockImplementation = (impl) => {
    obj[prop] = impl
  }

  const mockRestore = () => {
    obj[prop] = originalMethod
  }

  return
}

spyOn(utils, 'getWinner')
const getWinnerStub = (player1, player2) => player1
utils.getWinner.mockImplementation(getWinnerStub)

const winner = thumbWar('Jon', 'Marc')
assert.strictEqual(winner, 'Jon')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Jon', 'Marc'],
  ['Jon', 'Marc']
])

utils.getWinner.mockRestore()
