import { addOrRemoveBuku, createOrFetchData, fetchSukaData } from "../../services/sukaServices"
import { SendBasicResponse, SendOneDataResponse } from "../../utils/sendResponse"
import { Response } from "express" 

export const createOrFetchSuka = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const dataSuka = await createOrFetchData({userId})

    SendOneDataResponse({
        res,
        message: 'Data suka',
        data: dataSuka
    })
}

export const addOrDeleteData = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const {bukuId} = req.body

    await addOrRemoveBuku({userId, bukuId})
    const dataSuka = await fetchSukaData({userId})
    

    SendOneDataResponse({
        res, 
        message: 'Data Suka',
        data: dataSuka
    })
}