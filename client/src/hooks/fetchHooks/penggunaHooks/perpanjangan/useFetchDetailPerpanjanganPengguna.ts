import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDetailPerpanjanganPengguna } from "@/actions/Pengguna/Perpanjangan"
import { penggunaGetProfileAction } from "@/actions/Pengguna/Profil"

const useFetchDetailPerpanjanganPengguna = () => {
    
    const {id} = useParams()

    const results = useQueries({
        queries: [
        {
            queryKey: ['detail-perpanjangan', id],
            queryFn: () => getDetailPerpanjanganPengguna(id as string)
        },
        {
            queryKey: ['profil'],
            queryFn: () => penggunaGetProfileAction()
        }
        ]
    })

    const [detailPerpanjangan, profil] = results
    const isLoading = results.some(q => q.isLoading)

    return {
        isLoading,
        detailBuku: detailPerpanjangan?.data?.detailBuku,
        peminjaman: detailPerpanjangan?.data?.peminjaman,
        perpanjangan: detailPerpanjangan?.data?.perpanjangan,
        profil: profil.data
    }

}

export default useFetchDetailPerpanjanganPengguna