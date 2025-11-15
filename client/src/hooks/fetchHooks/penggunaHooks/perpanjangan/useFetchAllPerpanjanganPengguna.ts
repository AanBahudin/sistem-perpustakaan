import { getPerpanjangan } from "@/actions/perpanjanganActions"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const useFetchAllPerpanjanganPengguna = () => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()
    
    const {data: dataPerpanjangan, isLoading} = useQuery({
        queryKey: ['perpanjangan', params],
        queryFn: () => getPerpanjangan(params)
    })

    return {
        data: dataPerpanjangan,
        isLoading
    }
}

export default useFetchAllPerpanjanganPengguna