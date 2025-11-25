import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { pustakawanGetSingleBukuAction } from '@/actions/Pustakawan/Buku'

const useGetDetailBukuPustakawan = () => {
    const { idBuku } = useParams()

    // REFACTOR DI SERVICE DETAIL BUKU
    // SATUKAN SEMUA RESPONNYA DI DATA

    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'buku', idBuku],
        queryFn: () => pustakawanGetSingleBukuAction({idBuku: idBuku as string})
    })

    return {
        isLoading,
        data
    }
}

export default useGetDetailBukuPustakawan