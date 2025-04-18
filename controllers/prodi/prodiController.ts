import { Request, Response } from "express";
import { 
    createAdmin, 
    createNewPustakawan, 
    getAllPenggunaData, 
    getAllPustakawanData, 
    getAllRequestedPengguna, 
    getOnePenggunaData, 
    getOnePustakawanData, 
    getOneRequestedPengguna, 
    getProdiProfile, 
    verifyRegisteredAccount } from "../../services/prodiServices";
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

// controller untuk buat/tambah administrator
export const createAdministrator = async(req: any | Request, res: Response) => {
    const newAdmin = await createAdmin({
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
    })
    
    SendBasicResponse({
        res,
        message: 'Akun administrator berhasil dibuat'
    })
}

// controller untuk menambahkan akun pustakawan
export const createPustakawan = async(req : any | Request, res: Response) => {
    const {userId} = req.user

    const newPustakawan = await createNewPustakawan({
        adminId: userId,
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        no_hp: req.body.no_hp
    })

    SendBasicResponse({res, message: 'Proses pendaftaran berhasil, menunggu verifikasi akun'})
}

// controller untuk menampilkan informasi profil
export const getProfile = async(req: any | Request, res: Response) => {
    const {userId} = req.user

    const prodi = await getProdiProfile({prodiId: userId})

    SendOneDataResponse({
        res,
        message: 'Profil Program Studi',
        data: prodi.data

    })
}

// controller untuk mengambil data semua pustakawan
export const getAllPustakawan = async(req: any | Request, res: Response) => {
    const pustakawan = await getAllPustakawanData()

    SendDataResponse({
        res,
        message: 'Data Pustakawan',
        total: pustakawan.data.length,
        data: pustakawan.data,
        page: 1,
    })
}

// controller untuk mengambil data salah satu pustakawan
export const getSinglePustakawan = async(req: any | Request, res: Response) => {
    const {id} = req.params
    const pustakawan = await getOnePustakawanData({pustakawanId: id})

    SendOneDataResponse({
        res,
        message: 'Data Pustakawan',
        data: pustakawan.data
    })
}

// controller untuk mengambil data semua pengguna
export const getAllUsers = async(req: any | Request, res: Response) => {
    const getAllUsersData = await getAllPenggunaData()
    
    SendDataResponse({
        res,
        data: getAllUsersData.data,
        message: 'Data Pengguna',
        page: 1,
        total: getAllUsersData.data.length
    })
}

// controller untuk mengambil data salah satu pengguna
export const getSingleUser = async(req: any | Request, res: Response) => {
    const {id} = req.params

    const user = await getOnePenggunaData({penggunaId: id})

    SendOneDataResponse({
        res,
        message: 'Data Pengguna',
        data: user.data
    })
}

// controller untuk mengambil data permintaan pembuatan akun
export const getRequestedUser = async (req: any | Request, res: Response) => {
    const requestedUser = await getAllRequestedPengguna()

    SendDataResponse({
        res,
        message: 'Daftar permintaan pendaftaran',
        total: requestedUser.data.length,
        page: 1,
        data: requestedUser.data,
    })
}

// controller untuk mengambil data permintaan pembuatan akun
export const getSingleRequestedUser = async (req: any | Request, res: Response) => {
    const { id } = req.params

    const requestedUser = await getOneRequestedPengguna({penggunaId: id})

    SendOneDataResponse({
        res,
        message: 'Data Pengguna',
        data: requestedUser.data
    })
}

// controller untuk mengaktifkan / meng-verifikasi akun pengguna
export const verifiedUserAccount = async(req: Request, res: Response) => {
    const {id: userId} = req.params

    const verifyServices = await verifyRegisteredAccount({userId})

    SendOneDataResponse({
        res,
        message: 'Akun pengguna berhasil diaktfikan',
        data: verifyServices.data,
    })
}