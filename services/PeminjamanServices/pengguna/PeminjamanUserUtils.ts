import Peminjaman from "../../../model/Peminjaman"

export const getSemuaDataPeminjamanUserById = async({userId} : {userId: string}) => {
    const peminjaman = await Peminjaman
        .find({peminjam: userId, statusPeminjaman: 'Dikembalikan'})
        .populate(['buku', 'peminjam'])
    const totalSemuaPeminjaman = peminjaman.length

    return {
        data: peminjaman,
        total: totalSemuaPeminjaman
    }
}

export const getSemuaDataPeminjamanAktifUserById = async({userId} : {userId: string}) => {
    const peminjamanAktif = await Peminjaman
        .find({peminjam: userId, $or: [
            {statusPeminjaman: 'Dipinjam'},
            {statusPeminjaman: 'Terlambat'},
        ]})
        .populate(['buku', 'peminjam'])
    const totalPeminjamanAktif = peminjamanAktif.length

    return {
        data: peminjamanAktif,
        total: totalPeminjamanAktif
    }
}
