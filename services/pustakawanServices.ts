import Peminjaman from '../model/Peminjaman'
import Pengguna from '../model/Pengguna'
import { getBukuHilang } from './bukuServices'
import { pustakawanGetDataPengembalian } from './pengembalianServices'
import { getSemuaPerpanjanganUser } from './perpanjanganServices'

export const getStatsServices = async() => {
    const pengguna = await Pengguna.find()
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

export const getAllPengguna = async({query} : {query: any}) => {
    let mongoQuery: any = { ...query }

    if (query?.query) {
        const searchRegex = { $regex: query.query, $options: "i" }

        mongoQuery.$or = [
        { nama: searchRegex },
        { idKampus: searchRegex }
        ]

        // Hapus 'query.query' agar tidak ikut dalam pencarian utama
        delete mongoQuery.query
    }
    const pengguna = await Pengguna.find(mongoQuery).sort({createdAt: -1})
    return pengguna
}