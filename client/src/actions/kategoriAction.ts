import { customFetch } from "@/utils/customFetch";
import { queryClient } from "@/main";

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