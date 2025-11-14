import { getKatalogData } from "@/actions/Landing/landingActions"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const useFetchKatalogData = () => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const {data, isLoading} = useQuery({
        queryKey: ['landing', 'katalog', params],
        queryFn: () => getKatalogData({query: params})
    })

    return {
        data,
        isLoading
    }
}

export default useFetchKatalogData