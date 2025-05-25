import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
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

                {Array.from({length: 3}).map((_, index) => {
                    return (
                        <PaginationItem onClick={() => navigatePages(index + 1)} key={index} className={`${currentPage === index + 1 ? 'bg-secondary' : null} rounded`}>
                            <PaginationLink>{index + 1}</PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}

                <PaginationItem onClick={nextPage} className={currentPage === totalPage ? 'hidden' : ''}>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
  )
}

export default BookPagination