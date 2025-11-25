import { useQuery } from '@tanstack/react-query'
import {pustakawanGetAllBukuHilangAction} from '@/actions/Pustakawan/Buku'
import { useSearchParams } from 'react-router-dom'

const useGetBukuHilangPustakawan = () => {
    const [searchParams] = useSearchParams()
    const query = new URLSearchParams(searchParams).toString()

    const {data, isLoading} = useQuery({
        queryKey: ['buku', 'dihilangkan', query],
        queryFn: () => pustakawanGetAllBukuHilangAction({query}),
        select: (raw: any) => ({
            bukuDihilangkan: raw.bukuDihilangkan,
            ratioBukuDihilangkan: raw.ratioBukuDihilangkan, 
            statsBukuDihilangkan: raw.statsBukuDihilangkan
        })
    })

    return {
        isLoading,
        ...data
    }
}

export default useGetBukuHilangPustakawan