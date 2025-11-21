import { useQuery } from "@tanstack/react-query"
import { getDashboardBookAction } from "@/actions/BukuActions"

const useFetchBukuKatalogPengguna = () => {
    const {data: dataBuku, isLoading} = useQuery({
        queryKey: ['dashbaord', 'buku'],
        queryFn: () => getDashboardBookAction()
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