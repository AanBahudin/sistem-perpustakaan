import { customFetch } from "@/utils/customFetch"

export const penggunaGetAllSimpanan = async() => {
    const {data: response, status} = await customFetch.get(`/simpan`)
    if (status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }
    return response.data[0]
}

export default penggunaGetAllSimpanan