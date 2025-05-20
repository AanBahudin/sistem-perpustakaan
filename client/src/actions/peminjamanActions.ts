import { QueryClient } from "@tanstack/react-query"
import { customFetch } from "@/utils/customFetch"

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})


export const getPeminjamanData = async(search? : string) => {

    console.log(search)

    const data = await queryClient.ensureQueryData({
            queryKey: ['peminjaman',search],
            queryFn: async() => {
                const response = await customFetch.get(`/pinjaman/user?${search}`)
                if (response.status >= 400) {
                    return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
                }
                return response.data      
            }
        })
    return data
}