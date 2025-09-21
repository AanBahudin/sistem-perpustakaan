import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllSuka = async() => {
    const {data: response} = await customFetch.get('/suka')
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }

    return response.data
}

export const addOrRemoveSukaNew = async(id: string) => {
    const response = await customFetch.post('/suka', {bukuId: id})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }

    await queryClient.invalidateQueries({ queryKey: ['suka']})
    await queryClient.invalidateQueries({ queryKey: ['detail-book', id]})
}