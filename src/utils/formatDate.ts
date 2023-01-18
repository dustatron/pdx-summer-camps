export default function formatDate(date?: string) {
  if (!date) return ''

  const jsDate = new Date(date)
  return jsDate.toLocaleDateString()
}