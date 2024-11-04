import './globals.css'

import Footer from '@/components/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import Navbar from '@/components/Navbar'
import { Titillium_Web } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
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
      <body className={`${titillium.className} bg-accent-dark`}>
        <GoogleTagManager gtmId="G-2LQSX91QWM" />
        <WagmiProviderComp initialState={initialState}>
          <Navbar />
          <div className="bg-background">{children}</div>
          <Footer />
          <Toaster />
        </WagmiProviderComp>
      </body>
    </html>
  )
}
