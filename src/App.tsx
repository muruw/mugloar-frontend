import { useState } from 'react'

import { GameScreen } from '@/game-screen'
import type { GameState } from '@/mugloar'
import { StartScreen } from '@/start-screen'

function App() {
  // The whole of the app's routing: no game yet = the start screen. There
  // is no server and a refresh starts over
  const [game, setGame] = useState<GameState>()

  function mergeResult(result: Partial<GameState>) {
    setGame((previous) => previous && { ...previous, ...result })
  }

  return game == null ? (
    <StartScreen onStarted={setGame} />
  ) : (
    <GameScreen game={game} onResult={mergeResult} onRestart={() => setGame(undefined)} />
  )
}

export default App
