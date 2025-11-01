// Deterministic date formatting to avoid hydration mismatches across server/client
// Returns dd/MM/yyyy regardless of runtime locale
export function formatDateIT(input) {
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}
