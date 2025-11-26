import { getDetailBukuPengguna } from "@/actions/Pengguna/Buku"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"


const useFetchDetailBukuPengguna = () => {
    const {id} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['detail-book', id],
        queryFn: () => getDetailBukuPengguna(id as string),
    })

    return {data, isLoading}
}

export default useFetchDetailBukuPengguna