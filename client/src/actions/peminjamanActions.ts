import { QueryClient } from "@tanstack/react-query"
import { customFetch } from "@/utils/customFetch"

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})


export const getPeminjamanData = async() => {
    const data = await queryClient.ensureQueryData({
            queryKey: ['profil'],
            queryFn: async() => {
                const response = await customFetch.get('/user/pinjaman')
                if (response.status >= 400) {
                    return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
                }
                return response.data.data      
            }
        })
    return data
}