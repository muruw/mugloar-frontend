import Feature2, { type FeatureRow } from '@/components/ui/8bit/blocks/feature2'
import { Button } from '@/components/ui/8bit/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/8bit/drawer'


const rules: FeatureRow[] = [
  {
    icon: '01',
    title: 'Solve quests',
    description: 'Successful solves award gold and increases your score',
  },
  {
    icon: '02',
    title: 'Failing costs a life',
    description: 'Each failed quest loses lives',
  },
  {
    icon: '03',
    title: 'Each move costs a turn',
    description: 'Solving, buying and investigating cost turns. Quests expire as turns pass.',
  },
  {
    icon: '04',
    title: 'Spend gold in the shop',
    description: 'Items improve your chances when solving quests',
  },
]

export function Tutorial() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" variant="outline">
          How to play
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto flex max-h-[85vh] w-full max-w-[640px] flex-col overflow-y-auto px-6 pb-6 text-left">
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-sm leading-relaxed uppercase">How to play</DrawerTitle>
          </DrawerHeader>

          <Feature2 title="" description="" items={rules} className="px-0 py-0" />

          <DrawerFooter className="px-0">
            <DrawerClose asChild>
              <Button size="sm" variant="outline">
                Got it
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
