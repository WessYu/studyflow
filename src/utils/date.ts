export function formatDateBR(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso)
  return d.toLocaleDateString('pt-BR')
}

export function isOverdue(dueDate?: string) {
  if (!dueDate) return false
  const today = new Date()
  const due = new Date(`${dueDate}T23:59:59`)
  return due.getTime() < today.getTime()
}
