'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'

function MobileNav({ navLinks = [] }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="md:hidden block z-10 absolute top-0 right-0 left-0 m-auto ">
      <div className="container h-20 flex justify-between items-center ">
        <Link href="/">
          <div className="h-10 w-28 relative">
            <Image
              fill
              alt="logo"
              sizes="auto"
              src="/svt_logo.png"
              className="object-contain"
            />
          </div>
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className="">
          {isOpen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.3288 0.747275C2.76864 0.187106 1.86042 0.187106 1.30025 0.747275C0.740085 1.30744 0.740085 2.21566 1.30025 2.77583L6.35158 7.82715L1.30025 12.8785C0.740085 13.4386 0.740085 14.3469 1.30025 14.907C1.86042 15.4672 2.76864 15.4672 3.3288 14.907L8.38013 9.8557L13.4314 14.907C13.9916 15.4672 14.8998 15.4672 15.46 14.907C16.0202 14.3469 16.0202 13.4386 15.46 12.8785L10.4087 7.82715L15.46 2.77583C16.0202 2.21566 16.0202 1.30744 15.46 0.747275C14.8998 0.187106 13.9916 0.187106 13.4314 0.747275L8.38013 5.7986L3.3288 0.747275Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="16"
              viewBox="0 0 28 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.603516 1.74902C0.603516 0.92041 1.2749 0.249023 2.10352 0.249023H26.5C27.3286 0.249023 28 0.92041 28 1.74902C28 2.57764 27.3286 3.24902 26.5 3.24902H2.10352C1.2749 3.24902 0.603516 2.57764 0.603516 1.74902ZM0.603516 7.74902C0.603516 6.92041 1.2749 6.24902 2.10352 6.24902H26.5C27.3286 6.24902 28 6.92041 28 7.74902C28 8.14453 27.8467 8.50439 27.5967 8.77246C27.3228 9.06592 26.9331 9.24902 26.5 9.24902H2.10352C1.2749 9.24902 0.603516 8.57764 0.603516 7.74902ZM8.56006 12.249C7.73145 12.249 7.06006 12.9204 7.06006 13.749C7.06006 14.5776 7.73145 15.249 8.56006 15.249H26.5C27.3286 15.249 28 14.5776 28 13.749C28 12.9204 27.3286 12.249 26.5 12.249H8.56006Z"
                fill="white"
              />
            </svg>
          )}
        </div>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}>
        <div className={`overflow-hidden`}>
          <div className="w-full bg-black/90 text-white flex flex-col gap-5 p-10 items-center">
            {navLinks.map(({ title, path }) => (
              <Link
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${
                  pathname === path ? 'font-bold' : ''
                }`}
                href={path}
                key={`nav${title}`}>
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav
