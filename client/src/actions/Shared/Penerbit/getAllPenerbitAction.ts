import { customFetch } from "@/utils/customFetch"

const getAllPenerbitAction = async() => {
    const {data: response, status} = await customFetch.get('/penerbit')
    if (status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Silahkan periksa koneksi Internet Anda'}
    }
    return response.data
}

export default getAllPenerbitAction