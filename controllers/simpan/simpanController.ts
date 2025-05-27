import { Response } from "express";
import { addOrDeleteServices, fetchOrCreateServices } from "../../services/simpanServices";
import { SendOneDataResponse } from "../../utils/sendResponse";

export const fetchOrCreate = async (req: Request | any, res: Response) => {
    const {userId} = req.user
    const data = await fetchOrCreateServices({userId})

    SendOneDataResponse({
        res,
        message: 'Data tersimpan',
        data
    })
}

export const addOrDelete = async (req: Request | any, res: Response) => {
    const {userId} = req.user
    const {bookId} = req.body

    await addOrDeleteServices({userId, bookId})
    const data = await fetchOrCreateServices({userId})

    SendOneDataResponse({
        res,
        message: 'Data tersimpan',
        data
    })
}