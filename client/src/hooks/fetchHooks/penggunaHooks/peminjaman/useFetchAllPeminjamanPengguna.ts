import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getPeminjamanData } from "@/actions/peminjamanActions"

const useFetchAllPeminjamanPengguna = () => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const {data: dataPeminjaman, isLoading} = useQuery({
        queryKey: ['peminjaman', params],
        queryFn: () => getPeminjamanData(params || '')
    })

    return {
        data: dataPeminjaman,
        isLoading
    }
}

export default useFetchAllPeminjamanPengguna