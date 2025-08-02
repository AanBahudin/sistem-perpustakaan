import Peminjaman from '../model/Peminjaman'
import Pengguna from '../model/Pengguna'
import { getBukuHilang } from './bukuServices'
import { pustakawanGetDataPengembalian } from './pengembalianServices'
import { getSemuaPerpanjanganUser } from './perpanjanganServices'

export const getStatsServices = async() => {
    const pengguna = await getAllPengguna()
    const peminjaman = await Peminjaman.find().sort({createdAt: -1}).populate(['buku', 'peminjam'])
    const {data: pengembalian} = await pustakawanGetDataPengembalian()
    const {data: perpanjangan} = await getSemuaPerpanjanganUser()
    const bukuHilang = await getBukuHilang()

    return {
        pengguna,
        peminjaman,
        pengembalian,
        perpanjangan,
        bukuHilang
    }
}


export const getAllPengguna = async() => {
    const pengguna = await Pengguna.find()
    return pengguna
}