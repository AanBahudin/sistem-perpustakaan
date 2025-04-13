import { Request, Response } from "express"
import DurasiPeminjaman from "../../model/DurasiPeminjaman"
import dataDurasiPeminjaman from "../../services/getDuration"
import { StatusCodes } from "http-status-codes"


export const tambahDurasi = async(req : Request, res: Response) => {
    const data = await DurasiPeminjaman.create(req.body)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Durasi Peminjaman Ditambahkan',
        timestamps: new Date(Date.now()).toString(),
        data,
    })
}

export const semuaDurasi = async(req : Request, res: Response) => {
    const data = await dataDurasiPeminjaman()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Durasi Peminjaman',
        timestamps: new Date(Date.now()).toString(),
        data,
        total: data.length
    })
}

export const hapusDurasi = async(req : Request, res: Response) => {
    const { id } = req.params

    await DurasiPeminjaman.findOneAndDelete({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Durasi Dihapus',
        timestamps: new Date(Date.now()).toString(),
    })
}