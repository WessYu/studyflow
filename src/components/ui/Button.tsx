import { ComponentProps } from 'react'
import styles from './Button.module.css'

type Props = ComponentProps<'button'> & {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: Props) {
  const cn = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')
  return <button className={cn} {...props} />
}
