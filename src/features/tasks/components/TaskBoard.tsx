import styles from './TaskBoard.module.css'
import { Task, TaskStatus } from '../types'
import { TaskCard } from './TaskCard'

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'A fazer' },
  { status: 'doing', title: 'Fazendo' },
  { status: 'done', title: 'Feito' },
]

export function TaskBoard({
  tasks,
  onEdit,
  onDelete,
  onDropTask,
}: {
  tasks: Task[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onDropTask: (id: string, nextStatus: TaskStatus) => void
}) {
  const byStatus: Record<TaskStatus, Task[]> = { todo: [], doing: [], done: [] }
  for (const t of tasks) byStatus[t.status].push(t)

  return (
    <div className={styles.board}>
      {columns.map((col) => (
        <section
          key={col.status}
          className={styles.col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData('text/taskId')
            if (!id) return
            onDropTask(id, col.status)
          }}
        >
          <header className={styles.colHeader}>
            <div className={styles.colTitle}>{col.title}</div>
            <div className={styles.colCount}>{byStatus[col.status].length}</div>
          </header>

          <div className={styles.colBody}>
            {byStatus[col.status].length === 0 ? (
              <div className={styles.empty}>Arrasta uma tarefa pra cá ✨</div>
            ) : (
              byStatus[col.status].map((t) => (
                <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
