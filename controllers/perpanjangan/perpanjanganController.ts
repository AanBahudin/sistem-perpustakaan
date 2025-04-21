import { Request, Response } from "express";
import Perpanjangan from "../../model/Perpanjangan";
import { StatusCodes } from "http-status-codes";
import Peminjaman from "../../model/Peminjaman";
import tambahHariKeTanggal from "../../utils/tambahHari";
import { acceptPerpanjangan, getOnePerpanjangan, getOnePerpanjanganUser, getSemuaPerpanjangan, getSemuaPerpanjanganUser, pembatalanPerpanjangan, tambahPerpanjangan, ubahPerpanjangan } from "../../services/perpanjanganServices";
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

// untuk pengguna

// BELUM DITESTING
export const pengajuanPerpanjangan = async(req: Request | any, res: Response) => {
    const {idPeminjaman, idBuku, durasi, alasan} = req.body
    const {data} = await tambahPerpanjangan({
        userId: req.user.userId,
        dataPerpanjangan: {alasan, durasi, idBuku, idPeminjaman}
    })

    SendOneDataResponse({
        res,
        message: 'Perpanjangan di-ajukkan',
        data,
        status: StatusCodes.CREATED
    })
}

// BELUM DITESTING
export const getAllPerpanjanganUser = async(req: Request | any, res: Response) => {
    const {data} = await getSemuaPerpanjangan({userId: req.user.userId})

    SendDataResponse({
        res,
        message: 'Data Perpanjangan',
        total: data.length,
        page: 1,
        data
    })
}

// BELUM DITESTING
export const getSinglePerpanjanganUser = async(req: Request | any, res: Response) => {
    const {data} = await getOnePerpanjangan({
        idPerpanjangan: req.params.id,
        userId: req.user.userId
    })

    SendOneDataResponse({
        res,
        message: 'Data Perpanjangan',
        data
    })
}

// BELUM DITESTING
export const editPerpanjanganUser = async(req: Request | any, res: Response) => {
    const {data} = await ubahPerpanjangan({
        userId: req.user.userId,
        idPerpanjangan: req.params.id,
        dataPerpanjangan: {
            alasan: req.body.alasan,
            durasi: req.body.durasi
        }
    })

    SendOneDataResponse({
        res,
        message: 'Data Perpanjangan Diperbaharui',
        data
    })
}

// BELUM DITESTING
export const batalPerpanjanganUser = async(req: Request | any, res: Response) => {
    await pembatalanPerpanjangan({
        userId: req.user.userId,
        idPerpanjangan: req.params
    })

    SendBasicResponse({
        res,
        message: 'Data Perpanjangan Dibatalkan',
    })
}


// untuk pustakawan

// BELUM DITESTING
export const getAllPerpanjangan = async(req: Request, res: Response) => {
    const {data} = await getSemuaPerpanjanganUser()

    SendDataResponse({
        res,
        message: 'Data Semua Perpanjangan',
        data,
        total: data.length,
        page: 1
    })
}

// BELUM DITESTING
export const getSinglePerpanjangan = async(req: Request, res: Response) => {
    const {data} = await getOnePerpanjanganUser({idPerpanjangan: req.params.id})

    SendOneDataResponse({
        res,
        message: 'Data Perpanjangan',
        data
    })
}

// BELUM DITESTING
export const terimaPerpanjangan = async(req: Request | any, res: Response) => {
    const {data, message} = await acceptPerpanjangan({
        userId: req.user.userId,
        dataPerpanjangan: {
            disetujui: req.body.disetujui,
            idPerpanjangan: req.body.idPerpanjangan
        }
    })


    SendOneDataResponse({
        res,
        message,
        data
    })
}