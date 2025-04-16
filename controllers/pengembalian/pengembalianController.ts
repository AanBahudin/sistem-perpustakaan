import { Request, Response } from "express";
import Pengembalian from "../../model/Pengembalian";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/errorHandler";
import Peminjaman from "../../model/Peminjaman";
import { hitungKeterlambatan } from "../../utils/selisihHari";
import Buku from "../../model/Buku";
import Pengguna from "../../model/Pengguna";

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

export const buatDataPengembalian = async(req: Request, res: Response) => {
    const {idPeminjaman, kondisiBuku, statusPengembalian} = req.body

    const dataPeminjaman = await Peminjaman.findOne({_id: idPeminjaman})
    // pecah data peminjaman
    const { peminjam, berakhirPada, statusPeminjaman, buku, dataPengembalian: idPengembalianPeminjaman } = dataPeminjaman!

    // cek status peminjaman agar dapat diproses
    const statusDiizinkan = ['Dipinjam', 'Terlambat']
    if (!statusDiizinkan.includes(statusPeminjaman)) {
        throw new BadRequestError('Tidak dapat melakukan pengembalian')
    }

    // menghitung jumlah hari keterlambatan
    const lamaKeterlambatan = hitungKeterlambatan(berakhirPada as Date)
    // misal telat sehari denda 5k
    let totalDendaKterlambatan = 1000 * lamaKeterlambatan  // nanti dibuatkan database khusus untuk mengatur nominal lama terlambat

    /*
        pengecekkan apakah data peminjaman sudah mempunyai data pengembalian
    */

    const isDataPengembalianExist = await Pengembalian.findOne({_id: idPengembalianPeminjaman, idPeminjaman, idPengguna: peminjam})
    if (isDataPengembalianExist) {
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'Data pengembalian ditemukan',
            timestamps: new Date(Date.now()).toString(),
            data: isDataPengembalianExist
        })
        return
    }


    const dataPengembalian = await Pengembalian.create({
        idPeminjaman: idPeminjaman,
        idPengguna: peminjam,
        idBuku: buku,
        durasiKeterlambatan: lamaKeterlambatan,
        statusPengembalian: statusPengembalian,
        keadaanBuku: kondisiBuku,
        dendaKeterlambatan: totalDendaKterlambatan,
        dendaFisik: 0 // nanti dibuatkan database khusus untuk nominal denda fisik
    })

    // update data peminjaman dengan memasukan id peminjaman
    await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman, peminjam},
        {dataPengembalian: dataPengembalian?._id},
        {new: true, runValidators: true}
    )

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pengembalian dibuat',
        timestamps: new Date(Date.now()).toString(),
        data: dataPengembalian
    })
}

export const terimaDataPengembalian = async(req: Request | any, res: Response) => {
    // id dari params
    const {id: idPengembalian} = req.params

    // ambil data pengembalian
    const dataPengembalian = await Pengembalian.findOne({_id: idPengembalian, $or: [
        {statusPengembalian: 'Dihilangkan'},
        {statusPengembalian: 'Pending'}
    ]})

    // cek data pengembalian
    if (!dataPengembalian) {
        throw new NotFoundError('Data pengembalian tidak ditemukan')
    }

    // pecah data pengembalian
    const { idPeminjaman, idPengguna, idBuku, _id: pengembalianId } = dataPengembalian


    // update data pengembalian
    const updatedDataPengembalian = await Pengembalian.findOneAndUpdate(
        {_id: pengembalianId},
        {
            statusPembayaran: 'Dibayar',
            statusPengembalian: dataPengembalian.statusPengembalian === 'Pending' ? 'Dikembalikan' : 'Dihilangkan',
            tanggalPengembalian: Date.now(),
            diprosesOleh: req.user.userId
        },
        {new: true, runValidators: true}
    )

    // update data peminjaman - statusPeminjaman
    await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman, peminjam: idPengguna, buku: idBuku},
        {
            statusPeminjaman: 'Dikembalikan'
        },
        {new: true, runValidators: true}
    )
    // update data buku - stok dan totalDipinjam
    await Buku.findOneAndUpdate(
        {_id: idBuku},
        {$inc: {stok: 1, totalDipinjam: -1}},
        {new: true, runValidators: true}
    )
    // update data pengguna - total pinjaman
    await Pengguna.findOneAndUpdate(
        {_id: idPengguna},
        {$inc: {jumlah_pinjaman: -1}},
        {new: true, runValidators: true}
    )

    
    // kirim response
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Pengembalian diterima',
        timestamps: new Date(Date.now()).toString(),
        data: updatedDataPengembalian
    })
}

export const editDataPengembalian = async(req: Request | any, res: Response) => {
    const {id: idPengembalian} = req.params

    // tentukan field yang dapat diedit
    const {  } = req.body

    const dataPengembalian = await Pengembalian.findOne({
        _id: idPengembalian, 
        statusPembayaran: 'Belum Bayar'
    })
    if (!dataPengembalian) {
        throw new NotFoundError('Data pengembalian tidak ditemukan')
    }
}