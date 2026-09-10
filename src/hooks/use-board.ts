import { useCallback, useEffect, useState } from 'react'

export interface Board<T> {
  /** The items, once read. Undefined while loading, or if the read failed. */
  items?: T[]
  error?: string
  loading: boolean
  refresh: () => Promise<void>
}

/**
 * Reads the message board or the shop and keeps the result, along with any
 * error. Both boards work the same way, so they share this.
 *
 * A refresh keeps the current items on screen until the new ones arrive, so the
 * board doesn't flash empty after a purchase.
 */
export function useBoard<T>(gameId: string, load: (gameId: string) => Promise<T[]>): Board<T> {
  const [items, setItems] = useState<T[]>()
  const [error, setError] = useState<string>()

  const refresh = useCallback(
    () =>
      load(gameId).then(
        (loaded) => {
          setItems(loaded)
          setError(undefined)
        },
        (cause: unknown) => {
          setItems(undefined)
          setError(cause instanceof Error ? cause.message : String(cause))
        },
      ),
    [gameId, load],
  )

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { items, error, loading: items == null && error == null, refresh }
}
