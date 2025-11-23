import { customFetch } from "@/utils/customFetch"


export const getRecommendationsBuku = async() => {
    const {data: response, status} = await customFetch.get('/buku/user/rekomendasi')
    if (status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Silahkan periksa koneksi Internet Anda'}
    }
    return response.data
}

export default getRecommendationsBuku