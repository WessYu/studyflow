import { useMemo, useState } from 'react'
import styles from './DashboardPage.module.css'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Modal } from '../../components/ui/Modal'
import { useTasks } from '../../features/tasks/hooks/useTasks'
import { TaskDraft, TaskPriority, TaskStatus } from '../../features/tasks/types'
import { TaskForm } from '../../features/tasks/components/TaskForm'
import { TaskBoard } from '../../features/tasks/components/TaskBoard'

export function DashboardPage() {
  const {
    tasks,
    filtered,
    filters,
    setFilters,
    createTask,
    updateTask,
    removeTask,
    clearAll,
    moveTask,
    stats,
  } = useTasks()

  const [createOpen, setCreateOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // eu prefiro pegar a task pra editar a partir de "tasks" (total),
  // pq mesmo se o filtro esconder ela, ainda dá pra salvar.
  const editingTask = useMemo(
    () => tasks.find((t) => t.id === editingId) ?? null,
    [tasks, editingId],
  )

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <div className={styles.title}>Kanban</div>
          <div className={styles.subtitle}>
            {stats.total === 0
              ? 'Crie sua primeira tarefa e bora começar.'
              : `${stats.progress}% concluído • ${stats.done}/${stats.total} feito`}
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => setCreateOpen(true)}>+ Nova tarefa</Button>
          <Button
            variant="danger"
            onClick={clearAll}
            disabled={tasks.length === 0}
            title="Apagar todas as tarefas"
          >
            Limpar
          </Button>
        </div>
      </header>

      <section className={styles.filters}>
        <Input
          label="Buscar"
          placeholder="Ex: react, css, prova..."
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />

        <Select
          label="Status"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              status: e.target.value as TaskStatus | 'all',
            }))
          }
        >
          <option value="all">Todos</option>
          <option value="todo">A fazer</option>
          <option value="doing">Fazendo</option>
          <option value="done">Feito</option>
        </Select>

        <Select
          label="Prioridade"
          value={filters.priority}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              priority: e.target.value as TaskPriority | 'all',
            }))
          }
        >
          <option value="all">Todas</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </Select>
      </section>

      <section className={styles.boardWrap}>
        <TaskBoard
          tasks={filtered}
          onEdit={(id) => setEditingId(id)}
          onDelete={(id) => removeTask(id)}
          onDropTask={(id, nextStatus) => moveTask(id, nextStatus)}
        />
      </section>

      <Modal
        open={createOpen}
        title="Nova tarefa"
        onClose={() => setCreateOpen(false)}
      >
        <TaskForm
          mode="create"
          onCancel={() => setCreateOpen(false)}
          onSubmit={(draft: TaskDraft) => {
            createTask(draft)
            setCreateOpen(false)
          }}
        />
      </Modal>

      <Modal
        open={!!editingId}
        title="Editar tarefa"
        onClose={() => setEditingId(null)}
      >
        <TaskForm
          mode="edit"
          initial={editingTask ?? undefined}
          onCancel={() => setEditingId(null)}
          onSubmit={(draft: TaskDraft) => {
            if (editingId) updateTask(editingId, draft)
            setEditingId(null)
          }}
        />
      </Modal>
    </div>
  )
}
