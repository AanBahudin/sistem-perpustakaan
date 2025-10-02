import { customFetch } from "@/utils/customFetch";

export const createKategori = async(data: any) => {
    const response = await customFetch.post('/kategori', data)
    return response.data.data
}

export const getAllKategori = async() => {
    const response = await customFetch.get('/kategori')
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Gangguan terjadi, silahkan periksa koneksi internet anda'}
    }
    return response.data
}

export const getSingleSearchKategory = async(kategori: string) => {
    const response = await customFetch.get(`/kategori/search?kategori=${kategori}`)
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Gangguan terjadi, silahkan periksa koneksi internet anda'}
    }

    return response.data
}

export const editSingleKategori = async(idKategori: string, data: any) => {
    const { data:response } = await customFetch.patch(`/kategori/${idKategori}`, data)
    return response.data
}

export const pustakawanHapusKategori = async(idKategori: string) => {
    const {data: response} = await customFetch.delete(`/kategori/${idKategori}`)
    return response.data
}