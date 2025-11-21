import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { discoverBuku } from "@/actions/BukuActions"

const useFetchBukuBasedByCategoryPengguna = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = searchParams.get('kategori')


    const {data: dataBuku, isLoading} = useQuery({
        queryKey: ['discovery', 'category', params],
        queryFn: () => discoverBuku(params as string)
    })
    
    useEffect(() => {
        if (!params) {
        navigate('/my/buku')
        }
    })

    return {
        isLoading,
        dataBuku,
        categoryParams: params
    }
}

export default useFetchBukuBasedByCategoryPengguna