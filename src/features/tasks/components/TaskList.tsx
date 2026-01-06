import styles from './TaskList.module.css'
import { Task, TaskStatus } from '../types'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { formatDateBR, isOverdue } from '../../../utils/date'

const statusLabel: Record<TaskStatus, string> = {
  todo: 'A fazer',
  doing: 'Fazendo',
  done: 'Feito',
}

const priorityLabel: Record<Task['priority'], string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

function statusTone(s: TaskStatus): 'neutral' | 'good' | 'warn' | 'bad' {
  if (s === 'done') return 'good'
  if (s === 'doing') return 'warn'
  return 'neutral'
}

function priorityTone(p: Task['priority']): 'neutral' | 'good' | 'warn' | 'bad' {
  if (p === 'high') return 'bad'
  if (p === 'medium') return 'warn'
  return 'neutral'
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onQuickStatus,
}: {
  tasks: Task[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onQuickStatus: (id: string, status: TaskStatus) => void
}) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyTitle}>Nenhuma tarefa aqui.</div>
        <div className={styles.emptyText}>Crie uma nova tarefa ou ajuste os filtros.</div>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {tasks.map((t) => {
        const overdue = isOverdue(t.dueDate) && t.status !== 'done'
        return (
          <li key={t.id} className={styles.item}>
            <div className={styles.left}>
              <div className={styles.titleRow}>
                <div className={styles.title}>{t.title}</div>
                <div className={styles.badges}>
                  <Badge tone={statusTone(t.status)}>{statusLabel[t.status]}</Badge>
                  <Badge tone={priorityTone(t.priority)}>{priorityLabel[t.priority]}</Badge>
                  {overdue ? <Badge tone="bad">Atrasada</Badge> : null}
                </div>
              </div>

              <div className={styles.meta}>
                <span className={styles.subject}>{t.subject || 'Sem matéria'}</span>
                {t.dueDate ? <span>• Prazo: {formatDateBR(t.dueDate)}</span> : <span>• Sem prazo</span>}
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.quick}>
                <Button variant="ghost" size="sm" onClick={() => onQuickStatus(t.id, 'todo')} title="Marcar como A fazer">
                  ☐
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onQuickStatus(t.id, 'doing')} title="Marcar como Fazendo">
                  ◷
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onQuickStatus(t.id, 'done')} title="Marcar como Feito">
                  ✓
                </Button>
              </div>

              <div className={styles.actions}>
                <Button variant="ghost" size="sm" onClick={() => onEdit(t.id)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(t.id)}>
                  Excluir
                </Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
