import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDetailPeminjaman } from "@/actions/peminjamanActions"
import { getDetailBuku } from "@/actions/BukuActions"

const useFetchDetailPeminjamanUser = () => {
    const {id, idBuku} = useParams()

    const results = useQueries({
        queries: [
        { 
            queryKey: ['detail-peminjaman', id],
            queryFn: () => getDetailPeminjaman(id!)
        },
        {
            queryKey: ['detail-book', idBuku],
            queryFn: () => getDetailBuku(idBuku!)
        },
        ]
    }) 

    const [detailPeminjaman, detailBuku] = results
    const isLoading = results.some(q => q.isLoading)

    return {
        isLoading,
        detailBuku: detailBuku?.data?.buku,
        detailPeminjaman: detailPeminjaman?.data,
    }
}

export default useFetchDetailPeminjamanUser