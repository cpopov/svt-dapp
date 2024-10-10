// import { PlayIcon } from '@radix-ui/react-icons'
// import React from 'react'

import { cn } from '@/lib/utils'

// function Ticker({ size }) {
//   return (
//     <PlayIcon
//       className="-rotate-90 fill-accent stroke-accent"
//       fill="#099F8C"
//       size={size}
//     />
//   )
// }

// export default Ticker
const Ticker = ({ fill = '#099F8C', size = 10, className }) => {
  return (
    <div className={cn(className)}>
      <svg
        fill={fill}
        height={`${size}px`}
        width={`${size}px`}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 490 490">
        <polygon points="245,456.701 490,33.299 0,33.299" />
      </svg>
    </div>
  )
}

export default Ticker
