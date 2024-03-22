export const formatNumberToPen = (number: number) => {
  return number.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
}