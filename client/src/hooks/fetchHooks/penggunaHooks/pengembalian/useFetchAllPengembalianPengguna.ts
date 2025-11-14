import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getPengembalianData } from "@/actions/pengembalianActions"

const useFetchAllPengembalianPengguna = () => {
    const [searchParams] = useSearchParams()
    const params : string = new URLSearchParams(searchParams).toString()

    const {data: dataPengembalian, isLoading} = useQuery({
        queryKey:['pengembalian', params],
        queryFn: () => getPengembalianData(params)
    })

    return {
        data: dataPengembalian,
        isLoading
    }
}

export default useFetchAllPengembalianPengguna