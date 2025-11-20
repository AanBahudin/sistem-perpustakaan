import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { acceptPerpanjangan, getOnePerpanjangan, getOnePerpanjanganByPeminjamanId, getOnePerpanjanganUser, getSemuaPerpanjangan, getSemuaPerpanjanganUser, pembatalanPerpanjangan, tambahPerpanjangan, tolakPerpanjanganPustakawan, ubahPerpanjangan } from "../../services/perpanjanganServices";
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

// untuk pengguna

// SUDAH DITESTING
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
    const query = req.query
    const {data, totalPage} = await getSemuaPerpanjangan({userId: req.user.userId, query})
    SendDataResponse({
        res,
        message: 'Data Perpanjangan',
        total: data.length,
        page: query.page,
        data,
        totalPage
    })
}

// BELUM DITESTING
export const getSinglePerpanjanganUser = async(req: Request | any, res: Response) => {
    const data = await getOnePerpanjangan({
        idPerpanjangan: req.params.id,
        userId: req.user.userId
    })

    SendOneDataResponse({
        res,
        message: 'Data Perpanjangan',
        data
    })
}

export const getSinglePerpanjanganByPeminjamanIdUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const {id: idPeminjaman} = req.params

    const data = await getOnePerpanjanganByPeminjamanId({idPeminjaman, userId})

    SendOneDataResponse({
        res,
        message: 'Data perpanjangan',
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
        idPerpanjangan: req.params.id
    })

    SendBasicResponse({
        res,
        message: 'Data Perpanjangan Dibatalkan',
    })
}


// UNTUK PUSTAKAWAN
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

export const getSinglePerpanjangan = async(req: Request, res: Response) => {
    const {data} = await getOnePerpanjanganUser({idPerpanjangan: req.params.id})

    SendOneDataResponse({
        res,
        message: 'Data Perpanjangan',
        data
    })
}

// SUDAH DITESTING
export const terimaPerpanjangan = async(req: Request | any, res: Response) => {
    const {id: idPerpanjangan} = req.params
    const {userId} = req.user

    const {data, message} = await acceptPerpanjangan({
        userId,
        idPerpanjangan
    })

    SendOneDataResponse({
        res,
        message,
        data
    })
}

export const tolakPerpanjangan = async(req: Request | any, res: Response) => {
    const {id: idPerpanjangan} = req.params
    const {userId: idPustakawan} = req.user

    await tolakPerpanjanganPustakawan({idPerpanjangan, idPustakawan})

    SendBasicResponse({
        res, 
        message: 'Penolakan pengajuan peminjaman'
    })
}