import { getDetailPengembalianPenggunaAction } from "@/actions/Pengguna/Pengembalian"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const useFetchDetailPengembalianPengguna = () => {

    const {id} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['detail-peminjaman', 'pengembalian', id],
        queryFn: () => getDetailPengembalianPenggunaAction(id!),
        select: (raw: any) => ({
            detailPengembalian: raw,
            detailPengguna : raw?.idBuku,
            detailPeminjaman : raw?.idPeminjaman,
            detailBuku : raw?.idBuku,
        })
    })

    return {
        isLoading,
        ...data  
    }
}

export default useFetchDetailPengembalianPengguna