export default function separateAddressParts(addressString = '') {
  const parts = addressString.split(',').map((part) => part.trim())
  const address = parts[0]
  const district = parts[1]
  const city = parts[2]

  return { address, district, city }
}
