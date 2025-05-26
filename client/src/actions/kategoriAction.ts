import { QueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils/customFetch";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllKategori = async() => {
    const response = await queryClient.ensureQueryData({
        queryKey: ['kategori'],
        queryFn: async() => {
            const response = await customFetch.get('/kategori')
            if (response.status >= 400) {
                return {message: 'Terjadi kesalahan', deskripsi: 'Gangguan terjadi, silahkan periksa koneksi internet anda'}
            }

            return response.data
        }
    })
    return response
}