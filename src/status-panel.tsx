import { Card, CardContent } from '@/components/ui/8bit/card'
import type { GameState } from '@/mugloar'

export interface StatusPanelProps {
  game: GameState
}

/** player stats/statuses */
export function StatusPanel({ game }: StatusPanelProps) {
  return (
    <section className="flex w-full max-w-[1100px] flex-col gap-8 text-left">
      <Card>
        <CardContent className="flex flex-1 flex-col gap-5 px-(--card-spacing)">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5">
            <Stat label="Lives" value={game.lives} textColor="text-red-400" />
            <Stat label="Gold" value={game.gold} textColor="text-yellow-400" />
            <Stat label="Score" value={game.score} />
            <Stat label="Level" value={game.level} />
            <Stat label="Turn" value={game.turn} />
          </dl>
        </CardContent>
      </Card>
    </section>
  )
}

interface StatProps {
  label: string
  value: number
  textColor?: string
}

function Stat({ label, value, textColor }: StatProps) {
  return (
    <div className="flex flex-col gap-3">
      <dt className={`text-[8px] ${textColor ? textColor : ''} uppercase opacity-55`}>{label}</dt>
      <dd className={`text-sm ${textColor ? textColor : ''} leading-none`}>{value}</dd>
    </div>
  )
}
