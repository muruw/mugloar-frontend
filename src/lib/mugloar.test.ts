import { describe, expect, it } from 'vitest'

import { decodeMessage, mergeResponse, type GameState, type Message } from './mugloar.ts'

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

function ad(overrides: Partial<Message>): Message {
  return {
    adId: 'OfLlY7gT',
    message: 'Help Seren Appleton to transport a magic squirrel to field in Frostshaw',
    reward: 22,
    expiresIn: 7,
    probability: 'Piece of cake',
    encrypted: null,
    ...overrides,
  }
}

describe('decodeMessage', () => {
  it('skip decode if encrypted is null', () => {
    const plain = ad({})

    expect(decodeMessage(plain)).toEqual(plain)
  })

  it('decodes ad with base64 if encrypted is 1', () => {
    const decoded = decodeMessage(
      ad({
        adId: 'b0pqQkFXamE=',
        message:
          'SW52ZXN0aWdhdGUgSXNpIEdhcnJhcmQgYW5kIGZpbmQgb3V0IHRoZWlyIHJlbGF0aW9uIHRvIHRoZSBtYWdpYyBiZWVyIG11Zy4=',
        probability: 'UXVpdGUgbGlrZWx5',
        encrypted: 1,
      }),
    )

    expect(decoded?.adId).toBe('oJjBAWja')
    expect(decoded?.message).toBe(
      'Investigate Isi Garrard and find out their relation to the magic beer mug.',
    )
    expect(decoded?.probability).toBe('Quite likely')
  })

  it('decodes a ROT13 ad, leaving the digits in the id alone', () => {
    const decoded = decodeMessage(
      ad({
        adId: 'c6jmu7IG',
        message: 'Xvyy Gbzb Pyvsgba jvgu pybgurf',
        probability: 'Vzcbffvoyr',
        encrypted: 2,
      }),
    )

    expect(decoded?.adId).toBe('p6wzh7VT')
    expect(decoded?.message).toBe('Kill Tomo Clifton with clothes')
    expect(decoded?.probability).toBe('Impossible')
  })
})
