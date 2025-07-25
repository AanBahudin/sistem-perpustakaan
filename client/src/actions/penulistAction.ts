import { customFetch } from "@/utils/customFetch"

export const getAllPenulis = async() => {
    const {data: response, status} = await customFetch.get('/penulis')
    if (status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Silahkan periksa koneksi Internet Anda'}
    }

    console.log(response.data)
    return response.data
}