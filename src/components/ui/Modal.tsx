import { ReactNode, useEffect } from 'react'
import styles from './Modal.module.css'
import { Button } from './Button'

type Props = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export function Modal({ open, title, children, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <header className={styles.header}>
          <div className={styles.title}>{title}</div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fechar">
            ✕
          </Button>
        </header>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
