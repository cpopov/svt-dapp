// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

const truncate = address => {
  const match = address?.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

export default truncate
