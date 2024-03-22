export const formatNumberToPen = (number: number) => {
  return number.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
}

export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj)
}