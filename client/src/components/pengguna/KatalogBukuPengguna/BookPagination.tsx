import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
  

const BookPagination = ({totalPage} : {totalPage: number}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const currentPage = Number(params.get('page')) || 1

    const nextPage = () => {
        if (!currentPage) {
            navigatePages(2)
        } else {
            navigatePages(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (!currentPage) {
            navigate('.')
        } else {
            navigatePages(currentPage - 1)
        }
    }

    const navigatePages = (page: number) => {
        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', page.toString())
        }

        navigate(`?${params.toString()}`)
    }

    return (
        <Pagination className='mt-16'>
            <PaginationContent>
                <PaginationItem onClick={prevPage} className={currentPage === 1 ? 'hidden' : ''}>
                    <PaginationPrevious />
                </PaginationItem>

                <PaginationItem onClick={() => navigatePages(currentPage)} className={`bg-secondary rounded`}>
                    <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem onClick={() => navigatePages(totalPage)} className={`bg-secondary rounded`}>
                    <PaginationLink>{totalPage}</PaginationLink>
                </PaginationItem>

                <PaginationItem onClick={nextPage} className={currentPage === totalPage ? 'hidden' : ''}>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
  )
}

export default BookPagination