import { useQuery } from "@tanstack/react-query"
import { getDetailPengajuanPeminjaman } from '@/actions/Pustakawan/Peminjaman/pustakawanPengajuanActions'
import { useParams } from 'react-router-dom'

const useGetDetailPinjamanPustakawan = () => {
    const { idPeminjaman } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'peminjaman', idPeminjaman],
        queryFn: () => getDetailPengajuanPeminjaman({id: idPeminjaman as string}),
    })

    return {
        isLoading,
        dataPeminjaman: data
    }
}

export default useGetDetailPinjamanPustakawan