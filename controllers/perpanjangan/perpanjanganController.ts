import { Request, Response } from "express";
import Perpanjangan from "../../model/Perpanjangan";
import { StatusCodes } from "http-status-codes";

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

    const dataPerpanjanganUser = await Perpanjangan.find({idPeminjaman: userId})

    res.status(StatusCodes.OK).json({
        status: StatusCodes,
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
        status: StatusCodes,
        message: 'Data Perpanjangan Dibatalkan',
        timestamps: new Date(Date.now()).toString(),
    })
}


// untuk pustakawan
export const getAllPerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}

export const getSinglePerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}

export const terimaPerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}