import { ComponentProps } from 'react'
import styles from './Select.module.css'

type Props = ComponentProps<'select'> & {
  label?: string
}

export function Select({ label, id, className, children, ...props }: Props) {
  const selectId = id ?? props.name
  return (
    <label className={styles.field}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <select
        id={selectId}
        className={[styles.select, className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
