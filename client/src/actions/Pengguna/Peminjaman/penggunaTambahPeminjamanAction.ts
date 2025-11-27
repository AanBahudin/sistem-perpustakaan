import { customFetch } from "@/utils/customFetch"

type ActionType = {
    idBuku: string,
    alasan: string,
    durasi: number
}

const penggunaTambahPeminjaman = async({idBuku, alasan, durasi} : ActionType) => {
    // refacor ke controlled input
    const {data : response} = await customFetch.post('/pinjaman/request/pinjaman', {
        idBuku,
        alasan,
        durasiPeminjaman: durasi
    })
    return response.data
}

export default penggunaTambahPeminjaman