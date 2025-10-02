import { getAllKondisi } from "../controllers/kondisi/kondisiController"
import Buku from "../model/Buku"
import { getDataKondisi } from "../services/kondisiServices"

type HitungDendaFisikType = {
    kondisiAwal: string,
    kondisiAkhir: string,
    idBuku: string,
    statusHilang: boolean
}

export const hitungDendaFisik = async({
    kondisiAwal, 
    kondisiAkhir, 
    statusHilang,
    idBuku
} : HitungDendaFisikType) => {
    let dendaFisik : number = 0;
    const {data} = await getDataKondisi()

    const kondisiPeminjaman = data.find(item => item.kondisi === kondisiAwal)
    const kondisiPengembalian = data.find(item => item.kondisi === kondisiAkhir)

    // kondisi sudah divalidasi sebelumnya, aman gunakan "!"
    const { denda: dendaPeminjaman } = kondisiPeminjaman!
    const { denda: dendaPengembalian } = kondisiPengembalian!
    
    if (statusHilang) {
        const buku = await Buku.findOne({_id: idBuku})
        return buku?.hargaGanti ?? 100000 // fallback kalau buku tidak ditemukan
    }

    if (dendaPengembalian > dendaPeminjaman) {
        dendaFisik = dendaPengembalian
    }
    return dendaFisik
}