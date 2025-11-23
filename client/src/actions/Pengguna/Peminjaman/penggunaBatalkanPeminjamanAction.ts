import { customFetch } from "@/utils/customFetch"

type ActionType = {
    idPeminjaman: string
}

const penggunaBatalkanPengajuan = async({idPeminjaman} : ActionType) => {
    const {data: response} = await customFetch.post('/pinjaman/user', {idPeminjaman: idPeminjaman})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat membatalkan pengajuan buku'}
    }
    
    return response.data
}

export default penggunaBatalkanPengajuan