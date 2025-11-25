import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { pustakawaGetAllBukuDiperpanjangAction } from "@/actions/Pustakawan/Buku"

const useGetBukuPerpanjangPustakawan = () => {
    const [searchParams] = useSearchParams()
    const query = new URLSearchParams(searchParams).toString()

    const {data, isLoading} = useQuery({
        queryKey: ['buku', 'diperpanjang', query],
        queryFn: () =>  pustakawaGetAllBukuDiperpanjangAction({query}),
        select: (raw: any) => ({
            bukuDiperpanjang: raw.bukuDiperpanjang, 
            ratioBukuDiperpanjang: raw.ratioBukuDiperpanjang, 
            statsBukuDiperpanjangan: raw.statsBukuDiperpanjangan
        })
    })

    return {
        isLoading,
        ...data
    }
}

export default useGetBukuPerpanjangPustakawan