import { customFetch } from "@/utils/customFetch"

export const getPengembalianPengguna = async(search? : string) => {
    const response = await customFetch.get(`/pengembalian/user?${search}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data pengembalian'}
    }
    return response.data
}

export default getPengembalianPengguna