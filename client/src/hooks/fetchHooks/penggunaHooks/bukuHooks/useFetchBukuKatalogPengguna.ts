import { useQuery } from "@tanstack/react-query"
import { getDashboardBukuPengguna } from "@/actions/Pengguna/Buku"

const useFetchBukuKatalogPengguna = () => {
    const {data: dataBuku, isLoading} = useQuery({
        queryKey: ['dashbaord', 'buku'],
        queryFn: () => getDashboardBukuPengguna()
    })

    return {
        isLoading,
        rawData: dataBuku,
        rekomendasiBuku: dataBuku?.rekomendasiBuku,
        bukuTerbaru: dataBuku?.bukuTerbaru,
        buku: dataBuku?.buku
    }
}

export default useFetchBukuKatalogPengguna