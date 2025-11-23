import { customFetch } from "@/utils/customFetch";

const getPenggunaStats = async() => {
    const {data: response, status} = await customFetch.get('/user/profile/stats')
    if (status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
    }

    return response.data
}

export default getPenggunaStats