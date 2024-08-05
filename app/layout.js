import './globals.css'

import Navbar from '@/components/Navbar'
import { Titillium_Web } from 'next/font/google'
import WagmiProviderComp from '@/lib/wagmi/wagmi-provider'
import { config } from '@/lib/wagmi/config'
import { cookieToInitialState } from 'wagmi'
import { headers } from 'next/headers'

const titillium = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin']
})

export const metadata = {
  title: 'SVT',
  description: ''
}

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={titillium.className}>
        <WagmiProviderComp initialState={initialState}>
          <Navbar />
          {children}
        </WagmiProviderComp>
      </body>
    </html>
  )
}
