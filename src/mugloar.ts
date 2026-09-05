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
  reward: string
  expiresIn: number
}

export interface SolveMessageAttempt {
  success: boolean;
  lives: number;
  gold: number;
  score: number;
  highScore: number;
  turn: number;
  message: string;
}

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
}

export interface ShopItemPurchase {
  shoppingSuccess: string;
  gold: number;
  lives: number;
  level: number;
  turn: number;
}

/** Start a new game. */
export function startGame(): Promise<NewGame> {
  return request<NewGame>('POST', '/game/start')
}

/** Run an investigation about your reputation. */
export function investigateReputation(gameId: string): Promise<Reputation> {
  return request<Reputation>('POST', `/${gameId}/investigate/reputation`)
}

/** Get all messages from the message board. */
export function getMessages(gameId: string): Promise<Message[]> {
  return request<Message[]>('GET', `/${gameId}/messages`)
}

/** Try to solve one of the messages from message board. */
export function solveMessage(gameId: string, adId: String): Promise<SolveMessageAttempt> {
  return request<SolveMessageAttempt>("POST", `/${gameId}/solve/${adId}`)
}

/** Get the listing of items available in shop */
export function getShopItems(gameId: string): Promise<ShopItem[]> {
  return request<ShopItem[]>("GET", `${gameId}/shop`);
}

/** Purchase an item */
export function purchaseShopItem(gameId: string, itemId: string): Promise<ShopItemPurchase> {
  return request<ShopItemPurchase>("POST", `/${gameId}/shop/buy/${itemId}`);
}

async function request<T>(method: 'GET' | 'POST', path: string): Promise<T> {
  let response = await fetch(`${API_BASE_URL}${path}`, { method })

  if (!response.ok) {
    throw new Error(`Mugloar API ${method} ${path} failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}
