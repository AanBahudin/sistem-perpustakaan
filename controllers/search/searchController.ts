import { searchServices, typedSearch } from "../../services/searchServices"
import { SendOneDataResponse } from "../../utils/sendResponse"
import { Request,  Response } from "express"


export const searchController = async(req : Request, res: Response) => {
    const searchQuery = req.query
    const data = await searchServices(searchQuery)    

    SendOneDataResponse({
        res,
        message: 'Search results',
        data
    })
}

export const typedSearchController = async(req: Request, res: Response) => {
    const judulQuery = req.query.title
    const data = await typedSearch(judulQuery)

    SendOneDataResponse({
        res,
        message: 'searched books',
        data
    })
}