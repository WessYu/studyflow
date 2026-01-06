import { useCallback, useMemo, useState } from 'react'
import { uid } from '../../../utils/id'
import { loadTasks, saveTasks } from '../services/taskStorage'
import { Task, TaskDraft, TaskPriority, TaskStatus } from '../types'

export type TaskFilters = {
  q: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
}

const defaultDraft: TaskDraft = {
  title: '',
  subject: '',
  tags: [],
  priority: 'medium',
  status: 'todo',
  dueDate: '',
}

const defaultFilters: TaskFilters = {
  q: '',
  status: 'all',
  priority: 'all',
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters)

  // eu curto centralizar o "salvar" num lugar só,
  // aí o resto do código fica mais limpo.
  const persist = useCallback((next: Task[]) => {
    setTasks(next)
    saveTasks(next)
  }, [])

  const createTask = useCallback(
    (draft: TaskDraft) => {
      const now = new Date().toISOString()

      const task: Task = {
        id: uid('task'),
        ...defaultDraft,
        ...draft,
        tags: Array.isArray(draft.tags) ? draft.tags : [],
        dueDate: draft.dueDate?.trim() ? draft.dueDate : undefined,
        createdAt: now,
        updatedAt: now,
      }

      persist([task, ...tasks])
    },
    [persist, tasks],
  )

  const updateTask = useCallback(
    (id: string, patch: Partial<TaskDraft>) => {
      const now = new Date().toISOString()

      const next = tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              ...patch,
              tags: patch.tags ?? t.tags,
              dueDate: patch.dueDate?.trim()
                ? patch.dueDate
                : patch.dueDate === ''
                  ? undefined
                  : t.dueDate,
              updatedAt: now,
            }
          : t,
      )

      persist(next)
    },
    [persist, tasks],
  )

  const removeTask = useCallback(
    (id: string) => {
      persist(tasks.filter((t) => t.id !== id))
    },
    [persist, tasks],
  )

  const clearAll = useCallback(() => {
    persist([])
  }, [persist])

  // drag & drop simples: muda o status pra coluna onde soltou
  const moveTask = useCallback(
    (id: string, nextStatus: TaskStatus) => {
      const now = new Date().toISOString()

      const next = tasks.map((t) =>
        t.id === id ? { ...t, status: nextStatus, updatedAt: now } : t,
      )

      persist(next)
    },
    [persist, tasks],
  )

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()

    return tasks.filter((t) => {
      const matchText =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))

      const matchStatus = filters.status === 'all' || t.status === filters.status
      const matchPriority =
        filters.priority === 'all' || t.priority === filters.priority

      return matchText && matchStatus && matchPriority
    })
  }, [tasks, filters])

  const stats = useMemo(() => {
    const total = tasks.length
    const todo = tasks.filter((t) => t.status === 'todo').length
    const doing = tasks.filter((t) => t.status === 'doing').length
    const done = tasks.filter((t) => t.status === 'done').length
    const progress = total === 0 ? 0 : Math.round((done / total) * 100)

    return { total, todo, doing, done, progress }
  }, [tasks])

  return {
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
  }
}
