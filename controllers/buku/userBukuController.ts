import { Request, Response } from "express"
import { SendDataWithDurasiResponse, SendDataResponse } from "../../utils/sendResponse"
import { getSemuaBukuTersediaUntukUser, getSatuBukuTersediaUntukUser, katalogBukuUser } from "../../services/BukuServices/UserBukuseServices"
import { dataDurasiPeminjaman } from "../../services/durasiServices"
import { discoveryBukuServices } from "../../services/BukuServices/UserBukuseServices"
import { getOnePeminjamanUserByIdBook, getPeminjamanAktifByBukuId } from "../../services/peminjamanServices"

export const getAllBukuUser = async(req: Request, res: Response) => {
    const query = req.query
    const {page: currentPage} = req.query
    const {data: buku, totalPage} = await getSemuaBukuTersediaUntukUser({query})
    SendDataResponse({
        res,
        message: 'Data Buku',
        data: buku,
        total: totalPage,
        page: Number(currentPage)
    })
}

// SUDAH TESTING
export const getSingleBukuUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const {id} = req.params

    const buku = await getSatuBukuTersediaUntukUser(id)
    const isLoanExist = await getOnePeminjamanUserByIdBook({bookId: id, userId})

    SendDataWithDurasiResponse({
        res,
        message: 'Data Buku',
        data: {
            loan: isLoanExist || {},
            buku
        }
    })
}

export const getDashboardUserBook = async(req: Request, res: Response) => {
    const katalogData = await katalogBukuUser()

    SendDataResponse({
        res,
        message: 'success',
        data: {...katalogData}
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