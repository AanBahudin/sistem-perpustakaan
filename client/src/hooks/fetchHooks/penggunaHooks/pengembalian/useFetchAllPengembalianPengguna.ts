import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getAllPengembalianPenggunaAction } from "@/actions/Pengguna/Pengembalian"

const useFetchAllPengembalianPengguna = () => {
    const [searchParams] = useSearchParams()
    const params : string = new URLSearchParams(searchParams).toString()

    const {data: dataPengembalian, isLoading} = useQuery({
        queryKey:['pengembalian', params],
        queryFn: () => getAllPengembalianPenggunaAction(params)
    })

    return {
        data: dataPengembalian,
        isLoading
    }
}

export default useFetchAllPengembalianPengguna