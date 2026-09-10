import { useState } from 'react'

import { GameScreen } from '@/components/game-screen.tsx'
import { mergeResponse, type GameState } from '@/lib/mugloar.ts'
import { StartScreen } from '@/components/start-screen.tsx'
import { useLeaveWarning } from '@/hooks/use-leave-warning.ts'

function App() {
  // The whole of the app's routing: no game yet = the start screen. There
  // is no server and a refresh starts over
  const [game, setGame] = useState<GameState>()

  // refresh warning
  useLeaveWarning(game != null && game.lives > 0)

  function mergeResult(result: Partial<GameState>) {
    setGame((previous) => previous && mergeResponse(previous, result))
  }

  return game == null ? (
    <StartScreen onStarted={setGame} />
  ) : (
    <GameScreen game={game} onResult={mergeResult} onRestart={() => setGame(undefined)} />
  )
}

export default App
