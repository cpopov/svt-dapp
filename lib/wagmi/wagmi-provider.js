'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config, projectId } from './config'

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableOnramp: true, // Optional - false as default
  enableSwaps: false,
  excludeWalletIds: [
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
    '6adb6082c909901b9e7189af3a4a0223102cd6f8d5c39e39f3d49acb92b578bb'
  ]
})

export default function Web3ModalProvider({ children, initialState }) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
