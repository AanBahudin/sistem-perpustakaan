import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getAllBukuPengguna } from "@/actions/Pengguna/Buku"

const useGetAllBukuPengguna = () => {
   
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams).toString()

    const {data: dataBuku, isLoading} = useQuery({
        queryKey: ['buku', fullParams],
        queryFn: () => getAllBukuPengguna({query: fullParams})
    })

    return {
        dataBuku,
        isLoading
    }

}

export default useGetAllBukuPengguna