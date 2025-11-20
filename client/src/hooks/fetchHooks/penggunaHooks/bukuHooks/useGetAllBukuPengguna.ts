import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getAllBuku } from "@/actions/BukuActions"

const useGetAllBukuPengguna = () => {
   
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams).toString()

    const {data: dataBuku, isLoading} = useQuery({
        queryKey: ['buku', fullParams],
        queryFn: () => getAllBuku(fullParams)
    })

    return {
        dataBuku,
        isLoading
    }

}

export default useGetAllBukuPengguna