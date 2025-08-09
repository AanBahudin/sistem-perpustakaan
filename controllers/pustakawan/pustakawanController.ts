import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Pengguna from "../../model/Pengguna";
import Pustakawan from "../../model/Pustakawan";

import { getAllPengguna, getAllPenggunaDosen, getStatsServices, getAllPenggunaMahasiswa, getSinglePengguna, getAllPengajuanUser, getAllPengajuanPeminjamanUser, getSinglePengajuanPeminjamanUser } from "../../services/pustakawanServices";
import { SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

export const getStats = async(req: Request | any, res: Response) => {
    const data = await getStatsServices()
    SendDataResponse({
        res,
        message: 'stats data',
        data
    })
}

export const getAllUsers = async(req: Request, res: Response) => {
    const query = req.query
    const users = await getAllPengguna({query})

    SendDataResponse({
        res,
        message: 'Data Pengguna',
        data: users,
        total: users.pengguna.length,
        page: 1
    })
}

export const getAllDosenUser = async(req: Request, res: Response) => {
    const query = req.query
    const users = await getAllPenggunaDosen({query})

    SendDataResponse({
        res,
        message: 'Data Dosen',
        data: users,
        total: users.pengguna.length,
        page: 1
    })
}

export const getAllMahasiswaUser = async(req: Request, res: Response) => {
    const query = req.query
    const users = await getAllPenggunaMahasiswa({query})

    SendDataResponse({
        res,
        message: 'Data Dosen',
        data: users,
        total: users.pengguna.length,
        page: 1
    })
}

export const getSingleUser = async(req: Request, res: Response) => {

    const {id} = req.params
    const data = await getSinglePengguna({id})

    SendOneDataResponse({
        res,
        message: `Data Pengguna - ${data.pengguna?.nama}`,
        data
    })
}

export const getAllPengajuan = async(req: Request, res: Response) => {
    const data = await getAllPengajuanUser()
    
    SendOneDataResponse({
        res,
        message: 'Semua data pengajuan',
        data
    })
}

export const getAllPengajuanPeminjaman = async(req: Request, res: Response) => {
    const data = await getAllPengajuanPeminjamanUser()
    SendDataResponse({
        res,
        message: 'Data pengajuan peminjaman',
        data,
        total: data.length || 0
    })
}

export const getSinglePengajuanPeminjaman = async(req: Request, res: Response) => {
    const {id: peminjamanId} = req.params
    const data = await getSinglePengajuanPeminjamanUser({id: peminjamanId})
    SendOneDataResponse({
        res, 
        message: 'Data peminjaman',
        data
    })
}

export const getProfile = async(req: Request | any, res: Response) => {
    const {userId} = req.user

    const profile = await Pustakawan.findOne({_id: userId})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Profil',
        timestamps: new Date(Date.now()).toString(),
        data: profile
    })
}

