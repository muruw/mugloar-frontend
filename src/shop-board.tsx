import { CardCarousel } from '@/card-carousel'
import { Button } from '@/components/ui/8bit/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/8bit/card'
import type { ShopItem } from '@/mugloar'

export interface ShopBoardProps {
  items: ShopItem[]
  busy: boolean
  onBuy: (item: ShopItem) => void
}

export function ShopBoard({ items, busy, onBuy }: ShopBoardProps) {
  return (
    <CardCarousel
      label="Shop items"
      heading="Item shop"
      caption={`The shop has ${items.length} item${items.length === 1 ? '' : 's'} available to purchase`}
      itemNoun="Item"
      items={items}
      keyOf={(item) => item.id}
    >
      {(item) => <ShopItemCard item={item} busy={busy} onBuy={onBuy} />}
    </CardCarousel>
  )
}

interface ShopItemCardProps {
  item: ShopItem
  busy: boolean
  onBuy: (item: ShopItem) => void
}

function ShopItemCard({ item, busy, onBuy }: ShopItemCardProps) {
  const { id, name, cost } = item

  return (
    <Card className="h-full text-left">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 text-[10px] leading-relaxed">
        <span>{cost} G</span>
      </CardHeader>

      <CardContent className="flex-1 px-(--card-spacing) text-[10px] leading-loose">
        {name}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/50 p-(--card-spacing)">
        <span className="text-[8px] opacity-55">#{id}</span>
        <Button size="sm" disabled={busy} aria-label={`Buy ${name}`} onClick={() => onBuy(item)}>
          Buy
        </Button>
      </CardFooter>
    </Card>
  )
}
