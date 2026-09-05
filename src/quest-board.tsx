import { Button } from '@/components/ui/8bit/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/8bit/carousel'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/8bit/card'
import type { Message } from '@/mugloar'

export interface QuestBoardProps {
  quests: Message[]
}

export function QuestBoard({ quests }: QuestBoardProps) {
  return (
    <section className="flex w-full max-w-[1100px] flex-col items-center gap-5">
      <h2 className="text-base leading-relaxed uppercase">Message board</h2>
      <p className="text-[10px] leading-loose opacity-75">
        {quests.length} quest{quests.length === 1 ? '' : 's'} waiting for a hero
      </p>

      <div className="w-full px-10 md:px-14">
        <Carousel
          aria-label="Quests"
          tabIndex={0}
          opts={{ align: 'start' }}
          className="focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <CarouselContent>
            {quests.map((quest, index) => (
              <CarouselItem
                key={quest.adId}
                aria-label={`Quest ${index + 1} of ${quests.length}`}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full px-1.5">
                  <QuestCard quest={quest} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious aria-label="Previous quests" />
          <CarouselNext aria-label="Next quests" />
        </Carousel>
      </div>
    </section>
  )
}

interface QuestCardProps {
  quest: Message
}

function QuestCard({ quest: { adId, message, reward, expiresIn } }: QuestCardProps) {
  return (
    <Card className="h-full text-left">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 text-[10px] leading-relaxed">
        <span>{reward} G</span>
        <span className="opacity-70">
          {expiresIn} turn{expiresIn === 1 ? '' : 's'} left
        </span>
      </CardHeader>

      {/* overflow-wrap:anywhere is for quests with very long texts. */}
      <CardContent className="flex-1 px-(--card-spacing) text-[10px] leading-loose [overflow-wrap:anywhere]">
        {message}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/50 p-(--card-spacing)">
        <span className="text-[8px] opacity-55">#{adId}</span>
        <Button size="sm" aria-label={`Solve quest ${adId}`}>
          Solve
        </Button>
      </CardFooter>
    </Card>
  )
}
