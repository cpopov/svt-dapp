import { Badge } from './ui/badge'
import { X } from 'lucide-react'

export default function FilterBadge({ filter, action = () => {} }) {
  return filter ? (
    <Badge
      className="rounded-full border-accent text-accent bg-[#EBEDF0] w-fit h-fit text-sm font-medium flex items-center"
      variant="outline">
      {filter}
      <X
        role="button"
        className="stroke-[4px] ml-1"
        size={12}
        onClick={() => {
          action('')
        }}
      />
    </Badge>
  ) : null
}
