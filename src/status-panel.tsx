import { Button } from '@/components/ui/8bit/button'
import { Card, CardContent } from '@/components/ui/8bit/card'
import type { GameState, Reputation } from '@/mugloar'

export type ReputationReading = Reputation & { turn: number }

export interface StatusPanelProps {
  game: GameState
  /** The last reading, or undefined if the player has not investigated yet. */
  reputation?: ReputationReading
  busy: boolean
  gameOver: boolean
  onInvestigate: () => void
}

/** player stats/statuses */
export function StatusPanel({
  game,
  reputation,
  busy,
  gameOver,
  onInvestigate,
}: StatusPanelProps) {
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

          <div className="flex flex-col gap-5 border-t pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-[8px] uppercase opacity-55">Reputation</h2>
                <span className="text-[8px] opacity-55">
                  {reputation == null ? 'Not checked yet' : `as of turn ${reputation.turn}`}
                </span>
              </div>

              {!gameOver && (
                <Button size="sm" disabled={busy} onClick={onInvestigate}>
                  Investigate
                </Button>
              )}
            </div>

            <dl className="grid grid-cols-3 gap-x-6 gap-y-5">
              <Stat label="People" value={reputation?.people ?? '—'} />
              <Stat label="State" value={reputation?.state ?? '—'} />
              <Stat label="Underworld" value={reputation?.underworld ?? '—'} />
            </dl>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

interface StatProps {
  label: string
  value: number | string
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
