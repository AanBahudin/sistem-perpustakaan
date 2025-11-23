import { customFetch } from "@/utils/customFetch"

type ActionType = {
    query?: string 
}

const penggunaGetAllPeminjaman = async({query} : ActionType) => {
    const response = await customFetch.get(`/pinjaman/user?${query}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Data tidak ditemukan'}
    }
    return response.data
}

export default penggunaGetAllPeminjaman