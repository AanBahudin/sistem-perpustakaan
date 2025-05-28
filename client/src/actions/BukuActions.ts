import { QueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils/customFetch";


const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllBuku = async(query?: string) => {
    const response = await queryClient.ensureQueryData({
        queryKey: ['buku', query],
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

export const getRecommendationsBuku = async() => {
    const response = await queryClient.ensureQueryData({
        queryKey: ['recommendation'],
        queryFn: async() => {
            const data = await customFetch.get('/buku/user/rekomendasi')
            if (data.status >= 400) {
                return {message: 'Terjadi kesalahan', deskripsi: 'Silahkan periksa koneksi Internet Anda'}
            }

            return data.data
        }
    })
    return response
}

export const getDetailBuku = async(id: string) => {
    const response = await queryClient.ensureQueryData({
        queryKey: ['detail-book', id],
        queryFn: async() => {
            const data = await customFetch.get(`/buku/user/${id}`)
            if (data.status >= 400) {
                return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data buku'}
            }

            return data.data
        }
    })
    return response
}