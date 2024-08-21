import { cookieStorage, createStorage } from 'wagmi'

import { base, sepolia } from 'wagmi/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'SVT',
  description: 'SVT',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = []
if (process.env.NEXT_PUBLIC_ENABLE_SEPOLIA) {
  chains.push(sepolia)
}
if (process.env.NEXT_PUBLIC_ENABLE_BASE) {
    chains.push(base)
}

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})
