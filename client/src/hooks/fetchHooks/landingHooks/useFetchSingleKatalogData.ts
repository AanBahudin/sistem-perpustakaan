import { getSingleKatalogData } from "@/actions/Landing/landingActions"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const useFetchSingleKatalogData = () => {
    const {id} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['landing', 'katalog', id?.toString()],
        queryFn: () => getSingleKatalogData({idBuku: id as string})
    })

    return {
        data,
        isLoading
    }
}

export default useFetchSingleKatalogData