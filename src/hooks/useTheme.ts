import { useCallback, useEffect, useMemo, useState } from 'react'
import { storage } from '../services/storage/storage'

export type Theme = 'light' | 'dark'

const KEY = 'studyflow:theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = storage.get<Theme>(KEY)
    return saved ?? 'dark'
  })

  useEffect(() => {
    storage.set(KEY, theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return useMemo(() => ({ theme, setTheme, toggle }), [theme, toggle])
}
