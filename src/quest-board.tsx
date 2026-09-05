import { CardCarousel } from '@/card-carousel'
import { Button } from '@/components/ui/8bit/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/8bit/card'
import type { Message } from '@/mugloar'

export interface QuestBoardProps {
  quests: Message[]
  busy: boolean
  onSolve: (quest: Message) => void
}

export function QuestBoard({ quests, busy, onSolve }: QuestBoardProps) {
  return (
    <CardCarousel
      label="Quests"
      heading="Message board"
      caption={`${quests.length} quest${quests.length === 1 ? '' : 's'} waiting for a hero`}
      itemNoun="Quest"
      items={quests}
      keyOf={(quest) => quest.adId}
    >
      {(quest) => <QuestCard quest={quest} busy={busy} onSolve={onSolve} />}
    </CardCarousel>
  )
}

interface QuestCardProps {
  quest: Message
  busy: boolean
  onSolve: (quest: Message) => void
}

function QuestCard({ quest, busy, onSolve }: QuestCardProps) {
  const { adId, message, reward, expiresIn, probability } = quest

  return (
    <Card className="h-full text-left">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 text-[10px] leading-relaxed">
        <span>{reward} G</span>
        <span className="opacity-70">
          {expiresIn} turn{expiresIn === 1 ? '' : 's'} left
        </span>
      </CardHeader>

      {/* overflow-wrap:anywhere is for quests with very long texts. */}
      <CardContent className="flex flex-1 flex-col justify-between gap-3 px-(--card-spacing) text-[10px] leading-loose [overflow-wrap:anywhere]">
        {message}
        <span className="opacity-70">Odds: {probability}</span>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/50 p-(--card-spacing)">
        <span className="text-[8px] opacity-55">#{adId}</span>
        <Button
          size="sm"
          disabled={busy}
          aria-label={`Solve quest ${adId}`}
          onClick={() => onSolve(quest)}
        >
          Solve
        </Button>
      </CardFooter>
    </Card>
  )
}
