import Pengembalian from "../../model/Pengembalian"

export const getTotalPengembalian = async({userId} : {userId: string}) => {
    const pengembalian = await Pengembalian.find({
        idPengguna: userId, 
        statusPembayaran: 'Dibayar',
        statusPengembalian: 'Dikembalikan'
    }).populate('idBuku')

    const totalPengembalian = pengembalian.length

    return {
        data: pengembalian,
        total: totalPengembalian,
    }
}

export const getTotalBukuDihilangkan = async({userId} : {userId: string}) => {
    const dataBukuHilang = await Pengembalian.
        find({idPengguna: userId, statusPembayaran: 'Dibayar', statusPengembalian: 'Dikembalikan', isMissing: true})
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN stok',
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })

    return {
        data: dataBukuHilang,
        total: dataBukuHilang.length
    }
}