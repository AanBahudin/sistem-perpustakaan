import { customFetch } from "@/utils/customFetch"

const penggunaGetAllSuka = async() => {
    const {data: response} = await customFetch.get('/suka')
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }

    return response.data
}

export default penggunaGetAllSuka