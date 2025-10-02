import Buku from "../../model/Buku";
import Peminjaman from "../../model/Peminjaman";
import Pengembalian from "../../model/Pengembalian";
import Perpanjangan from "../../model/Perpanjangan";
import { BukuSchemaType } from "../../model/Buku";

import cloudinary from 'cloudinary'
import {promises as fs} from 'fs'

import { rasioKategoriBuku, rasioPeminjamanBuku, rasioBukuHilang, rasioPengembalianBuku, rasioPerpanjanganBuku } from "./RatioBukuServices";

import { statsBukuHilang, statsBukuDipinjam, stastBukuDikembalikan, statsBukuDiPerpanjang, statsDetailBukuTelahDipinjam, statsDetailBukuTelahHilang, statsDetailBukuDikembalian } from "./StatsBukuServices";
import { allBukuStats } from "./StatsBukuServices";

import { NotFoundError } from "../../errors/errorHandler";
import { getPeminjamanAktifByBukuId } from "../peminjamanServices";
import { getPengembalianByBukuId, getPengembalianHilangByBukuId } from "../pengembalianServices";
import { bukuMatch } from "../../utils/bukuQuery";


export const getSemuaBukuUntukPustakawan = async({query} : {query: any}) => {
    const mongoQuery: any = { ...query };
    delete mongoQuery.query;

    const books = await Buku.find(mongoQuery).sort({createdAt: -1})
    const dataRasio = await rasioKategoriBuku()
    const dataStats = await allBukuStats()
    return {
        dataBuku: books,
        dataRasio, 
        dataStats,
    }
}

export const getSatuBukuUntukPustakawan = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku})
        .populate({
            path: 'createdBy',
            select: '_id nama fotoProfil'
        })
    const dataStatsPeminjamanBuku = await statsDetailBukuTelahDipinjam({idBuku})
    const peminjamanAktifBuku = await getPeminjamanAktifByBukuId({idBuku})

    const statsHilangBuku = await statsDetailBukuTelahHilang({idBuku})
    const bukuHilang = await getPengembalianHilangByBukuId({idBuku})

    const dataStatsPengembalianBuku = await statsDetailBukuDikembalian({idBuku})
    const dataPengembalian = await getPengembalianByBukuId({idBuku})

    if (!buku) {
        throw new NotFoundError('Buku tidak ditemukan!')
    }
    return {
        buku, 
        dataStatsBuku: dataStatsPeminjamanBuku, 
        peminjamanAktif: peminjamanAktifBuku, 
        dataStatsPengembalianBuku,
        dataPengembalian,
        statsHilangBuku,
        bukuHilang
    }
}

export const getSemuaBukuDipinjam = async({query} : {query: any}) => {

    const bukuQuery = bukuMatch(query)

    const bukuDipinjamRaw = await Peminjaman.find({$or: [
        {statusPeminjaman: 'Dipinjam'},
        {statusPeminjaman: 'Terlambat'}
    ]})
        .select('buku peminjam _id berakhirPada durasiPeminjaman statusPeminjaman dataPengembalian')
        .sort({createdAt: -1})
        .populate({
            path: 'buku',
            match: bukuQuery
        })
        .populate({
            path: 'peminjam',
            select: 'fotoProfil _id nama'
        })

    const bukuDipinjam = bukuDipinjamRaw.filter((item) => item.buku !== null);

    const ratioBukuDipinjam = await rasioPeminjamanBuku()
    const statsBukuPinjam = await statsBukuDipinjam()

    return {
        bukuDipinjam,
        ratioBukuDipinjam,
        statsBukuPinjam
    }
}

export const getSemuaBukuDiperpanjang = async({query} : {query: any}) => {
    const bukuQuery = bukuMatch(query)
   
    const bukuDiperpanjangRaw = await Perpanjangan.find({disetujui: 'Diterima'})
        .select('idBuku idPengguna idPeminjaman _id durasi alasan')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: '_id judul kategori ISBN',
            match: bukuQuery
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id dataPengembalian'
        })

    const bukuDiperpanjang = bukuDiperpanjangRaw.filter((item) => item.idBuku !== null);

    const ratioBukuDiperpanjang = await rasioPerpanjanganBuku()
    const statsBukuDiperpanjangan = await statsBukuDiPerpanjang()

    return {
        bukuDiperpanjang,
        ratioBukuDiperpanjang,
        statsBukuDiperpanjangan
    }
}

export const getSemuaBukuDikembalikan = async({query} : {query: any}) => {
    const bukuQuery = bukuMatch(query)
    
    const bukuDikembalikanRaw = await Pengembalian.find({statusPengembalian: 'Dikembalikan'})
        .select('idBuku idPengguna idPeminjaman _id tanggalPengembalian keadaanBuku isMissing')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN',
            match: bukuQuery
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })

    const bukuDikembalikan = bukuDikembalikanRaw.filter((item) => item.idBuku !== null);

    const ratioBukuDikembalikan = await rasioPengembalianBuku()
    const statsBukuPengembalian = await stastBukuDikembalikan()

    return {
        bukuDikembalikan,
        ratioBukuDikembalikan,
        statsBukuPengembalian
    }
}

export const getSemuaBukuHilang = async({query} : {query: any}) => {
    const bukuQuery = bukuMatch(query)
    const bukuDihilangkaRaw = await Pengembalian.find({isMissing: true})
        .select('idBuku idPengguna idPeminjaman _id tanggalPengembalian statusPembayaran, totalDenda statusPembayaran')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN stok',
            match: bukuQuery
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })

    const bukuDihilangkan = bukuDihilangkaRaw.filter((item) => item.idBuku !== null);

    const ratioBukuDihilangkan = await rasioBukuHilang()
    const statsBukuDihilangkan = await statsBukuHilang()

    return {
        bukuDihilangkan,
        ratioBukuDihilangkan,
        statsBukuDihilangkan
    }
}

export const tambahDataBuku = async(dataBukuTerbaru: any, reqFile: any) => {
    
    let dataBuku = dataBukuTerbaru
    dataBuku.ukuranBuku = {
        panjang: dataBuku.panjang,
        lebar: dataBuku.lebar
    }
    delete dataBuku.panjang
    delete dataBuku.lebar

    // proses buku untuk diupload di cloudinary
    if (reqFile) {
        const response = await cloudinary.v2.uploader.upload(reqFile.path)
        await fs.unlink(reqFile.path)

        dataBuku.cover = response.secure_url
        dataBuku.coverPublicId = response.public_id
    }

    const bukuTerbaru = await Buku.create(dataBuku)
    return bukuTerbaru
}

export const editDataBuku = async(idBuku: string, dataBuku: any, reqFile: any) => {
    let dataBukuBaru = dataBuku
    dataBukuBaru.ukuranBuku = {
        panjang: dataBukuBaru.panjang,
        lebar: dataBukuBaru.lebar
    }
    delete dataBukuBaru.panjang
    delete dataBukuBaru.lebar

    // jika pengguna memperbaharui foto buku
    if (reqFile) {
        const response = await cloudinary.v2.uploader.upload(reqFile.path)
        await fs.unlink(reqFile.path)

        dataBukuBaru.cover = response.secure_url
        dataBukuBaru.coverPublicId = response.public_id
    }

    const buku = await Buku.findOne({_id: idBuku})
    if (reqFile && buku && buku.coverPublicId) {
        await cloudinary.v2.uploader.destroy(buku.coverPublicId)
    }

    const updatedBuku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {...dataBukuBaru},
        {new: true, runValidators: true}
    )

    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    return buku
}

export const hapusDataBuku = async(idBuku: string)  => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {dihapus: true},
        {new: true}
    );
    if (!buku) throw new NotFoundError('Buku tidak ditemukan!');
    
    return buku;
}