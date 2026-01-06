import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import styles from './LoginPage.module.css'
import { auth } from '../../features/auth/auth'

export function LoginPage() {
  const nav = useNavigate()
  const [name, setName] = useState('')

  const canGo = useMemo(() => name.trim().length >= 2, [name])

  return (
    <div className={styles.wrap}>
      <Card title="Entrar" subtitle="Login fake só pra dar aquela cara de produto 😄">
        <div className={styles.form}>
          <Input
            label="Seu nome"
            placeholder="Ex: Wesley"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            onClick={() => {
              if (!canGo) return
              auth.login(name.trim())
              nav('/')
            }}
            disabled={!canGo}
          >
            Entrar
          </Button>

          <div className={styles.tip}>
            Dica: isso salva no <code>localStorage</code>. Se quiser “deslogar”,
            é só clicar em <strong>Sair</strong> lá em cima.
          </div>
        </div>
      </Card>
    </div>
  )
}
