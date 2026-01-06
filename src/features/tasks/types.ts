export type TaskStatus = 'todo' | 'doing' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  subject: string
  tags: string[] // tags tipo: ['react', 'css', 'prova']
  priority: TaskPriority
  status: TaskStatus
  dueDate?: string // yyyy-mm-dd
  createdAt: string
  updatedAt: string
}

export type TaskDraft = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
