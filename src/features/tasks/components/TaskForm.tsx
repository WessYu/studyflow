import { useEffect, useMemo, useState } from 'react'
import styles from './TaskForm.module.css'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Task, TaskDraft, TaskPriority, TaskStatus } from '../types'

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'A fazer' },
  { value: 'doing', label: 'Fazendo' },
  { value: 'done', label: 'Feito' },
]

const priorityOptions: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
]

function toDraft(task?: Task): TaskDraft {
  return {
    title: task?.title ?? '',
    subject: task?.subject ?? '',
    tags: task?.tags ?? [],
    priority: task?.priority ?? 'medium',
    status: task?.status ?? 'todo',
    dueDate: task?.dueDate ?? '',
  }
}

export function TaskForm({
  mode,
  initial,
  onSubmit,
  onCancel,
}: {
  mode: 'create' | 'edit'
  initial?: Task
  onSubmit: (draft: TaskDraft) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState<TaskDraft>(() => toDraft(initial))
  const [touched, setTouched] = useState(false)

  // input auxiliar pra tags (eu curto assim pq fica fácil de controlar)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    setDraft(toDraft(initial))
    setTagInput('')
  }, [initial])

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!draft.title.trim()) e.title = 'Título é obrigatório.'
    if (draft.title.trim().length > 60) e.title = 'Título muito longo (máx. 60).'
    if (draft.subject.trim().length > 30) e.subject = 'Matéria muito longa (máx. 30).'
    return e
  }, [draft])

  const canSubmit = Object.keys(errors).length === 0

  function normalizeTag(raw: string) {
    return raw.trim().toLowerCase()
  }

  function addTag() {
    const t = normalizeTag(tagInput)
    if (!t) return

    setDraft((d) => {
      if (d.tags.includes(t)) return d
      return { ...d, tags: [...d.tags, t] }
    })

    setTagInput('')
  }

  function removeTag(tag: string) {
    setDraft((d) => ({ ...d, tags: d.tags.filter((x) => x !== tag) }))
  }

  return (
    <form
      className={styles.form}
      onSubmit={(ev) => {
        ev.preventDefault()
        setTouched(true)
        if (!canSubmit) return

        onSubmit({
          ...draft,
          title: draft.title.trim(),
          subject: draft.subject.trim(),
          tags: (draft.tags ?? [])
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean),
          dueDate: draft.dueDate?.trim() ? draft.dueDate : '',
        })
      }}
    >
      <div className={styles.row}>
        <Input
          label="Título"
          placeholder="Ex: Revisar hooks do React"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
        />
        {touched && errors.title ? <div className={styles.error}>{errors.title}</div> : null}
      </div>

      <div className={styles.row}>
        <Input
          label="Matéria"
          placeholder="Ex: Front-End"
          value={draft.subject}
          onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
        />
        {touched && errors.subject ? <div className={styles.error}>{errors.subject}</div> : null}
      </div>

      <div className={styles.row}>
        <div className={styles.tagsHeader}>
          <span className={styles.tagsLabel}>Tags</span>
          <span className={styles.tagsHint}>Ex: react, css, entrevista</span>
        </div>

        <div className={styles.tagsInputRow}>
          <input
            className={styles.tagsInput}
            placeholder="Digite uma tag e pressione Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
          />
          <Button type="button" variant="ghost" onClick={addTag}>
            Adicionar
          </Button>
        </div>

        {draft.tags.length > 0 ? (
          <div className={styles.tagsList}>
            {draft.tags.map((t) => (
              <button
                key={t}
                type="button"
                className={styles.tag}
                onClick={() => removeTag(t)}
                title="Remover tag"
              >
                #{t} <span className={styles.tagX}>✕</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.tagsEmpty}>Sem tags ainda.</div>
        )}
      </div>

      <div className={styles.grid}>
        <Select
          label="Status"
          value={draft.status}
          onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as TaskStatus }))}
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>

        <Select
          label="Prioridade"
          value={draft.priority}
          onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value as TaskPriority }))}
        >
          {priorityOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>

        <Input
          label="Prazo"
          type="date"
          value={draft.dueDate ?? ''}
          onChange={(e) => setDraft((d) => ({ ...d, dueDate: e.target.value }))}
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{mode === 'create' ? 'Criar' : 'Salvar'}</Button>
      </div>
    </form>
  )
}
