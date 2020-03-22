const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
  const originalGetWinner = utils.originalGetWinner
  const player1 = 'Jon'
  const player2 = 'Marc'
  utils.getWinner = jest.fn((player1, player2) => player1)

  const winner = thumbWar(player1, player2)
  expect(winner).toBe(player1)
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith(player1, player2)

  utils.getWinner = originalGetWinner
})
