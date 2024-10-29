import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from './button'
import React from 'react'
import { cn } from '@/lib/utils'
import { sports } from '@/lib/constants'

function SportFilter({ children = 'Open', sport, setSport = () => {} }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:none">
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
    // <Popover>
    //   <PopoverTrigger>{children}</PopoverTrigger>
    //   <PopoverContent>

    //   </PopoverContent>
    // </Popover>
  )
}

export default SportFilter
