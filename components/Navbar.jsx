'use client'

import { balanceOfUsdc, formatEth } from '@/lib/contract-utils'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import Navigation from './Navigation'
import { useAccount } from 'wagmi'

export default function Navbar() {
  const { address, isConnected } = useAccount()
  const [balanceUsdc, setBalanceUsdc] = useState(0)
  useEffect(() => {
    if (isConnected) {
      balanceOfUsdc(address)
        .then(bal => {
          setBalanceUsdc(parseFloat(formatEth(bal?.toString())).toFixed(2))
        })
        .catch(e => console.log('Balance fetching usdc: ', e))
    }
  }, [address])
  return (
    <>
      <nav
        className={`md:block hidden absolute top-0 right-0 left-0 m-auto z-50 bg-[#08401A] text-white`}>
        <div className="h-16 flex justify-between items-center container">
          <Link href="/">
            <div className="h-8 w-24 relative">
              <Image
                fill
                alt="logo"
                sizes="auto"
                src="/svt_logo.png"
                className="object-contain"
              />
            </div>
          </Link>
          <Navigation />
        </div>
      </nav>
      <MobileNav balance={balanceUsdc} />
    </>
  )
}
