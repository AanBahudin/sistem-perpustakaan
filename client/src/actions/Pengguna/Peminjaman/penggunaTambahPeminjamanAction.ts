import { customFetch } from "@/utils/customFetch"
import { toast } from "sonner"

type ActionType = {
    idBuku: string,
    alasan: string,
    durasi: number
}

const penggunaTambahPeminjaman = async({idBuku, alasan, durasi} : ActionType) => {

    /* 
        REFACTOR DISINI
        KALAU BISA GUNAKAN FORM DATA UTNUK KIRIM DATA DATA YANG AKAN DIKIRIM KE SERVER
    */

    const {data : response, status} = await customFetch.post('/pinjaman/request/pinjaman', {
        idBuku,
        alasan,
        durasiPeminjaman: durasi
    })

    if (status >= 400) {
        toast('Tidak dapat mengajukan peminjaman', {description: 'Terjadi kesalahan, silahkan coba lagi'})
    }

    toast('Berhasil Di Ajukan!', {description: 'Silahkan cek peminjaman anda pada menu Peminjaman'})

    return response.data
}

export default penggunaTambahPeminjaman