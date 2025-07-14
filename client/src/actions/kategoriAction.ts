import { customFetch } from "@/utils/customFetch";

export const getAllKategori = async() => {
    const response = await customFetch.get('/kategori')
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Gangguan terjadi, silahkan periksa koneksi internet anda'}
    }
    return response.data
}