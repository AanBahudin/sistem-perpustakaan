import { WebSocketServer } from "ws";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import Buku from "../model/Buku";
import Peminjaman from "../model/Peminjaman";
import Pengguna from "../model/Pengguna";
import { GetOnePeminjamanParamsType, GetOnePeminjamanUser, GetOnePeminjamanUserByBookId, getOnePeminjamanUserByPengembalianIdType, GetSemuaPeminjamanUserParamsType, PembatalanPeminjamanUserParamsType, PengajuanPeminjamanParamsType, PinjamanDikembalikanParamsType, PinjamanUpdatedFieldType, TambahPeminjamanParamsType, TerimaPeminjamanUserParamsType } from "../types/peminjamanTypes";
import { mencegahBukuDipinjamBerulang, mencegahBukuDiterimaBerulang } from "../utils/checker";
import tambahHariKeTanggal from "../utils/tambahHari";
import { bukuDipinjam } from "./BukuServices/UtilsBukuServices";
import { dataDurasiPeminjaman } from "./durasiServices";
import { penggunaMeminjam } from "./penggunaServices";
import { notifyPustakawan, notifyUser } from "../sockets/soket";


// 4 service dibawah khusus pengguna
 
// SUDAH DITESTING
export const pengajuanPeminjaman = async({ durasiPeminjaman, idBuku, userId, alasan } : PengajuanPeminjamanParamsType) => {
    // fungsi mencegah peminjaman pada saat masih ada pinjaman aktif dengan buku yang sama
    const pinjamanMasihAda = await mencegahBukuDipinjamBerulang(idBuku, userId)
    if (pinjamanMasihAda) throw new BadRequestError('Kamu masih memiliki pinjaman aktif atau sedang dalam proses ')
    
    // cek apakah buku ada dan masih tersedia
    const buku = await Buku.findOne({_id: idBuku, stok: { $gte: 1 }, status: 'Tersedia', dihapus: false})
    if (!buku) throw new NotFoundError('Buku tidak ditemukan atau buku telah habis')

    // cek apakah durasi yang dipilih tersedia
    const durasiTersedia = (await dataDurasiPeminjaman()).map(item => item.durasi)
    if (!durasiTersedia.includes(durasiPeminjaman)) throw new BadRequestError('Durasi tidak tersedia')

    const pinjaman = await Peminjaman.create({ 
        peminjam: userId,
        alasan,
        buku: idBuku,
        judulBuku: buku.judul,
        durasiPeminjaman, 
        statusPeminjaman: 'Diajukan' 
    })

    // kirim notifikasi ke pustakawan via websocket
    notifyPustakawan({
        event: 'PENGGUNA_MENGAJUKAN_PEMINJAMAN',
        payload: {
            untuk: 'PUSTAKAWAN',
            tipe: 'PEMINJAMAN',
            title: 'Pengajuan Baru',
            deskripsi: 'Terdapat pengajuan peminjaman baru',
            data: pinjaman
        }
    })

    return {data: pinjaman}
}

// SUDAH DITESTING
export const getSemuaPeminjamanUser = async({userId, query} : GetSemuaPeminjamanUserParamsType) => {
    
    if (query?.judulBuku) {
        query.judulBuku = { $regex: query.judulBuku, $options: "i" }; 
    }
    

    const newQuery = {...query}
    delete newQuery.page
    const totalPeminjaman = await Peminjaman.find({peminjam: userId, ...newQuery}).countDocuments()

    const page = query.page || 1
    const limit = 10
    const totalPage = Math.ceil(totalPeminjaman / 10)
    const skip = (page - 1) * limit
    
    if (query.page) delete query.page

    const pinjamanUser = await Peminjaman.find({peminjam: userId, ...query})
        .populate(['buku', 'peminjam'])
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip)
        

    return {data: pinjamanUser, totalPage}
}

// SUDAH DITESTING
export const getOnePeminjamanUser = async({userId, peminjamanId} : GetOnePeminjamanUser) => {
    const peminjaman = await Peminjaman.findOne({_id: peminjamanId, peminjam: userId}).populate(['buku', 'peminjam', 'diprosesOleh', 'dataPengembalian'])
    if (!peminjaman) throw new NotFoundError('Data peminjaman tidak ditemukan')

    return {data: peminjaman}
}

// SUDAH DITESTING
export const getOnePeminjamanUserByIdBook = async({userId, bookId} : GetOnePeminjamanUserByBookId) => {
    const peminjaman = await Peminjaman.findOne({
        peminjam: userId, 
        buku: bookId, 
        $or: [
            {statusPeminjaman: 'Dipinjam'},
            {statusPeminjaman: 'Terlambat'},
            {statusPeminjaman: 'Diajukan'},
        ]
    }).populate(['buku', 'peminjam', 'diprosesOleh', 'dataPengembalian'])

    return peminjaman
}

// SUDAH DITESTING
export const getOnePeminjamanUserByPengembalianIdServices = async({userId, pengembalianId} : getOnePeminjamanUserByPengembalianIdType) => {
    const data = await Peminjaman.findOne({peminjam:userId,  dataPengembalian: pengembalianId}).populate(['buku', 'peminjam', 'diprosesOleh'])
    return data
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
export const terimaPeminjamanUser = async({idPeminjaman, kondisiBuku, userId} : TerimaPeminjamanUserParamsType) => {
    // objek yang akan digunakan untuk meng-update data pinjaman
    let updatedField : PinjamanUpdatedFieldType = {
        statusPeminjaman : 'Dipinjam',
        disetujui: true,
        diprosesOleh: userId,
        kondisi: kondisiBuku
    }

    // ambil data pinjaman khususnya durasiPeminjaman
    const dataPeminjaman = await Peminjaman.findOne({
        _id: idPeminjaman, 
        disetujui: false,
        statusPeminjaman: 'Diajukan',
        // berakhirPada: null
    })
    if (!dataPeminjaman) throw new NotFoundError('Data peminjaman tidak ditemukan')

    // cek data buku
    const isBukuExist = await Buku.findOne({_id: dataPeminjaman.buku, stok: { $gte: 1 }, status: 'Tersedia', dihapus: false})
    if (!isBukuExist) throw new NotFoundError('Buku tidak ditemukan')

     // fungsi mencegah peminjaman pada saat masih ada pinjaman aktif dengan buku yang sama
     const pinjamanMasihAda = await mencegahBukuDiterimaBerulang(dataPeminjaman.buku as string, dataPeminjaman.peminjam as string)
     if (pinjamanMasihAda) throw new BadRequestError('kamu masih memiliki pinjaman aktif atau dalam proses untuk buku ini')

    // jika data peminjaman diterima, maka tambahkan field berakhirPada untuk menandai masa selesainya peminjaman
    updatedField.berakhirPada = tambahHariKeTanggal(new Date, dataPeminjaman.durasiPeminjaman as number)

    // update data peminjaman dengan objek updatedField
    const dataPinjaman = await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman},
        updatedField,
        {new: true, runValidators: true}
    )

    // update attribute jumlahPinjaman di model Pengguna
    await penggunaMeminjam({idPengguna: dataPeminjaman.peminjam as string})
    // update attribute stok buku di model Buku
    await bukuDipinjam(dataPeminjaman.buku as string)

    notifyUser({
        userId: dataPinjaman?.peminjam.toString() as string,
        event: 'PEMINJAMAN_DITERIMA',
        payload: {
            untuk: 'PENGGUNA',
            tipe: 'PEMINJAMAN',
            title: 'Peminjaman anda telah diproses',
            deskripsi: 'Lihat status penerimaan peminjaman anda',
            data: dataPinjaman
        }
    })

    return {data: dataPinjaman}
}

export const tolakPinjamanPustakawan = async({idPeminjaman, idPengguna} : {idPeminjaman: string, idPengguna: string}) => {
    const pengajuanPeminjaman = await Peminjaman.findOneAndUpdate({_id: idPeminjaman}, {
        statusPeminjaman: 'Ditolak', 
        disetujui: 'false',
        diprosesOleh: idPengguna
    }, {runValidators: true, new: true})


    notifyUser({
        userId: pengajuanPeminjaman?.peminjam.toString() as string,
        event: 'PEMINJAMAN_DITOLAK',
        payload: {
            untuk: 'PENGGUNA',
            tipe: 'PEMINJAMAN',
            title: 'Peminjaman anda telah diproses',
            deskripsi: 'Lihat status penerimaan peminjaman anda',
            data: pengajuanPeminjaman
        }
    })

    return {message: 'success'}
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

export const updateDurasiPinjaman = async({idPinjaman, berakhirPada, durasiPeminjaman} : any) => {
    await Peminjaman.findOneAndUpdate(
        {_id: idPinjaman},
        {berakhirPada, durasiPeminjaman},
        {new: true, runValidators: true}
    )
}

export const getPeminjamanByUserId = async({userId} : {userId: string}) => {
    const pinjaman = await Peminjaman.find({peminjam: userId, statusPeminjaman: 'Dipinjam'}).populate(['peminjam', 'buku'])
    return pinjaman
}

export const getPeminjamanAktifByBukuId = async({idBuku} : {idBuku: string}) => {
    const peminjaman = await Peminjaman.find(
        {buku: idBuku, $or: [
            {statusPeminjaman: 'Dipinjam'},
            {statusPeminjaman: 'Terlambat'},
        ]}
    )
        .select('buku peminjam _id berakhirPada durasiPeminjaman statusPeminjaman dataPengembalian')
        .sort({createdAt: -1})
        .populate({
            path: 'buku',
        })
        .populate({
            path: 'peminjam',
            select: 'fotoProfil _id nama'
        })

    return peminjaman
}   