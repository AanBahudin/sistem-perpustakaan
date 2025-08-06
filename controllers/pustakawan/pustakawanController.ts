import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Pengguna from "../../model/Pengguna";
import Pustakawan from "../../model/Pustakawan";

import { getAllPengguna, getAllPenggunaDosen, getStatsServices, getAllPenggunaMahasiswa } from "../../services/pustakawanServices";
import { SendDataResponse } from "../../utils/sendResponse";

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
    const user = await Pengguna.findOne({_id: id})
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Data Pengguna - ${user?.nama}`,
        timestamps: new Date(Date.now()).toISOString(),
        data: user
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

