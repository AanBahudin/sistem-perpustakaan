import { searchServices } from "../../services/searchServices"
import { SendOneDataResponse } from "../../utils/sendResponse"
import { Request,  Response } from "express"


export const searchController = async(req : Request, res: Response) => {

    const title = req.query.title
    const data = await searchServices(title)    

    SendOneDataResponse({
        res,
        message: 'Search results',
        data
    })
}