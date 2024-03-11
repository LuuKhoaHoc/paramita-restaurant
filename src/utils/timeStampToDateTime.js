const timestampToDateTime = (timestamp) => {
  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    throw new Error('Invalid timestamp provided')
  }

  // Assuming timestamp is in milliseconds since epoch
  const date = new Date(timestamp)

  // Get the day, month (0-indexed), and year
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Add 1 to get actual month
  const year = date.getFullYear()

  // Format the date string with dot separators
  return `${day}.${month}.${year}`
}

export default timestampToDateTime
