import { getLandingData } from "@/actions/Landing/landingActions"
import { useQuery } from "@tanstack/react-query"

const useFetchLandingData = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['landing'],
        queryFn: getLandingData
    })

    return {
        data,
        isLoading
    }
}

export default useFetchLandingData