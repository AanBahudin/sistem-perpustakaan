import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { BukuSchemaType } from "../../model/Buku";

import Pengguna from "../../model/Pengguna";
import Pustakawan from "../../model/Pustakawan";
import Buku from "../../model/Buku";
import Kategori from "../../model/Kategori";

import {dataDurasiPeminjaman} from '../../services/durasiServices'

export const getAllUsers = async(req: Request, res: Response) => {
    const users = await Pengguna.find({ verifikasiEmail: true, verifikasiProdi: true })

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pengguna',
        timestamps: new Date(Date.now()).toISOString(),
        data: users
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

export const getAllKategori = async(req: Request | any, res: Response) => {
    const kategori = await Kategori.find()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Daftar Kategori',
        timestamps: new Date(Date.now()).toString(),
        data: kategori,
        total: kategori.length
    })
}

export const createKategori = async(req: Request | any, res: Response) => {
    const dataKategori = req.body

    const kategori = await Kategori.create(dataKategori)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Kategori Dibuat',
        timestamps: new Date(Date.now()).toString(),
        data: kategori
    })
}

export const hapusKategori = async(req: Request | any, res: Response) => {
    const {id} = req.params

    await Kategori.findOneAndDelete({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Kategori Dihapus',
        timestamp: new Date(Date.now()).toString()
    })
}