import { useTheme } from '../../hooks/useTheme'
import { Button } from './Button'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <Button variant="ghost" onClick={toggle} aria-label="Alternar tema">
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  )
}
