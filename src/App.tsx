import { useState } from 'react'

import { GameScreen } from '@/game-screen'
import type { NewGame } from '@/mugloar'
import { StartScreen } from '@/start-screen'

function App() {
  // The whole of the app's routing: no game yet means the start screen. There
  // is no server and a refresh starts over, so a URL per screen would buy
  // nothing.
  const [game, setGame] = useState<NewGame>()

  return game == null ? <StartScreen onStarted={setGame} /> : <GameScreen game={game} />
}

export default App
