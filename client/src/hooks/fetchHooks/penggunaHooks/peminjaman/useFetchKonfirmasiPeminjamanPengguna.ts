import { useParams } from "react-router-dom"
import { profileAction } from "@/actions/userActions"
import { useQueries } from "@tanstack/react-query"
import { getDetailBukuPengguna } from "@/actions/Pengguna/Buku"


const useFetchKonfirmasiPeminjamanPengguna = () => {
    const {id} = useParams()
    const results = useQueries({
        queries: [
            {
                queryKey: ['profil'],
                queryFn: profileAction
            },
            {
                queryKey: ['confirm', 'peminjaman', id],
                queryFn: () => getDetailBukuPengguna(id as string)
            }
        ]
    })

    const [dataProfil, buku] = results
    const isLoading = results.some(q => q.isLoading)

    const {data:profil} = dataProfil
    const {data} = buku

    return {
        profil,
        isLoading,
        buku: data?.buku,
        peminjaman: data?.loan,
    }
}

export default useFetchKonfirmasiPeminjamanPengguna