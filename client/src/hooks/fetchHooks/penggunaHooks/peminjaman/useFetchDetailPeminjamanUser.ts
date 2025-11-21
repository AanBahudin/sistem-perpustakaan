import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDetailPeminjaman } from "@/actions/peminjamanActions"

const useFetchDetailPeminjamanUser = () => {
    const {id} = useParams()

    const {data: dataPinjaman, isLoading} = useQuery({
        queryKey: ['detail-peminjaman', id],
        queryFn: () => getDetailPeminjaman(id!)
    }) 
    
    return {
        isLoading,
        detailBuku: dataPinjaman?.buku,
        detailPeminjaman: dataPinjaman
    }
}

export default useFetchDetailPeminjamanUser