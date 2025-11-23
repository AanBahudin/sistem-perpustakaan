import { customFetch } from "@/utils/customFetch"

const penggunaGetPepanjangan = async(query: string) => {
    const response = await customFetch.get(`/perpanjangan/user?${query}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
    }
    return response.data
}

export default penggunaGetPepanjangan