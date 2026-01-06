import { ComponentProps } from 'react'
import styles from './Input.module.css'

type Props = ComponentProps<'input'> & {
  label?: string
}

export function Input({ label, id, className, ...props }: Props) {
  const inputId = id ?? props.name
  return (
    <label className={styles.field}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input
        id={inputId}
        className={[styles.input, className].filter(Boolean).join(' ')}
        {...props}
      />
    </label>
  )
}
