import { Request, Response } from "express";
import { getDenda, tambahDenda } from "../../services/dendaServices";
import { SendOneDataResponse } from "../../utils/sendResponse";

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
