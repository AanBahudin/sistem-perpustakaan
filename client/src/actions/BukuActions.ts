import { QueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils/customFetch";


const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllBuku = async(query?: string) => {
    const response = await queryClient.ensureQueryData({
        queryKey: ['buku'],
        queryFn: async() => {
            const data = await customFetch.get(`/buku/user?${query}`)

            if (data.status >= 400) {
                return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data, periksa koneksi internet Anda'}
            }
            return data.data
        }
    })
    return response
}