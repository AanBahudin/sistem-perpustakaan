import { QueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils/customFetch";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllSimpanan = async() => {
    const response = await queryClient.fetchQuery({
        queryKey: ['simpan'],
        queryFn: async() => {
            const response = await customFetch.get(`/simpan`)
            if (response.status >= 400) {
                return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
            }

            return response.data.data
        }
    })
    return response[0]
}

export const addOrRemoveSimpanan = async(id: string) => {    
    const response = await customFetch.post('/simpan', {bookId: id})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }

    await queryClient.invalidateQueries({ queryKey: ['simpan']})
    await queryClient.invalidateQueries({ queryKey: ['detail-book', id]})
}