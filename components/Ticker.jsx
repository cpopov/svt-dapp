import { cn } from '@/lib/utils'

const Ticker = ({
  upFill = '#484964',
  downFill = '#484964',
  size = 6,
  className
}) => {
  return (
    <div className={cn('flex flex-col gap-[2px] duration-300', className)}>
      <svg
        className="rotate-180"
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill={upFill}
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0.4C8 0.176 7.78 0 7.5 0H0.5C0.22 0 0 0.176 0 0.4C0 0.504 0.05 0.592 0.13 0.664L3.63 3.864C3.72 3.944 3.85 4 4 4C4.15 4 4.28 3.944 4.37 3.864L7.87 0.664C7.95 0.592 8 0.504 8 0.4Z"
          fill={upFill}
        />
      </svg>
      <svg
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill={downFill}
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0.4C8 0.176 7.78 0 7.5 0H0.5C0.22 0 0 0.176 0 0.4C0 0.504 0.05 0.592 0.13 0.664L3.63 3.864C3.72 3.944 3.85 4 4 4C4.15 4 4.28 3.944 4.37 3.864L7.87 0.664C7.95 0.592 8 0.504 8 0.4Z"
          fill={downFill}
        />
      </svg>
    </div>
  )
}

export default Ticker
