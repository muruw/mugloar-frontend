import { useState, type ReactNode } from 'react'

import { Badge } from '@/components/ui/8bit/badge.tsx'
import { Button } from '@/components/ui/8bit/button.tsx'
import { Card, CardContent } from '@/components/ui/8bit/card.tsx'
import { Spinner } from '@/components/ui/8bit/spinner.tsx'
import {
  getMessages,
  getShopItems,
  investigateReputation,
  purchaseShopItem,
  solveMessage,
  type GameState,
  type Message,
  type ShopItem,
} from '@/lib/mugloar.ts'
import { QuestBoard } from '@/components/quest-board.tsx'
import { Screen } from '@/components/screen.tsx'
import { ShopBoard } from '@/components/shop-board.tsx'
import { StatusPanel, type ReputationReading } from '@/components/status-panel.tsx'
import { useBoard } from '@/hooks/use-board.ts'
import {Tutorial} from "@/components/tutorial.tsx";

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
  const [reputation, setReputation] = useState<ReputationReading>()

  const gameOver = game.lives === 0

  async function investigate() {
    setBusy(true)

    try {
      const reading = await investigateReputation(gameId)

      // The reply carries no numbers, so count the spent turn here. The next
      // solve or buy overwrites it with the server's own count.
      const turn = game.turn + 1

      onResult({ turn })
      setReputation({ ...reading, turn })
      setLastTurn('You investigated your reputation. That cost a turn.')
    } catch (cause) {
      setLastTurn(cause instanceof Error ? cause.message : String(cause))
    }

    // refresh because turn is spent
    await quests.refresh()
    setBusy(false)
  }

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
        <p className="text-[8px] leading-loose opacity-55">Refreshing restarts the game.</p>

        <Tutorial />
      </header>

      <StatusPanel
        game={game}
        reputation={reputation}
        busy={busy}
        gameOver={gameOver}
        onInvestigate={investigate}
      />

      <section role="status" aria-live="polite" className="w-full max-w-[1100px]">
        {lastTurn != null && (
          // Keyed on the turn so it replays the fade, otherwise solving the same
          // quest twice looks like nothing happened.
          <Card key={game.turn} className="motion-safe:animate-in fade-in slide-in-from-bottom-1 duration-300">
            <CardContent className="flex flex-wrap items-baseline gap-x-4 gap-y-3 px-(--card-spacing) text-left">
              <span className="text-[8px] uppercase opacity-55">Turn {game.turn}</span>
              <p className="flex-1 text-[10px] leading-loose [overflow-wrap:anywhere]">{lastTurn}</p>
            </CardContent>
          </Card>
        )}
      </section>

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
            {(items) => <ShopBoard items={items} playerGold={game.gold} busy={busy} onBuy={buy} />}
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
