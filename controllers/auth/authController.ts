import { Request, Response } from "express"
import bycrpt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import Pengguna from '../../model/Pengguna'
import { LoginInputBody, RegisterInputBody } from "../../types/authTypes"
import { BadRequestError, NotAuthenticated, NotAuthorized } from "../../errors/errorHandler"
import {comparePassword, hashPassword} from "../../utils/passwordUtils"
import jwt from 'jsonwebtoken'
import { cookieConfiguration } from "../../utils/tokenConfiguration"
import { NotFoundError } from "../../errors/errorHandler"
import Prodi from "../../model/Prodi"
import { generateToken, decodeToken } from "../../utils/jwt"
import sendVerficationEmail from "../../utils/emailVerification"
import Pustakawan from "../../model/Pustakawan"
import { ControllerParams } from "../../types/global"
import { loginProdi, loginPustakawan, loginUser, registerUser, verifyEmailUpdateUser, verifyPustakawanEmailAndAuthData, verifyRegisterUser } from "../../services/authServices"
import { SendBasicResponse, sendResponseWithPage, sendResponseWithToken } from "../../utils/sendResponse"
import renderError from "../../utils/renderError"


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

export const login = async(req : Request<unknown, unknown, LoginInputBody>, res: Response) => {

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


// controller untuk verifikasi email pengguna yang baru saja mendaftar atau registrasi
export const verifyEmail = async(req: Request, res:Response) => {
    const verifyRegister = await verifyRegisterUser({
        res,
        token: req.query.token as string,
    })


    sendResponseWithPage({
        res,
        pageName: 'accepted',
        pageData: {
            name: verifyRegister?.nama as string
        }
    })
}

// controller untuk verifikasi pergantian email pengguna
export const verifyEmailUpdate = async(req: any | Request, res: Response) => {

    const verifyEmailUpdateService = await verifyEmailUpdateUser({
        res,
        token: req.query.token as string
    })

    sendResponseWithPage({
        res,
        pageName: 'newEmailSuccessVerification'
    })
}

// controller untuk verifikasi akun pustakawan yang di-daftarkan prodi
export const verifyPustakawanEmail = async(req : Request, res : Response) => {
    const verifyPustakawan = await verifyPustakawanEmailAndAuthData({
        res,
        token: req.query.token as string
    })

    sendResponseWithPage({
        res,
        pageName: 'konfirmasiEmailPustakawan'
    })
}

// controller logout
export const logout = async(req: Request, res: Response) => {
    
    res.cookie('token', 'logout', {
        expires: new Date(Date.now() + 1000)
    }).status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Berhasil Logout' ,
        timestamps: new Date().toISOString()
    })
}