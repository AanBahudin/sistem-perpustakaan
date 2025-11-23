import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getAllPeminjamanPengguna } from "@/actions/Pengguna/Peminjaman"

const useFetchAllPeminjamanPengguna = () => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const {data: dataPeminjaman, isLoading} = useQuery({
        queryKey: ['peminjaman', params],
        queryFn: () => getAllPeminjamanPengguna({query: params})
    })

    return {
        data: dataPeminjaman,
        isLoading
    }
}

export default useFetchAllPeminjamanPengguna