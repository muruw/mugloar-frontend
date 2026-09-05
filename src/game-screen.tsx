import { useState, type ReactNode } from 'react'

import { Badge } from '@/components/ui/8bit/badge'
import { Button } from '@/components/ui/8bit/button'
import { Spinner } from '@/components/ui/8bit/spinner'
import {
  getMessages,
  getShopItems,
  purchaseShopItem,
  solveMessage,
  type GameState,
  type Message,
  type ShopItem,
} from '@/mugloar'
import { QuestBoard } from '@/quest-board'
import { Screen } from '@/screen'
import { ShopBoard } from '@/shop-board'
import { StatusPanel } from '@/status-panel'
import { useBoard } from '@/use-board'

export interface GameScreenProps {
  game: GameState
  onResult: (result: Partial<GameState>) => void
  onRestart: () => void
}

export function GameScreen({ game, onResult, onRestart }: GameScreenProps) {
  const { gameId } = game

  const quests = useBoard(gameId, getMessages)
  const shop = useBoard(gameId, getShopItems)

  const [busy, setBusy] = useState(false)
  const [lastTurn, setLastTurn] = useState<string>()

  const gameOver = game.lives === 0

  async function solve(quest: Message) {
    setBusy(true)

    try {
      const { success: _success, message, ...numbers } = await solveMessage(gameId, quest.adId)

      onResult(numbers)
      setLastTurn(message)
    } catch (cause) {
      setLastTurn(cause instanceof Error ? cause.message : String(cause))
    }

    // refresh because turn is spent
    await quests.refresh()
    setBusy(false)
  }

  async function buy(item: ShopItem) {
    setBusy(true)

    try {
      const { shoppingSuccess, ...numbers } = await purchaseShopItem(gameId, item.id)

      onResult(numbers)
      setLastTurn(shoppingSuccess ? `You bought ${item.name}.` : `You could not buy ${item.name}.`)
    } catch (cause) {
      setLastTurn(cause instanceof Error ? cause.message : String(cause))
    }

    // refresh because turn is spent
    await quests.refresh()
    setBusy(false)
  }

  return (
    <Screen>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-xl leading-relaxed uppercase">Game</h1>
        <Badge className="text-[9px]">{game.gameId}</Badge>
      </header>

      <StatusPanel game={game} />

      {lastTurn != null && (
        <p role="status" className="text-[10px] leading-loose opacity-75">
          {lastTurn}
        </p>
      )}

      {gameOver ? (
        <section className="flex flex-col items-center gap-8">
          <h2 className="text-base leading-relaxed uppercase">Game over</h2>
          <p className="text-[10px] leading-loose opacity-75">
            You finished with {game.score} point{game.score === 1 ? '' : 's'}.
          </p>
          <Button size="lg" onClick={onRestart}>
            Play again
          </Button>
        </section>
      ) : quests.loading || shop.loading ? (
        <p className="flex items-center gap-3 text-[10px] leading-loose opacity-75">
          <Spinner aria-hidden className="size-4" />
          Reading..
        </p>
      ) : (
        <>
          <BoardState error={quests.error} items={quests.items} empty="The message board is empty.">
            {(items) => <QuestBoard quests={items} busy={busy} onSolve={solve} />}
          </BoardState>

          <BoardState error={shop.error} items={shop.items} empty="The shop has been fully looted.">
            {(items) => <ShopBoard items={items} busy={busy} onBuy={buy} />}
          </BoardState>
        </>
      )}
    </Screen>
  )
}

interface BoardStateProps<T> {
  items: T[] | undefined
  error: string | undefined
  empty: string
  children: (items: T[]) => ReactNode
}

function BoardState<T>({ items, error, empty, children }: BoardStateProps<T>) {
  if (error != null) {
    return (
      <p role="alert" className="text-[10px] leading-loose opacity-75">
        {error}
      </p>
    )
  }

  if (items == null || items.length === 0) {
    return <p className="text-[10px] leading-loose opacity-75">{empty}</p>
  }

  return <>{children(items)}</>
}
