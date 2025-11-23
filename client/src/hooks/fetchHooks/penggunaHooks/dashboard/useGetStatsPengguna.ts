import { penggunaGetStatsAction } from "@/actions/Pengguna/Dashboard"
import { useQuery } from "@tanstack/react-query"

const useGetStatsPengguna = () => {
    const {data: statsData, isLoading} = useQuery({
        queryKey: ['stats', 'pengguna'],
        queryFn: penggunaGetStatsAction,
    })

    return {
        isLoading, 
        data: statsData
    }
}

export default useGetStatsPengguna