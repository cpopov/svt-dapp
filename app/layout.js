import './globals.css'

import Navbar from '@/components/Navbar'
import { Titillium_Web } from 'next/font/google'

const titillium = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin']
})

export const metadata = {
  title: 'SVT',
  description: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={titillium.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
