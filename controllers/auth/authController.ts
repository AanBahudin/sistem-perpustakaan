import { Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { loginProdi, loginPustakawan, loginUser, registerUser, verifyEmailUpdateUser, verifyPustakawanEmailAndAuthData, verifyRegisterUser } from "../../services/authServices"
import { SendBasicResponse, sendResponseWithPage, sendResponseWithToken } from "../../utils/sendResponse"


// controller unutuk registrasi pengguna/dosen - SUDAH DITESTING
export const register = async(req : Request, res: Response) => {

    const registerServices = await registerUser({
        email: req.body.email,
        nama: req.body.nama,
        idKampus: req.body.nim,
        password: req.body.password,
        role: req.body.role
    })

    // respons berhasil dari API
    SendBasicResponse({
        res,
        message: 'Proses pendaftaran berhasil',
    })

}

// controller untuk login pengguna - SUDAH DITESTING
export const login = async(req : Request, res: Response) => {

    const loginServices = await loginUser({
        email: req.body.email,
        password: req.body.password
    })

    sendResponseWithToken({
        res,
        message: 'Login berhasil',
        token: loginServices.token,
        tokenName: 'token'
    })
}

// controller unutk login program studi = SUDAH DITESTING
export const prodiLogin =  async(req: Request, res: Response) => {
    const prodiLoginServices = await loginProdi({
        email: req.body.email,
        password: req.body.password
    })

    sendResponseWithToken({
        res,
        message: 'Login berhasil',
        token: prodiLoginServices.token,
        tokenName: 'token'
    })
}

// controller untuk login pustakawan - SUDAH DITESTING
export const pustakawanLogin = async(req: Request, res: Response) => {
    const pustakawanRegisterServices = await loginPustakawan({
        email: req.body.email,
        password: req.body.password
    })

    sendResponseWithToken({
        res,
        message: 'Login berhasil',
        token: pustakawanRegisterServices.token,
        tokenName: 'token'
    })
}


// controller untuk verifikasi email pengguna yang baru saja mendaftar atau registrasi - SUDAH DITESTING
export const verifyEmail = async(req: Request, res:Response) => {
    const {data, message, success} = await verifyRegisterUser({
        res,
        token: req.query.token as string,
    })

    if (!success) return res.render('rejected', {message})

    sendResponseWithPage({
        res,
        pageName: 'accepted',
        pageData: {
            name: data as string
        }
    })
}

// controller untuk verifikasi pergantian email pengguna - SUDAH DITESTING
export const verifyEmailUpdate = async(req: any | Request, res: Response) => {

    const { success, message } = await verifyEmailUpdateUser({
        res,
        token: req.query.token as string
    })

    if (!success) return res.render('rejected', {message})

    sendResponseWithPage({
        res,
        pageName: 'newEmailSuccessVerification'
    })
}

// controller untuk verifikasi akun pustakawan yang di-daftarkan prodi - SUDAH DITESTING
export const verifyPustakawanEmail = async(req : Request, res : Response) => {
    const {success, message, data} = await verifyPustakawanEmailAndAuthData({
        res,
        token: req.query.token as string
    })

    if (!success) return res.render('rejected', {message})

    sendResponseWithPage({
        res,
        pageName: 'konfirmasiEmailPustakawan',
        pageData: {
            name: data
        }
    })
}

// controller logout = SUDAH DITESTING
export const logout = async(req: Request, res: Response) => {
    
    res.cookie('token', 'logout', {
        expires: new Date(Date.now() + 1000)
    }).status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Berhasil Logout' ,
        timestamps: new Date().toISOString()
    })
}