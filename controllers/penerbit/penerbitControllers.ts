import Buku from "../../model/Buku"
import { Response, Request } from "express"
import { SendOneDataResponse } from "../../utils/sendResponse"
import { getAllPenerbitServices } from "../../services/penerbitServices"

export const getAllPenerbit = async(req: Request, res: Response) => {
    const penerbitList = await getAllPenerbitServices()

    SendOneDataResponse({
        res,
        data: penerbitList,
        message: 'data penerbit'
    })
}