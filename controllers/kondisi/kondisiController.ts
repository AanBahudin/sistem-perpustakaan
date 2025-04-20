import { Request, Response } from "express"
import { buatKondisi, editKondisi, getDataKondisi, getOneKondisi, hapusKondisi } from "../../services/kondisiServices"
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

export const createKondisi = async(req: Request | any, res: Response) => {
    const {kondisi, denda} = req.body
    const {userId} = req.user

    const {data} = await buatKondisi({denda, kondisi, userId})

    SendOneDataResponse({
        res,
        message: 'Berhasil menambahkan data kondisi buku',
        status: StatusCodes.CREATED,
        data
    })
}

export const getAllKondisi = async(req: Request, res: Response) => {
    const {data} = await getDataKondisi()

    SendDataResponse({
        res,
        message: 'Seluruh data kondisi',
        data,
        total: data.length
    })
}

export const getSingleKondisi = async(req: Request, res: Response) => {
    const {id: kondisiId} = req.params

    const {data} = await getOneKondisi({kondisiId})

    SendOneDataResponse({
        res,
        message: 'Data kondisi buku',
        data
    })
}

export const updateKondisi = async(req: Request, res: Response) => {
    const {id: kondisiId} = req.params
    const {denda, kondisi} = req.body

    const {data} = await editKondisi({denda, kondisi, kondisiId})

    SendOneDataResponse({
        res,
        message: 'Data berhasil diperbaharui',
        data
    })
}

export const deleteKondisi = async(req: Request, res: Response) => {
    const {id: kondisiId} = req.params
    
    await hapusKondisi({kondisiId})

    SendBasicResponse({
        res,
        message: 'Kondisi berhasil dihapus'
    })
}
