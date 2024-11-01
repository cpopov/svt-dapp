import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React, { useRef } from 'react'

import { SelectSeparator } from './select'
import { cn } from '@/lib/utils'
import { sports } from '@/lib/constants'

function SportFilter({ children = 'Open', sport, setSport = () => {} }) {
  const closeRef = useRef()
  return (
    <>
      <DropdownMenu className="hidden md:block">
        <DropdownMenuTrigger className="focus:none hidden md:block">
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:min-w-64">
          <div className="flex flex-col gap-4 md:p-2">
            {sports.map(data => {
              return (
                <DropdownMenuItem
                  className={cn(
                    'rounded-full h-10 px-3 uppercase font-medium focus:bg-[#DDEDE7]',
                    sport === data?.value &&
                      'bg-[#DDEDE7] border text-accent-text'
                  )}
                  key={data?.value}
                  onClick={() => setSport(data?.value)}>
                  {data?.key}
                </DropdownMenuItem>
              )
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer className="md:hidden">
        <DrawerTrigger className="md:hidden">{children}</DrawerTrigger>
        <DrawerTitle className="hidden">
          <span className="sr-only">Sports filter</span>
        </DrawerTitle>
        <DrawerContent className="py-0">
          <DrawerTitle className="pb-3">
            <span className="text-2xl font-semibold px-5 pb-5">
              Select Sports Market
            </span>
          </DrawerTitle>
          <SelectSeparator className="bg-black/20" />
          <div className="flex flex-col gap-4 p-2">
            {sports.map(data => {
              return (
                <div
                  className={cn(
                    'rounded-full p-3 text-xl uppercase font-medium  focus:bg-[#DDEDE7] flex items-center',
                    sport === data?.value && 'bg-[#DDEDE7] text-accent'
                  )}
                  key={data?.value}
                  onClick={() => {
                    setSport(data?.value)
                    closeRef?.current.click()
                  }}>
                  {data?.key}
                </div>
              )
            })}
          </div>
          <DrawerClose ref={closeRef} className="hidden" />
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SportFilter
