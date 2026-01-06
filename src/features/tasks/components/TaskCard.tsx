import styles from './TaskCard.module.css'
import { Task } from '../types'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { formatDateBR, isOverdue } from '../../../utils/date'

const priorityLabel: Record<Task['priority'], string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

function priorityTone(p: Task['priority']) {
  if (p === 'high') return 'bad'
  if (p === 'medium') return 'warn'
  return 'neutral'
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}) {
  const overdue = isOverdue(task.dueDate) && task.status !== 'done'

  return (
    <article
      className={styles.card}
      draggable
      onDragStart={(e) => {
        // guarda o id do card pra coluna pegar no drop
        e.dataTransfer.setData('text/taskId', task.id)
        e.dataTransfer.effectAllowed = 'move'
      }}
    >
      <div className={styles.top}>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.badges}>
          <Badge tone={priorityTone(task.priority)}>{priorityLabel[task.priority]}</Badge>
          {overdue ? <Badge tone="bad">Atrasada</Badge> : null}
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.subject}>{task.subject || 'Sem matéria'}</span>
        <span className={styles.dot}>•</span>
        <span>{task.dueDate ? `Prazo: ${formatDateBR(task.dueDate)}` : 'Sem prazo'}</span>
      </div>

      {task.tags.length > 0 ? (
        <div className={styles.tags}>
          {task.tags.slice(0, 4).map((t) => (
            <span key={t} className={styles.tag}>
              #{t}
            </span>
          ))}
          {task.tags.length > 4 ? (
            <span className={styles.more}>+{task.tags.length - 4}</span>
          ) : null}
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button variant="ghost" size="sm" onClick={() => onEdit(task.id)}>
          Editar
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
          Excluir
        </Button>
      </div>
    </article>
  )
}
