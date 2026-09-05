import type { ReactNode } from 'react'

/**
 * The page shell: paints the 8-bit background and centres a single column of
 * content. Every screen renders inside one of these.
 */
export function Screen({ children }: { children?: ReactNode }) {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-16 text-center">
      {children}
    </main>
  )
}
