import { QueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils/customFetch";
import { redirect } from "react-router-dom";


const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllBuku = async(query?: string) => {
    const res = await customFetch.get(`/buku/user?${query ?? ''}`)
    if (res.status >= 400) {
        throw new Error('Gagal mengambil data buku.')
    }

    return res.data
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
    const data = await customFetch.get(`/buku/user/${id}`)
    if (data.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data buku'}
    }

    return data.data
}

export const discoverBuku = async(query: undefined | string) => {

    if (query === undefined) {
        redirect('/my/buku')
    }

    const data = await customFetch(`/buku/discovery?query=${query}`)
    if (data.status >= 400) {
        return {message: 'Terjadi kesalahan',  deskripsi: 'Tidak dapat mengambil buku'}
    }

    return data.data
}