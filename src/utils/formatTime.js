export const formatTime = (timeString) => {
  let date = new Date(timeString)
  date.setHours(date.getHours() + 7)
  return date.toISOString().replace(/T|Z/g, ' - ').split('.')[0]
}
