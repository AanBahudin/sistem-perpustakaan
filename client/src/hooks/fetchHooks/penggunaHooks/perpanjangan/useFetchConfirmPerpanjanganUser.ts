import { useParams } from "react-router-dom"
import { useQueries } from "@tanstack/react-query"
import { getDetailPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"
import { getPerpanjangaByPinjamanId } from "@/actions/Pengguna/Perpanjangan"

const useFetchConfirmPerpanjanganUser = () => {

    // REFACTOR HERE
    // PIKIRKAN AGAR TIDAK PERLU DOUBLE FETCHING API
    // BUATKAN BATAS MAKSIMAL PERPANJANGAN
    const {id} = useParams()
    const results = useQueries({
        queries: [
            {
                queryKey: ['peminjaman', id],
                queryFn: () => getDetailPeminjamanPengguna({idPeminjaman: id as string})
            },
            {
                queryKey: ['perpanjangan', 'peminjamnan', id],
                queryFn: () =>  getPerpanjangaByPinjamanId({idPeminjaman: id!})
            }
        ]
    })


    const [peminjaman, perpanjangan] = results
    const isLoading = results.some(q => q.isLoading)

    return {
        isLoading,
        peminjaman: peminjaman?.data,
        perpanjangan: perpanjangan?.data
    }
}

export default useFetchConfirmPerpanjanganUser