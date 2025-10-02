import { Request, Response } from "express"
import { SendDataWithDurasiResponse, SendDataResponse } from "../../utils/sendResponse"
import { getSemuaBukuTersediaUntukUser, getSatuBukuTersediaUntukUser } from "../../services/BukuServices/UserBukuseServices"
import { dataDurasiPeminjaman } from "../../services/durasiServices"
import { discoveryBukuServices } from "../../services/BukuServices/UserBukuseServices"

export const getAllBukuUser = async(req: Request, res: Response) => {
    const query = req.query
    const {buku, recommendation, totalPage, lastAdded} = await getSemuaBukuTersediaUntukUser({query})
    SendDataResponse({
        res,
        message: 'Data Buku',
        data: {
            buku,
            recommendation,
            lastAdded
        },
        total: totalPage,
        page: 1
    })
}

// SUDAH TESTING
export const getSingleBukuUser = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await getSatuBukuTersediaUntukUser(id)
    const durasiPeminjaman = await dataDurasiPeminjaman()

    SendDataWithDurasiResponse({
        res,
        message: 'Data Buku',
        data: buku,
        durasi: durasiPeminjaman,
    })
}

export const discoveryBuku = async(req: Request, res: Response) => {
    const {query} = req.query

    const data = await discoveryBukuServices({query})

    SendDataResponse({
        res,
        message: 'Data Buku',
        data,
        total: data.length,
        page: 1
    })    
}