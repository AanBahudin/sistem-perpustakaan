import { useQuery } from "@tanstack/react-query"
import getStatsPustakawan from "@/actions/Pustakawan/Beranda/pustakawanStatsAction"

const usePustakawanBeranda = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['pustakawan', 'beranda'],
        queryFn: getStatsPustakawan
    })

  return {
    data, isLoading
  }
}

export default usePustakawanBeranda