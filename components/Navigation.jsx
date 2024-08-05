'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from './ui/button'
import Link from 'next/link'
import React from 'react'
import truncate from '@/lib/truncate'
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

function Navigation({ navLinks = [] }) {
  const pathname = usePathname()
  const router = useRouter()
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  return (
    <>
      <div className="space-x-8 flex h-full">
        {navLinks.map(({ title, path }) => (
          <Link key={`header${title}`} href={path}>
            <div className="relative flex justify-center  items-center h-full w-[100px]">
              <p className="uppercase">{title}</p>
              {pathname === path && (
                <div className="h-1 absolute bottom-0 right-0 left-0 mx-auto nav-gradient"></div>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="gap-4 flex items-center">
        <Button
          onClick={() => open()}
          className="text-white bg-transparent w-[100px]"
          variant="outline">
          {address ? truncate(address) : 'Connect'}
        </Button>
      </div>
    </>
  )
}

export default Navigation
