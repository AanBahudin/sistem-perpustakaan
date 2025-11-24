import { customFetch } from "@/utils/customFetch"

const getAllPenulisAction = async() => {
    const {data: response, status} = await customFetch.get('/penulis')
    if (status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Silahkan periksa koneksi Internet Anda'}
    }
    return response.data
}

export default getAllPenulisAction