export const splitProps = (props, keysToExtract) => {
  const extracted = {}
  const rest = {}

  Object.entries(props).forEach(([key, value]) => {
    if (keysToExtract.includes(key)) {
      extracted[key] = value
    } else {
      rest[key] = value
    }
  })

  return [rest, extracted]
}
