import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { pustakawanGetAllBukuAction } from "@/actions/Pustakawan/Buku"

const useGetAllBukuPustakawan = () => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const {data, isLoading} = useQuery({
        queryKey: ['semua', 'buku', params],
        queryFn: () => pustakawanGetAllBukuAction({query: params}),
        select: (raw: any) => ({
            dataBuku: raw.dataBuku, 
            dataRasio: raw.dataRasio, 
            dataStats: raw.dataStats, 
            totalPage: raw.totalPage
        })
    })

    return {
        isLoading,
        ...data
    }
}

export default useGetAllBukuPustakawan