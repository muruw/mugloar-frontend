import { useEffect } from 'react'

/**
 * Asks the browser to confirm before a refresh, a close, or a back-navigation
 */
export function useLeaveWarning(active: boolean) {
  useEffect(() => {
    if (!active) {
      return
    }

    function warn(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', warn)

    return () => window.removeEventListener('beforeunload', warn)
  }, [active])
}
