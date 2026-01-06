export function uid(prefix = 't') {
  const rand = Math.random().toString(16).slice(2)
  const now = Date.now().toString(16)
  return `${prefix}_${now}_${rand}`
}
