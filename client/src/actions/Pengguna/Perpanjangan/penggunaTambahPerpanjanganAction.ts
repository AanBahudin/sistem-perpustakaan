import { customFetch } from "@/utils/customFetch"

type ActionType = {
    idPeminjaman: string, idBuku: string, 
    durasi: number, alasan: string
}

const penggunaTambahPerpanjangan = async({idPeminjaman, idBuku, durasi, alasan} : ActionType) => {
    const response = await customFetch.post('/perpanjangan/user', {
        idPeminjaman,
        idBuku,
        durasi,
        alasan
    })

    if (response.status >= 400) return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
}

export default penggunaTambahPerpanjangan