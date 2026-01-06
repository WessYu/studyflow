import { ReactNode } from 'react'
import styles from './Card.module.css'

export function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <div className={styles.title}>{title}</div>
          {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
        </div>
        {right ? <div className={styles.right}>{right}</div> : null}
      </header>
      {children ? <div className={styles.body}>{children}</div> : null}
    </section>
  )
}
