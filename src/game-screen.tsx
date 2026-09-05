import { useEffect, useState } from 'react'

import { Spinner } from '@/components/ui/8bit/spinner'
import { getMessages, type Message, type NewGame } from '@/mugloar'
import { QuestBoard } from '@/quest-board'
import { Screen } from '@/screen'

export interface GameScreenProps {
  game: NewGame
}

export function GameScreen({ game }: GameScreenProps) {
  const [quests, setQuests] = useState<Message[]>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    let current = true

    getMessages(game.gameId).then(
      (messages) => current && setQuests(messages),
      (cause: unknown) => current && setError(cause instanceof Error ? cause.message : String(cause)),
    )

    return () => {
      current = false
    }
  }, [game.gameId])

  return (
    <Screen>
      <header className="flex flex-col gap-3">
        <h1 className="text-xl leading-relaxed uppercase">Game</h1>
        <p className="text-xs leading-loose">Game ID: {game.gameId}</p>
      </header>

      {error != null ? (
        <p role="alert" className="text-[10px] leading-loose opacity-75">
          {error}
        </p>
      ) : quests == null ? (
        <p className="flex items-center gap-3 text-[10px] leading-loose opacity-75">
          <Spinner aria-hidden className="size-4" />
          Reading..
        </p>
      ) : quests.length === 0 ? (
        <p className="text-[10px] leading-loose opacity-75">The message board is empty.</p>
      ) : (
        <QuestBoard quests={quests} />
      )}
    </Screen>
  )
}
