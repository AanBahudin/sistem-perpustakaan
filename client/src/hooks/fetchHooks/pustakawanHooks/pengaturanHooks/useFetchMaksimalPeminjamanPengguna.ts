import { getMaksimalPeminjaman } from "@/actions/GlobalActions/MaksimalPeminjamanActions"
import { useQuery } from "@tanstack/react-query"

const useFetchMaksimalPeminjamanPengguna = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['maks peminjaman'],
        queryFn: getMaksimalPeminjaman
    })

    return {
        data, isLoading
    }
}

export default useFetchMaksimalPeminjamanPengguna