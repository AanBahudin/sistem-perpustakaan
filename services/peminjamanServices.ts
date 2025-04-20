import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import Buku from "../model/Buku";
import Peminjaman from "../model/Peminjaman";
import Pengguna from "../model/Pengguna";
import { GetOnePeminjamanParamsType, GetOnePeminjamanUser, GetSemuaPeminjamanUserParamsType, PembatalanPeminjamanUserParamsType, PengajuanPeminjamanParamsType, PinjamanDikembalikanParamsType, PinjamanUpdatedFieldType, TambahPeminjamanParamsType, TerimaPeminjamanUserParamsType } from "../types/peminjamanTypes";
import { mencegahBukuDipinjamBerulang, mencegahBukuDiterimaBerulang } from "../utils/checker";
import tambahHariKeTanggal from "../utils/tambahHari";
import { bukuDipinjam } from "./bukuServices";
import { dataDurasiPeminjaman } from "./durasiServices";
import { penggunaMeminjam } from "./penggunaServices";


// 4 service dibawah khusus pengguna

// SUDAH DITESTING
export const pengajuanPeminjaman = async({ durasiPeminjaman, idBuku, userId } : PengajuanPeminjamanParamsType) => {
    // fungsi mencegah peminjaman pada saat masih ada pinjaman aktif dengan buku yang sama
    const pinjamanMasihAda = await mencegahBukuDiterimaBerulang(idBuku, userId)
    if (pinjamanMasihAda) throw new BadRequestError('Kamu masih memiliki pinjaman aktif atau sedang dalam proses ')
    
    // cek apakah buku ada dan masih tersedia
    const buku = await Buku.findOne({_id: idBuku, stok: { $gte: 1 }, status: 'Tersedia', dihapus: false})
    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    // cek apakah durasi yang dipilih tersedia
    const durasiTersedia = (await dataDurasiPeminjaman()).map(item => item.durasi)
    if (!durasiTersedia.includes(durasiPeminjaman)) throw new BadRequestError('Durasi tidak tersedia')

    const pinjaman = await Peminjaman.create({ 
        peminjam: userId, 
        buku: idBuku, 
        durasiPeminjaman, 
        statusPeminjaman: 'Diajukan' 
    })

    return {data: pinjaman} 
    // return {data: []}
}

// SUDAH DITESTING
export const getSemuaPeminjamanUser = async({userId} : GetSemuaPeminjamanUserParamsType) => {
    const pinjamanUser = await Peminjaman.find({peminjam: userId})

    return {data: pinjamanUser}
}

// SUDAH DITESTING
export const getOnePeminjamanUser = async({userId, peminjamanId} : GetOnePeminjamanUser) => {
    const peminjaman = await Peminjaman.findOne({_id: peminjamanId, peminjam: userId})
    if (!peminjaman) throw new NotFoundError('Data peminjaman tidak ditemukan')

    return {data: peminjaman}
}

// SUDAH DITESTING
export const pembatalanPeminjamanUser = async({idPeminjaman, userId} : PembatalanPeminjamanUserParamsType) => {
    const peminjaman = await Peminjaman.findOne({_id: idPeminjaman, peminjam: userId})
    if (!peminjaman) throw new NotFoundError('Data peminjaman tidak ditemukan')

    const { statusPeminjaman, disetujui, diprosesOleh } = peminjaman
    if (statusPeminjaman !== 'Diajukan' || disetujui || diprosesOleh) {
        throw new BadRequestError('Tidak dapat membatalkan pengajuan')
    }

    await Peminjaman.findOneAndDelete({_id: idPeminjaman, peminjam: userId});
}

// service dibawah khusus pustakawan

// SUDAH DITESTING
export const terimaPeminjamanUser = async({idPeminjaman, statusPeminjaman, kondisiBuku, userId} : TerimaPeminjamanUserParamsType) => {
    // objek yang akan digunakan untuk meng-update data pinjaman
    let updatedField : PinjamanUpdatedFieldType = {
        statusPeminjaman : statusPeminjaman ? 'Dipinjam' : 'Ditolak',
        disetujui: statusPeminjaman,
        diprosesOleh: userId,
        kondisi: kondisiBuku
    }

    // ambil data pinjaman khususnya durasiPeminjaman
    const dataPeminjaman = await Peminjaman.findOne({
        _id: idPeminjaman, 
        disetujui: false,
        statusPeminjaman: 'Diajukan',
        berakhirPada: null
    })
    if (!dataPeminjaman) throw new NotFoundError('Data peminjaman tidak ditemukan')

    // cek data buku
    const isBukuExist = await Buku.findOne({_id: dataPeminjaman.buku, stok: { $gte: 1 }, status: 'Tersedia', dihapus: false})
    if (!isBukuExist) throw new NotFoundError('Buku tidak ditemukan')

     // fungsi mencegah peminjaman pada saat masih ada pinjaman aktif dengan buku yang sama
     const pinjamanMasihAda = await mencegahBukuDiterimaBerulang(dataPeminjaman.buku as string, dataPeminjaman.peminjam as string)
     if (pinjamanMasihAda) throw new BadRequestError('kamu masih memiliki pinjaman aktif atau dalam proses untuk buku ini')

    // jika data peminjaman diterima, maka tambahkan field berakhirPada untuk menandai masa selesainya peminjaman
    if (statusPeminjaman) {
        updatedField.berakhirPada = tambahHariKeTanggal(new Date, dataPeminjaman.durasiPeminjaman as number)

    }    

    // update data peminjaman dengan objek updatedField
    const dataPinjaman = await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman},
        updatedField,
        {new: true, runValidators: true}
    )

    if (statusPeminjaman) {
        // update attribute jumlahPinjaman di model Pengguna
        await penggunaMeminjam({idPengguna: dataPeminjaman.peminjam as string})
        // update attribute stok buku di model Buku
        await bukuDipinjam(dataPeminjaman.buku as string)
    }

    return {data: dataPinjaman}
}

// SUDAH DITESTING
export const tambahPinjamanUser = async({
    idBuku,
    idPengguna,
    durasiPeminjaman,
    kondisi,
    userId
} : TambahPeminjamanParamsType) => {
    
    // objek yang digunakan untuk membuat data pinjaman
    const pinjamanField = {
        peminjam: idPengguna,
        buku: idBuku,
        statusPinjaman: 'Dipinjam',
        durasiPeminjaman,
        kondisi,
        disetujui: true,
        berakhirPada: tambahHariKeTanggal(new Date, durasiPeminjaman),
        diprosesOleh: userId
    }

    // cek data buku
    const isBukuExist = await Buku.findOne({_id: idBuku,stok: { $gte: 1 }, status: 'Tersedia', dihapus: false})
    if (!isBukuExist) throw new NotFoundError('Data buku tidak tersedia')

    // cek data pengguna
    const isPenggunaExist = await Pengguna.findOne({_id: idPengguna})
    if (!isPenggunaExist) throw new NotFoundError('Data pengguna tidak ditemukan')

    // cek durasi pengembalian
    const isDurasiExist = (await dataDurasiPeminjaman()).map(item => item.durasi)
    if (!isDurasiExist.includes(durasiPeminjaman)) throw new BadRequestError('Durasi tidak tersedia')

    // fungsi mencegah peminjaman pada saat masih ada pinjaman aktif dengan buku yang sama
    const pinjamanMasihAda = await mencegahBukuDipinjamBerulang(idBuku, idPengguna)
    if (pinjamanMasihAda) throw new BadRequestError('Kamu masih memiliki pinjaman aktif atau sedang dalam proses untuk buku ini')

    // buat data pinjmaman
    const pinjaman = await Peminjaman.create(pinjamanField)

    // tambah pinjaman di pengguna
    await penggunaMeminjam({idPengguna: userId})
    // tambah pinjaman di buku
    await bukuDipinjam(idBuku)

    return {data: pinjaman}
}

// SUDAH DITESTING
export const getSemuaPinjaman = async() => {
    const pinjaman = await Peminjaman.find()

    return {data: pinjaman}
}

// SUDAH DITESTING
export const getSemuaPinjamanAktif = async() => {
    const peminjaman = await Peminjaman.find({statusPeminjaman: 'Dipinjam', disetujui: true})

    return {data: peminjaman}
}

// SUDAH DITESTING
export const getSemuaPengajuanPeminjaman = async() => {
    const permintaanPeminjaman = await Peminjaman.find(
        {statusPeminjaman: 'Diajukan', disetujui: 'false'}
    ).populate([
        {path: 'peminjam', select: '-password -role'},
        {path: 'buku'}
    ])

    return {data: permintaanPeminjaman}
}

// SUDAH DITESTING
export const getOnePeminjaman = async({idPeminjaman} : GetOnePeminjamanParamsType) => {
    const pinjaman = await Peminjaman.findOne({_id: idPeminjaman})
    if (!pinjaman) throw new NotFoundError('Data pinjaman tidak ditemukan')

    return {data: pinjaman}
}

// service dibawah digunakan di services lain.
export const pinjamanDikembalikan = async({idBuku, idPeminjam, idPeminjaman} : PinjamanDikembalikanParamsType) => {
    await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman, peminjam: idPeminjam, buku: idBuku},
        {statusPeminjaman: 'Dikembalikan'},
        {new: true, runValidators: true}
    )
}