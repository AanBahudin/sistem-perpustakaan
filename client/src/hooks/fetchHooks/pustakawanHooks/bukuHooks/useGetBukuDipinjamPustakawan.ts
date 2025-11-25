import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { pustakawanGetAllBukuDipinjamAction } from '@/actions/Pustakawan/Buku'

const useGetBukuDipinjamPustakawan = () => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const {isLoading, data} = useQuery({
        queryKey: ['buku', 'dipinjam', params],
        queryFn: () => pustakawanGetAllBukuDipinjamAction({query : params}),
        select: (raw: any) => ({
            bukuDipinjam: raw.bukuDipinjam,
            ratioBukuDipinjam: raw.ratioBukuDipinjam, 
            statsBukuPinjam: raw.statsBukuPinjam
        })
    })

    return {
        isLoading,
        ...data
    }
}

export default useGetBukuDipinjamPustakawan