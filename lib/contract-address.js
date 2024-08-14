export const loadContract = chainId => {
  switch (chainId) {
    case 11155111:
      return {
        usdc: '0x2d90C8D7ADfC4Db1871f7B85e27Ad736c7729a34'
      }
    case 8453:
      return {
        usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
      }
      break
    default:
      return {}
  }
}
