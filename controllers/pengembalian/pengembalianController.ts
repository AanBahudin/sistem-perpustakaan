import { Request, Response } from "express";
import Pengembalian from "../../model/Pengembalian";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/errorHandler";

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
}