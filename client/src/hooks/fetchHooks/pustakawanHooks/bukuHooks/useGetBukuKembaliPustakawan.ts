import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { pustakawanGetAllBukuDikembalikanAction } from "@/actions/Pustakawan/Buku"

const useGetBukuKembaliPustakawan = () => {
    const [searchParams] = useSearchParams()
    const query = new URLSearchParams(searchParams).toString()

    const {data, isLoading} = useQuery({
        queryKey: ['buku', 'dikembalikan', query],
        queryFn: () => pustakawanGetAllBukuDikembalikanAction({query}),
        select: (raw: any) => ({
            bukuDikembalikan: raw.bukuDikembalikan, 
            ratioBukuDikembalikan: raw.ratioBukuDikembalikan, 
            statsBukuDikembalikan: raw.statsBukuDikembalikan
        })
    })

    return {
        isLoading, ...data
    }
}

export default useGetBukuKembaliPustakawan