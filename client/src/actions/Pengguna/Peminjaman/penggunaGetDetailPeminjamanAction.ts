import { customFetch } from "@/utils/customFetch"

type ActionType = {
    idPeminjaman: string
}

const penggunaGetDetailPeminjaman = async({idPeminjaman} : ActionType) => {
    const {data: response, status} = await customFetch.get(`/pinjaman/user/${idPeminjaman}`)
    if (status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Data tidak ditemukan'}
    }

    return response.data
}

export default penggunaGetDetailPeminjaman