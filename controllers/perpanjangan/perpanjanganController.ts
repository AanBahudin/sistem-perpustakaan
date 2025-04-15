import { Request, Response } from "express";
import Perpanjangan from "../../model/Perpanjangan";
import { StatusCodes } from "http-status-codes";
import Peminjaman from "../../model/Peminjaman";
import tambahHariKeTanggal from "../../utils/tambahHari";

// untuk pengguna
export const pengajuanPerpanjangan = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    req.body.idPengguna = userId

    const perpanjangan = await Perpanjangan.create(req.body)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Perpanjangan di-ajukkan',
        timestamps: new Date(Date.now()).toString(),
        data: perpanjangan
    })
}

export const getAllPerpanjanganUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user

    const dataPerpanjanganUser = await Perpanjangan.find({idPengguna: userId})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Permintaan Perpanjangan',
        timestamps: new Date(Date.now()).toString(),
        data: dataPerpanjanganUser,
        total: dataPerpanjanganUser.length
    })
}

export const getSinglePerpanjanganUser = async(req: Request, res: Response) => {
    const { id } = req.params

    const perpanjangan = await Perpanjangan.findOne({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Perpanjangan',
        timestamps: new Date(Date.now()).toString(),
        data: perpanjangan
    })
}

export const editPerpanjanganUser = async(req: Request, res: Response) => {
    const {id} = req.params

    const data = await Perpanjangan.findOneAndUpdate(
        {_id: id},
        req.body,
        {new: true, runValidators: true}
    )

    res.status(StatusCodes.OK).json({
        status: StatusCodes,
        message: 'Data Perpanjangan Diperbaharui',
        timestamps: new Date(Date.now()).toString(),
        data: data
    })
}

export const batalPerpanjanganUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const {id} = req.params

    await Perpanjangan.findOneAndDelete({_id: id, idPengguna: userId})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Perpanjangan Dibatalkan',
        timestamps: new Date(Date.now()).toString(),
    })
}


// untuk pustakawan
export const getAllPerpanjangan = async(req: Request, res: Response) => {
    const dataPerpanjangan = await Perpanjangan.find()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Semua Perpanjangan',
        timestamps: new Date(Date.now()).toString(),
        data: dataPerpanjangan,
        total: dataPerpanjangan.length
    })
}

export const getSinglePerpanjangan = async(req: Request, res: Response) => {
    const { id } = req.params

    const dataPerpanjangan = await Perpanjangan.findOne({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Perpanjangan',
        timestamps: new Date(Date.now()).toString(),
        data: dataPerpanjangan,
    })
}

export const terimaPerpanjangan = async(req: Request | any, res: Response) => {
    const {perpanjanganId, disetujui} = req.body
    let message: string | null;

    // ambil data pengajuan perpanjangan
    const dataPerpanjangan = await Perpanjangan.findOne({_id: perpanjanganId})

    if (disetujui) {
        message = 'Perpanjangan Pinjaman Diterima'
        // ambil data yang dibutuhkan
        const {durasi : durasiPerpanjangan, idPeminjaman} = dataPerpanjangan!

        // ambil data peminjaman
        const dataPeminjaman = await Peminjaman.findOne({_id: idPeminjaman})
        const {durasiPeminjaman, berakhirPada} = dataPeminjaman!

        // perpanjangan masa durasi.
        let penambahanDurasiPeminjaman = durasiPeminjaman + durasiPerpanjangan
        let penambahanTanggalPinjaman = tambahHariKeTanggal(berakhirPada as Date, durasiPerpanjangan)

        // update data perpanjangan (disetujui, disetujuiOleh)
        await Perpanjangan.findOneAndUpdate(
            {_id: perpanjanganId},
            {
                disetujui: 'Diterima',
                diprosesOleh: req.user.userId
            }
        )

        // update data pinjaman (durasiPinjaman, berakhirPada)
        await Peminjaman.findOneAndUpdate(
            {_id: idPeminjaman},
            {
                durasiPeminjaman: penambahanDurasiPeminjaman,
                berakhirPada: penambahanTanggalPinjaman
            },
            {new: true, runValidators: true}
        )
    } else {
        message = 'Perpanjangan Peminjaman Ditolak'
        await Perpanjangan.findOneAndUpdate(
            {_id: perpanjanganId},
            {
                diprosesOleh: req.user.userId,
                disetujui: 'Ditolak'
            }
        )
    }

    // kirim respon berhasil menerima pengajuan perpanjangan
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: message,
        timestamps: new Date(Date.now()).toString(),
    })
}