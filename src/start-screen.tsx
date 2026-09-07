import { useState } from 'react'

import { Button } from '@/components/ui/8bit/button'
import { Spinner } from '@/components/ui/8bit/spinner'
import { startGame, type NewGame } from '@/mugloar'
import { Screen } from '@/screen'
import { Tutorial } from '@/tutorial'

export interface StartScreenProps {
  onStarted: (game: NewGame) => void
}

export function StartScreen({ onStarted }: StartScreenProps) {
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string>()

  async function start() {
    setStarting(true)
    setError(undefined)

    try {
      onStarted(await startGame())
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
      setStarting(false)
    }
  }

  return (
    <Screen>
      <h1 className="text-xl leading-relaxed uppercase">Dragons of Mugloar</h1>

      <Button size="lg" disabled={starting} onClick={start}>
        {starting && <Spinner aria-hidden className="size-4" />}
        {starting ? 'Starting' : 'Start game'}
      </Button>

      {error != null && (
        <p role="alert" className="text-[10px] leading-loose opacity-75">
          {error}
        </p>
      )}

      <Tutorial />
    </Screen>
  )
}
