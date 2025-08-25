import Buku from "../../model/Buku";
import Perpanjangan from "../../model/Perpanjangan";
import Pengembalian from "../../model/Pengembalian";
import { getTotalBukuByItem } from "./UtilsBukuServices";
import Peminjaman from "../../model/Peminjaman";


export const rasioKategoriBuku = async() => {
    const totalBuku = await Buku.find({isMissing: false}).countDocuments()
    const hasil = await Buku.aggregate([
        { $unwind: "$kategori" }, // pecah array kategori jadi baris terpisah
        {
        $group: {
            _id: "$kategori", // nama kategori langsung
            jumlahBuku: { $sum: 1 }
        }
        },
        { $sort: { jumlahBuku: -1 } }, // urutkan dari terbanyak ke sedikit
        {
        $project: {
            _id: 0,
            kategori: "$_id",
            jumlahBuku: 1
        }
        }
    ]);

    return hasil;
}

export const rasioPeminjamanBuku = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDipinjam = await Peminjaman.find({$or : [
        {statusPeminjaman: 'Dipinjam'},
        {statusPeminjaman: 'Terlambat'}
    ]}).countDocuments()

    return [totalBuku, totalBukuDipinjam]
}

export const rasioPerpanjanganBuku = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDiperpanjang = await Perpanjangan.find({disetujui: 'Diterima'}).countDocuments()

    return [totalBuku, totalBukuDiperpanjang]
}

export const rasioPengembalianBuku = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDikembalikan = await Pengembalian.find({
        statusPengembalian: 'Dikembalikan'
    }).countDocuments()

    return [totalBuku, totalBukuDikembalikan]
}

export const rasioBukuHilang = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDihilangkan = await Pengembalian.find({
        isMissing: true
    }).countDocuments()

    return [totalBuku, totalBukuDihilangkan]
}