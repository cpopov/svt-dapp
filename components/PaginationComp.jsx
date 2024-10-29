import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from '@/components/ui/pagination'

import { Button } from './ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

function PaginationComp({ totalPages, page, setPage = () => {} }) {
  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={cn('rounded-full', page === 1 && 'hidden')}>
          <PageButton>
            <div>
              <ChevronsLeft className="stroke-[2px]" size={14} />
            </div>
          </PageButton>
        </PaginationItem>
        <PaginationItem
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={cn('rounded-full', page === 1 && 'hidden')}>
          <PageButton>
            <div>
              <ChevronLeft className="stroke-[2px]" size={14} />
            </div>
          </PageButton>
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1
          if (
            pageNumber < page - 1 ||
            pageNumber > page + 1 ||
            pageNumber === totalPages
          ) {
            return null // Skip pages outside the range
          }
          return (
            <PaginationItem
              onClick={() => setPage(pageNumber)}
              key={`pagination${pageNumber}`}>
              <PageButton
                className={cn(
                  'rounded-full',
                  page === pageNumber && 'bg-accent text-white'
                )}>
                {pageNumber}
              </PageButton>
            </PaginationItem>
          )
        })}
        {page < totalPages - 2 && <PaginationEllipsis />}
        <PaginationItem onClick={() => setPage(totalPages)}>
          <PageButton
            className={cn(
              'rounded-full',
              page === totalPages && 'bg-accent text-white'
            )}>
            {totalPages}
          </PageButton>
        </PaginationItem>
        <PaginationItem
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          className={cn(page === totalPages && 'hidden')}>
          <PageButton>
            <div>
              <ChevronRight className="stroke-[2px]" size={14} />
            </div>
          </PageButton>
        </PaginationItem>
        <PaginationItem
          onClick={() => setPage(totalPages)}
          className={cn(page === totalPages && 'hidden')}>
          <PageButton>
            <div>
              <ChevronsRight className="stroke-[2px]" size={14} />
            </div>
          </PageButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComp
const PageButton = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      variant="ghost"
      className={cn(
        'h-8 w-8 rounded-full text-black bg-white hover:text-white',
        className
      )}>
      {children}
    </Button>
  )
}
