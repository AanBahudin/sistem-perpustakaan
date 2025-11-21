import { getDetailPengembalianData } from "@/actions/pengembalianActions"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const useFetchDetailPengembalianPengguna = () => {

    const {id} = useParams()

    const {data: detailPengembalian, isLoading} = useQuery({
        queryKey: ['detail-peminjaman', 'pengembalian', id],
        queryFn: () => getDetailPengembalianData(id!)
    })

    console.log(detailPengembalian)

    return {
        isLoading,
        detailPengembalian,
        detailPengguna : detailPengembalian?.idBuku,
        detailPeminjaman : detailPengembalian?.idPeminjaman,
        detailBuku : detailPengembalian?.idBuku,
    }
}

export default useFetchDetailPengembalianPengguna