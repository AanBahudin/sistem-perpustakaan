import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Buku from "../model/Buku"
import Peminjaman from "../model/Peminjaman"
import Perpanjangan from "../model/Perpanjangan"
import { notifyPustakawan, notifyUser } from "../sockets/soket"
import { AcceptPerpanjanganParamsType, GetOnePerpanjanganParamsType, GetOnePerpanjanganUserParamsType, GetSemauPerpanjanganParamsType, PembatalanPerpanjanganParamsType, PenambahanPerpanjanganParamsType, PerpanjanganDitolakParamsType, TambahPerpanjanganParamsType, UpdatePerpanjanganParamsType } from "../types/perpanjanganTypes"
import tambahHariKeTanggal from "../utils/tambahHari"
import { dataDurasiPeminjaman } from "./durasiServices"
import { updateDurasiPinjaman } from "./peminjamanServices"

// ================================= KHUSUS PENGGUNA =================================

// SUDAH DITESTING
export const tambahPerpanjangan = async({ userId, dataPerpanjangan } : TambahPerpanjanganParamsType) => {

    const {idPeminjaman, idBuku, durasi} = dataPerpanjangan

    // cek data peminjaman
    const peminjaman = await Peminjaman.findOne({
        _id: idPeminjaman, 
        buku: idBuku, 
        statusPeminjaman: 'Dipinjam', 
        disetujui: true})
    if (!peminjaman) throw new NotFoundError('Data peminjaman tidak ditemukan')

    // cek buku
    const buku = await Buku.findOne({_id: idBuku})
    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    
    // cek durasi
    const durasiTersedia = (await dataDurasiPeminjaman()).map(item => item.durasi)
    if (!durasiTersedia.includes(durasi)) throw new BadRequestError('Durasi tidak tersedia')

    const perpanjangan = await Perpanjangan.create({
        ...dataPerpanjangan,
        judulBuku: buku.judul,
        idPengguna: userId
    })

    notifyPustakawan({
        event: 'PENGGUNA_MENGAJUKAN_PERPANJANGAN',
        payload: {
            untuk: 'PUSTAKAWAN',
            tipe: 'PERPANJANGAN',
            title: 'Pengajuan Baru',
            deskripsi: 'Terdapat pengajuan perpanjangan baru',
            data: perpanjangan
        }
    })

    return {data: perpanjangan}
}

// SUDAH DITESTING
export const getSemuaPerpanjangan = async({userId, query} : GetSemauPerpanjanganParamsType) => {

    if (query?.judulBuku) {
        query.judulBuku = { $regex: query.judulBuku, $options: "i" }; 
    }

    const totalPerpanjangan = await Perpanjangan.find({idPengguna: userId}).countDocuments()
    const page = query.page || 1
    const limit = 10
    const totalPage = Math.ceil(totalPerpanjangan / 10)
    const skip = (page - 1) * limit
    
    if (query.page) delete query.page

    const dataPerpanjangan = await Perpanjangan.find({idPengguna: userId, ...query})
        .populate('idBuku')
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip)

    return {data: dataPerpanjangan, totalPage}
}

// SUDAH DITESTING
export const getOnePerpanjangan = async({idPerpanjangan, userId} : GetOnePerpanjanganParamsType) => {
    const perpanjangan = await Perpanjangan.findOne({_id: idPerpanjangan, idPengguna: userId})
    if (!perpanjangan) throw new NotFoundError('Data perpanjangan tidak ditemukan')

    const relatedPeminjaman = await Peminjaman.findOne({_id: perpanjangan.idPeminjaman, peminjam: userId, buku: perpanjangan.idBuku})
    const buku = await Buku.findOne({_id: perpanjangan.idBuku})
    
    return {
        perpanjangan,
        peminjaman: relatedPeminjaman,
        detailBuku: buku
    }
}

export const getOnePerpanjanganByPeminjamanId = async({userId, idPeminjaman} : {userId: string, idPeminjaman: string}) => {
    const data = await Perpanjangan.findOne({idPengguna: userId, idPeminjaman})

    return data
}

// SUDAH DITESTING
export const ubahPerpanjangan = async({idPerpanjangan, userId, dataPerpanjangan} : UpdatePerpanjanganParamsType) => {

    const {durasi} = dataPerpanjangan

    const dataDurasi = (await dataDurasiPeminjaman()).map(item => item.durasi)
    if (!dataDurasi.includes(durasi)) throw new BadRequestError('Durasi tidak tersedia')

    const data = await Perpanjangan.findOneAndUpdate(
        {_id: idPerpanjangan, idPengguna: userId, disetujui: 'Pending'},
        {...dataPerpanjangan},
        {new: true, runValidators: true}
    )
    if (!data) throw new NotFoundError('Data perpanjangan tidak ditemukan')

    return {data}
}

// SUDAH DITESTING
export const pembatalanPerpanjangan = async({userId, idPerpanjangan} : PembatalanPerpanjanganParamsType) => {
    const perpanjangan = await Perpanjangan.findOneAndDelete({
        _id: idPerpanjangan,
        idPengguna: userId,
        $or: [
            {disetujui: 'Pending'},
            {disetujui: 'Ditolak'}
        ]
    })
    if (!perpanjangan) throw new NotFoundError('Data perpanjangan tidak ditemukan')
}



// ================================= KHUSUS PUSTAKAWAN =================================

// SUDAH DITESTING
export const getSemuaPerpanjanganUser = async() => {
    const dataPerpanjangan = await Perpanjangan.find()

    return {data: dataPerpanjangan}
}

// SUDAH DITESTING
export const getOnePerpanjanganUser = async({idPerpanjangan} : GetOnePerpanjanganUserParamsType) => {
    const dataPerpanjangan = await Perpanjangan.findOne({_id: idPerpanjangan})
    if (!dataPerpanjangan) throw new NotFoundError('Data perpanjangan tidak ditemukan')
    return {data: dataPerpanjangan}
}

// SUDAH DITESTING
export const acceptPerpanjangan = async({idPerpanjangan, userId} : AcceptPerpanjanganParamsType) => {

    // cek apakah data perpanjangan tidak tersedia
    const perpanjangan = await Perpanjangan.findOne({_id: idPerpanjangan, disetujui: 'Pending'})
    if (!perpanjangan) throw new NotFoundError('Data perpanjangan tidak ditemukan')

    // ambil data peminjaman
    const pinjaman = await Peminjaman.findOne({_id: perpanjangan.idPeminjaman, statusPeminjaman: 'Dipinjam', disetujui: true})
    if (!pinjaman) throw new NotFoundError('Data pinjaman tidak ditemukan')
    const {durasiPeminjaman, berakhirPada} = pinjaman!

    // perpanjangan masa durasi.
    let penambahanDurasiPeminjaman = durasiPeminjaman + perpanjangan.durasi
    let penambahanTanggalPinjaman = tambahHariKeTanggal(berakhirPada as Date, perpanjangan.durasi)

    // update data perpanjangan
    await penambahanPerpanjangan({userId, idPerpanjangan: idPerpanjangan})

    // update data pinjaman
    const perpanjanganDiterima = await updateDurasiPinjaman({
        idPinjaman: pinjaman._id,
        berakhirPada: penambahanTanggalPinjaman,
        durasiPeminjaman: penambahanDurasiPeminjaman
    })

    notifyUser({
        userId: perpanjangan?.idPengguna.toString() as string,
        event: 'PERPANJANGAN_DITERIMA',
        payload: {
            untuk: 'PENGGUNA',
            tipe: 'PERPANJANGAN',
            title: 'Perpanjangan anda telah diproses',
            deskripsi: 'Lihat status penerimaan perpanjangan anda',
            data: perpanjangan
        }
    })

    return {data: perpanjanganDiterima, message: 'Perpanjangan pinjaman diterima'}
}

export const tolakPerpanjanganPustakawan = async({idPerpanjangan, idPustakawan} : {idPerpanjangan: string, idPustakawan: string}) => {
    const dataPerpanjangan = await Perpanjangan.findOneAndUpdate(
        {_id: idPerpanjangan, disetujui: 'Pending'},
        {disetujui: 'Ditolak', diprosesOleh: idPustakawan}
    )
    if (!dataPerpanjangan) throw new NotFoundError('Data perpanjangan tidak ditemukan!')


    notifyUser({
        userId: dataPerpanjangan?.idPengguna.toString() as string,
        event: 'PERPANJANGAN_DITOLAK',
        payload: {
            untuk: 'PENGGUNA',
            tipe: 'PERPANJANGAN',
            title: 'Perpanjangan anda telah diproses',
            deskripsi: 'Lihat status penerimaan perpanjangan anda',
            data: dataPerpanjangan
        }
    })

    return dataPerpanjangan
}


// ================================= DIGUNAKAN DITEMPAT LAIN =================================

// SUDAH DITESTING
export const penambahanPerpanjangan = async({idPerpanjangan, userId} : PenambahanPerpanjanganParamsType) => {
    await Perpanjangan.findOneAndUpdate(
        {_id: idPerpanjangan},
        {disetujui: 'Diterima', diprosesOleh: userId},
        {new: true, runValidators: true}
    )
}

export const getPerpanjanganByUserId = async({userId} : {userId: string}) => {
    const perpanjangan = await Perpanjangan.find({idPengguna: userId}).populate(['idPengguna', 'idBuku'])
    return perpanjangan
}