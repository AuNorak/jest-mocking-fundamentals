const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')
  utils.getWinner.mockImplementation((player1, player2) => player1)
  const player1 = 'Jon'
  const player2 = 'Marc'

  const winner = thumbWar(player1, player2)
  expect(winner).toBe(player1)
  expect(utils.getWinner.mock.calls).toEqual([
    [player1, player2],
    [player1, player2]
  ])

  utils.getWinner.mockRestore()
})
