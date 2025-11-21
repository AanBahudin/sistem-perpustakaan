import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDetailPeminjaman } from "@/actions/peminjamanActions"

const useFetchDetailPeminjamanUser = () => {
    const {id} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['detail-peminjaman', id],
        queryFn: () => getDetailPeminjaman(id!),
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