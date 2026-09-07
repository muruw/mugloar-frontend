/**
 * This file has all Dragons of Mugloar API endpoints exposed as methods.
 *
 * API documentation is found at:
 * https://dragonsofmugloar.com/doc/
 */

const API_BASE_URL = 'https://dragonsofmugloar.com/api/v2'

export interface NewGame {
  gameId: string
  lives: number
  gold: number
  level: number
  score: number
  highScore: number
  turn: number
}

export interface Reputation {
  people: number
  state: number
  underworld: number
}

export interface Message {
  adId: string
  message: string
  reward: number
  expiresIn: number
  /** Undocumented. The odds of solving it, e.g. "Piece of cake". */
  probability: string
}

export interface SolveMessageAttempt {
  success: boolean
  lives: number
  gold: number
  score: number
  highScore: number
  turn: number
  message: string
}

export interface ShopItem {
  id: string
  name: string
  cost: number
}

export interface ShopItemPurchase {
  shoppingSuccess: boolean
  gold: number
  lives: number
  level: number
  turn: number
}

/**
 * Everything the API has told us about this game so far.
 */
export type GameState = NewGame

/**
 * Because there is no single endpoint that tells us how many lives or gold the player has,
 * we merge all api responses together into game state and thus type is like it is.
 */
export function mergeResponse(game: GameState, response: Partial<GameState>): GameState {
  return { ...game, ...response }
}

/** Start a new game. */
export function startGame(): Promise<NewGame> {
  return request<NewGame>('POST', '/game/start')
}

/** Run an investigation about your reputation. Costs a turn, as the actions do. */
export function investigateReputation(gameId: string): Promise<Reputation> {
  return request<Reputation>('POST', `/${gameId}/investigate/reputation`)
}

/** Get all messages from the message board. */
export function getMessages(gameId: string): Promise<Message[]> {
  return request<Message[]>('GET', `/${gameId}/messages`)
}

/** Try to solve one of the messages from message board. */
export function solveMessage(gameId: string, adId: string): Promise<SolveMessageAttempt> {
  return request<SolveMessageAttempt>('POST', `/${gameId}/solve/${adId}`)
}

/** Get the listing of items available in shop. It does not change during a game. */
export function getShopItems(gameId: string): Promise<ShopItem[]> {
  return request<ShopItem[]>('GET', `/${gameId}/shop`)
}

/** Purchase an item. Costs a turn even when the purchase fails. */
export function purchaseShopItem(gameId: string, itemId: string): Promise<ShopItemPurchase> {
  return request<ShopItemPurchase>('POST', `/${gameId}/shop/buy/${itemId}`)
}

async function request<T>(method: 'GET' | 'POST', path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { method })

  if (!response.ok) {
    // Every endpoint answers 410 once the player is out of lives.
    throw new Error(
      response.status === 410
        ? 'This game is over.'
        : `The game server said ${response.status} ${response.statusText}.`,
    )
  }

  return (await response.json()) as T
}
