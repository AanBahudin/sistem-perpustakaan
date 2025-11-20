import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getPerpanjanganDetail } from "@/actions/perpanjanganActions"
import { profileAction } from "@/actions/userActions"

const useFetchDetailPerpanjanganPengguna = () => {
    
    const {id} = useParams()

    const results = useQueries({
        queries: [
        {
            queryKey: ['detail-perpanjangan', id],
            queryFn: () => getPerpanjanganDetail(id as string)
        },
        {
            queryKey: ['profil'],
            queryFn: () => profileAction()
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