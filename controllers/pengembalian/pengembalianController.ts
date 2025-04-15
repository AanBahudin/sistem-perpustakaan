import { Request, Response } from "express";
import Pengembalian from "../../model/Pengembalian";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/errorHandler";
import Peminjaman from "../../model/Peminjaman";
import { hitungKeterlambatan } from "../../utils/selisihHari";

export const getAllPengembalianUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user

    const dataPengembalian = await Pengembalian.find({idPengguna: userId})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pengembalian',
        timestamps: new Date(Date.now()).toString(),
        data: dataPengembalian,
        total: dataPengembalian.length
    })
}

export const getSinglePengembalianUser = async(req: Request | any, res: Response) => {
    const {id: idPengembalian} = req.params
    const { userId } = req.user

    const dataPengembalian = await Pengembalian.findOne({_id: idPengembalian, idPengguna: userId})
    if (!dataPengembalian) {
        throw new NotFoundError("Data Pengembalian tidak ditemukan")
    }

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pengembalian',
        timestamps: new Date(Date.now()).toString(),
        data: dataPengembalian
    })
}

// untuk pustakawan
export const getDataPengembalian = async(req: Request, res: Response) => {
    const dataPengembalian = await Pengembalian.find()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Seluruh Data Peminjaman',
        timestamps: new Date(Date.now()).toString(),
        data: dataPengembalian,
        total: dataPengembalian.length
    })
}

export const getSingleDataPengembalian = async(req: Request, res: Response) => {
    const { id: idPengembalian } = req.params

    const dataPengembalian = await Pengembalian.findOne({_id: idPengembalian})
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pengembalian',
        timestamps: new Date(Date.now()).toString(),
        data: dataPengembalian
    })
}

export const terimaPengembalian = async(req: Request, res: Response) => {
    const {idPeminjaman, kondisiBuku} = req.body
    let totalDenda = 0;

    const dataPeminjaman = await Peminjaman.findOne({_id: idPeminjaman})
    

    // pecah data peminjaman
    const { peminjam, durasiPeminjaman, berakhirPada, statusPeminjaman, id } = dataPeminjaman!

    // menghitung jumlah hari keterlambatan
    const lamaKeterlambatan = hitungKeterlambatan(berakhirPada as Date)

    // cek apakah terlambat saat ini
    if (statusPeminjaman === 'Terlambat' || lamaKeterlambatan > 0) {
        // misal telat sehari denda 5k
        totalDenda = 1000 * lamaKeterlambatan

        await Pengembalian.create({
            idPeminjaman: idPeminjaman,
            idPengguna: peminjam,
            tanggalPengembalian: Date.now(),
            durasiKeterlambatan: lamaKeterlambatan,
            keadaanBuku: kondisiBuku,
            denda: totalDenda
        })

        /*
            KONTROLLER INI AKAN DI-REFACTOR

            UNTUK KONTROLLER INI, AKAN DIPISAH MENJADI 2 KONTROLLER.

            1. UNTUK BUAT DATA PENGEMBALIAN
            2. UNTUK TERIMA PENGEMBALIAN BUKU


            KONTROLLER PERTAMA UNTUK MENGHITUNG SEGALA PERHITUNGAN KETERLAMBATAN DLL
            KONTROLLER KEDUA UNTUK MENG-KONFIRMASI SEKALIGUS MENERIMA PENGEMBALIAN BUKU
        */
    } else {

    }

    // menghitung total hari keterlambatan

    // update data peminjaman - statusPeminjaman
    // tambah data pengembalian
    // update data buku - stok dan totalDipinjam
    // update data pengguna - total pinjaman


    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Pengembalian Berhasil Diproses',
        timestamps: new Date(Date.now()).toString()
    })
} 