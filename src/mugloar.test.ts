import { describe, expect, it } from 'vitest'

import { mergeResponse, type GameState } from './mugloar'

const game: GameState = {
  gameId: 'abc123',
  lives: 3,
  gold: 100,
  level: 2,
  score: 50,
  highScore: 0,
  turn: 7,
}

describe('mergeResponse', () => {
  it('keeps the level, which a solve response never reports', () => {
    const solved = mergeResponse(game, { lives: 2, gold: 140, score: 90, turn: 8 })

    expect(solved.score).toBe(90)
    expect(solved.level).toBe(2)
  })

  it('keeps the score, which a buy response never reports', () => {
    const bought = mergeResponse(game, { lives: 3, gold: 0, level: 3, turn: 8 })

    expect(bought.level).toBe(3)
    expect(bought.score).toBe(50)
  })
})
