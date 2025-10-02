import { Request, Response } from "express";
import { getDenda, tambahDenda } from "../../services/dendaServices";
import { SendBasicResponse, SendOneDataResponse } from "../../utils/sendResponse";
import Denda from "../../model/Denda";
import { NotFoundError } from "../../errors/errorHandler";

export const createDendaKeterlambatan = async(req: Request, res: Response) => {
    const {denda} = req.body
    const dataDenda = await tambahDenda({denda})
    SendOneDataResponse({
        res, 
        message: 'Data denda ditambahkan',
        data: dataDenda?.denda
    })
}

export const getDendaKeterlambatan = async(req: Request, res: Response) => {
    const denda = await getDenda()

    SendOneDataResponse({
        res,
        message: 'Data denda',
        data: denda
    })
}

export const getDendaKeterlambatanWithId = async(req: Request, res: Response) => {
    const denda = await Denda.findOne()

    if (!denda) {
        throw new NotFoundError('Denda tidak ditemukan')
    }

    SendOneDataResponse({
        res,
        message: 'Data Denda',
        data: denda
    })
}

export const editDendaKeterlambatan = async(req: Request, res: Response) => {
    const data = await Denda.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )

    SendBasicResponse({
        res,
        message: 'Denda diperbaharui'
    })
}