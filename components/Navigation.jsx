'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from './ui/button'
import Link from 'next/link'
import React from 'react'

function Navigation({ navLinks = [] }) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <>
      <div className="space-x-8 md:flex hidden h-full">
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
      <div className="gap-4 md:flex hidden items-center">
        <Button
          className="text-white bg-transparent w-[100px]"
          variant="outline">
          Connect
        </Button>
      </div>
    </>
  )
}

export default Navigation
