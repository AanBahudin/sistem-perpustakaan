import { Request, Response } from "express"
import { getSuggestedBook } from "../../services/BukuServices/UtilsBukuServices"
import { SendDataResponse } from "../../utils/sendResponse"

export const getSuggestedBooks = async(req: Request, res: Response) => {
    const {id: idBuku} = req.params

    const data = await getSuggestedBook({idBuku})
    
    SendDataResponse({
        res,
        data,
        message: 'success',
        total: data.length
    })
}