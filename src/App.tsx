import { useState } from 'react'

import { GameScreen } from '@/game-screen'
import type { GameState } from '@/mugloar'
import { StartScreen } from '@/start-screen'

function App() {
  // The whole of the app's routing: no game yet = the start screen. There
  // is no server and a refresh starts over
  const [game, setGame] = useState<GameState>()

  return game == null ? <StartScreen onStarted={setGame} /> : <GameScreen game={game} />
}

export default App
