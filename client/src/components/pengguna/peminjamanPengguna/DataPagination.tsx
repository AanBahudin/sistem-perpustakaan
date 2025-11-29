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

type DataPaginationPropsData = {
    totalPage: number,
}

const DataPagination = ({ totalPage } : DataPaginationPropsData) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const currentPage = params.get('page') || 1

    const handleLastPage = () => {
        params.set('page', totalPage.toString())
        navigate(`?${params.toString()}`)
    }

    const handleNextPage = () => {
        const nextPage = Number(currentPage) + 1

        if (nextPage > totalPage) {
            params.delete('page')
        } else {
            params.set('page', nextPage.toString())
        }
        navigate(`?${params.toString()}`)
    }

    const handlePrevPage = () => {
        const lastPage = Number(currentPage) - 1

        if (lastPage < 1) {
            params.set('page', totalPage.toString())
        } else {
            params.set('page', lastPage.toString())
        }

        navigate(`?${params.toString()}`)
    }

    return (
        <Pagination className="my-10">
            <PaginationContent>
                {/* PREVIOUS BUTTON */}
                <PaginationItem onClick={handlePrevPage}>
                    <PaginationPrevious />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem onClick={handleLastPage}>
                    <PaginationLink>{totalPage}</PaginationLink>
                </PaginationItem>

                {/* NEXT BUTTON */}
                <PaginationItem onClick={handleNextPage}>
                    <PaginationNext/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default DataPagination