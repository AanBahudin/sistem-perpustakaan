import { getStats } from "@/actions/userActions"
import { useQuery } from "@tanstack/react-query"

const useGetStatsPengguna = () => {
    const {data: statsData, isLoading} = useQuery({
        queryKey: ['stats', 'pengguna'],
        queryFn: getStats,
    })

    return {
        isLoading, 
        data: statsData
    }
}

export default useGetStatsPengguna