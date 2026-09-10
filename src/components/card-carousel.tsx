import type { ReactNode } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/8bit/carousel.tsx'

export interface CardCarouselProps<T> {
  label: string
  heading: string
  caption: string
  /** Names a single slide, e.g "Quest 2 of 9". */
  itemNoun: string
  items: T[]
  keyOf: (item: T) => string
  children: (item: T) => ReactNode
}

/**
 * The message board and the shop are one carousel with different cards in it,
 * so the carousel lives here and each board supplies only its own card.
 */
export function CardCarousel<T>({
  label,
  heading,
  caption,
  itemNoun,
  items,
  keyOf,
  children,
}: CardCarouselProps<T>) {
  return (
    <section className="flex w-full max-w-[1100px] flex-col items-center gap-5">
      <h2 className="text-base leading-relaxed uppercase">{heading}</h2>
      <p className="text-[10px] leading-loose opacity-75">{caption}</p>

      <div className="w-full px-10 md:px-14">
        <Carousel
          aria-label={label}
          tabIndex={0}
          opts={{ align: 'start' }}
          className="focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem
                key={keyOf(item)}
                aria-label={`${itemNoun} ${index + 1} of ${items.length}`}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full px-1.5">{children(item)}</div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious aria-label={`Previous ${label.toLowerCase()}`} />
          <CarouselNext aria-label={`Next ${label.toLowerCase()}`} />
        </Carousel>
      </div>
    </section>
  )
}
