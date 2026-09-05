import type { NewGame } from '@/mugloar'
import { Screen } from '@/screen'

export interface GameScreenProps {
  game: NewGame
}

export function GameScreen({ game }: GameScreenProps) {
  return (
    <Screen>
      <header className="flex flex-col gap-3">
        <h1 className="text-xl leading-relaxed uppercase">Game</h1>
        <p className="text-xs leading-loose">Game ID: {game.gameId}</p>
      </header>
    </Screen>
  )
}
