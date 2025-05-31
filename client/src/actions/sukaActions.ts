import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getAllSuka = async() => {
    const response = await queryClient.fetchQuery({
        queryKey: ['suka'],
        queryFn: async() => {
            const response = await customFetch.get('/suka')
            if (response.status >= 400) {
                return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
            }

            return response.data.data
        }
    })
    return response
}

export const addOrRemoveSuka = async(formData: FormData) => {
    const data = Object.fromEntries(formData)
    
    const response = await customFetch.post('/suka', data)
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }

    await queryClient.invalidateQueries({ queryKey: ['suka'] })
    
    return {
        message: 'Disukai',
        deskripsi: 'Buku ditambahkan di menu Disukai',
        showToast: false,
        queryKey: ['suka'],
        redirectTo: '.'
    }
}