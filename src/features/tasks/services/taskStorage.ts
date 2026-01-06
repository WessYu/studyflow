import { storage } from '../../../services/storage/storage'
import { Task } from '../types'

const KEY = 'studyflow:tasks'

export function loadTasks(): Task[] {
  return storage.get<Task[]>(KEY) ?? []
}

export function saveTasks(tasks: Task[]) {
  storage.set(KEY, tasks)
}
