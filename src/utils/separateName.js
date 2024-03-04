export default function separateLastNameAndFirstName(fullName) {
  const words = fullName.trim().split(' ')
  const firstName = words.pop() // Remove and return the last word as the first name
  const lastName = words.join(' ') // Join the remaining words as the last name
  return { lastName, firstName }
}
