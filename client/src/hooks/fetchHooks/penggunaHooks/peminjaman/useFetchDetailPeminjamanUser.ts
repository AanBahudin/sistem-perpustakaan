import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDetailPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"

const useFetchDetailPeminjamanUser = () => {
    const {id} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['detail-peminjaman', id],
        queryFn: () => getDetailPeminjamanPengguna({idPeminjaman: id as string}),
        select: (rawData: any) => ({
            detailBuku: rawData?.buku,
            detailPeminjaman: rawData
        })
    }) 
    
    return {
        isLoading,
        ...data
    }
}

export default useFetchDetailPeminjamanUser