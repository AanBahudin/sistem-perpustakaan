import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

const BookPagination = () => {
  return (
    <Pagination className='mt-7'>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious href="#" />
            </PaginationItem>

            {Array.from({length: 3}).map((_, index) => {
                return (
                    <PaginationItem key={index}>
                        <PaginationLink href="#">{index + 1}</PaginationLink>
                    </PaginationItem>
                )
            })}

            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>

            <PaginationItem>
                <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
    </Pagination>

  )
}

export default BookPagination