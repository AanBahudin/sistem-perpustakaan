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

export const addOrRemoveSimpanan = async(formData: FormData) => {
    const data = Object.fromEntries(formData)

    queryClient.invalidateQueries({ queryKey: ['simpan'] })
    
    const response = await customFetch.post('/simpan', data)
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }
        

    return {
        redirectTo: '.',
        showToast: false,
        queryKey: ['simpan']
    }
}