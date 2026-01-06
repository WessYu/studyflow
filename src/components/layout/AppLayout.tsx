import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './AppLayout.module.css'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Button } from '../ui/Button'
import { auth } from '../../features/auth/auth'

export function AppLayout({ children }: { children: ReactNode }) {
  const nav = useNavigate()
  const location = useLocation()

  const user = auth.get()
  const onLoginPage = location.pathname === '/login'

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div
          className={styles.brand}
          onClick={() => !onLoginPage && nav('/')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.logo}>SF</div>
          <div>
            <div className={styles.name}>StudyFlow</div>
            <div className={styles.tag}>Kanban de estudos</div>
          </div>
        </div>

        <div className={styles.actions}>
          <ThemeToggle />

          {user && !onLoginPage ? (
            <div className={styles.userArea}>
              <span className={styles.hello}>Olá, {user.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  auth.logout()
                  nav('/login')
                }}
              >
                Sair
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <span>Feito em React + TypeScript</span>
      </footer>
    </div>
  )
}
