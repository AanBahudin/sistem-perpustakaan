import { Request, Response } from "express"
import {dataDurasiPeminjaman, hapusDataDurasi, tambahDurasiPeminjaman} from "../../services/durasiServices"
import { StatusCodes } from "http-status-codes"
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse"

// SUDAH DITESTING
export const tambahDurasi = async(req : Request, res: Response) => {
    const data = await tambahDurasiPeminjaman(req.body.durasi)

    SendOneDataResponse({
        res,
        status: StatusCodes.CREATED,
        message: 'Data Durasi Peminjaman Ditambahkan',
        data
    })
}

// SUDAH DITESTING
export const semuaDurasi = async(req : Request, res: Response) => {
    const data = await dataDurasiPeminjaman()

    SendDataResponse({
        res,
        data,
        message: 'Data Durasi Peminjaman',
        total: data.length
    })
}

// SUDAH DITESTING
export const hapusDurasi = async(req : Request, res: Response) => {
    const { id } = req.params

    await hapusDataDurasi(id)

    SendBasicResponse({
        res,
        message: 'Data Durasi Dihapus'
    })
}