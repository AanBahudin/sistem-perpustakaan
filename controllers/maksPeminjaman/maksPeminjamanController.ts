import { Request, Response } from "express";
import { getMaksimalPeminjaman, updateMaksimalPeminjaman } from "../../services/maksimalPeminjamanServices";
import { SendBasicResponse, SendOneDataResponse } from "../../utils/sendResponse";

export const getMaksPinjaman = async(req: Request, res: Response) => {
    const data = await getMaksimalPeminjaman()

    SendOneDataResponse({
        res,
        message: 'success',
        data
    })
}

export const updateMaksPinjaman = async(req: Request, res: Response) => {
    const id = req.params.id
    await updateMaksimalPeminjaman({data: req.body, id})
    SendBasicResponse({
        res, message: 'success'
    })
}