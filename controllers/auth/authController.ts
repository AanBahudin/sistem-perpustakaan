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


export const login = async(req : Request<unknown, unknown, LoginInputBody>, res: Response) => {

    const user = (req as any).user
    const { password } = req.body

    /*
        pengecekkan apakah password yang dimasukan benar
    */
    const isPasswordCorrect = await comparePassword(user.password, password)
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password salah')
    }
    
    /*
        pengecekkan apakah akun pengguna dalam status ter-blokir atau tidak
        pengguna tidak bisa masuk jika akunnya dalam keadaan terblokir
    */
    if (user?.blocked) {
        throw new NotAuthorized('Akun anda telah diblokir')
    }

    /*
        mengatur isi token untuk verifikasi pengguna jika sudah login yang disimpan menggunakan cookie
    */
    const payload = {userId: user._id, role:user.role, email: user.email}
    const token = generateToken(payload)
    const oneDay = 1000 * 60 * 60 * 24;

    /*
        menyimpan cookie dari token dan mengirim response berhasil
    */
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    }).status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: user.verifikasiEmail ? 'Proses masuk berhasil' : 'Berhasil masuk, jangan lupa verifikasi akun anda!' ,
        timestamps: new Date().toISOString()
    })
}

export const prodiLogin =  async(req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await Prodi.findOne({email: email})
    if (!user || user.statusAkun !== 'Aktif') {
        throw new NotFoundError('Email tidak ditemukan')
    }

    const isPasswordCorrect = await comparePassword(user.password as string, password)
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password salah')
    }

    const payload = {userId: user._id, role: user.role, email: user.email}
    const token = generateToken(payload)

    res.cookie('token', token, cookieConfiguration)
        .status(StatusCodes.OK)
        .json({
            status: StatusCodes.OK,
            message: 'Berhasil Login',
            timestamps: new Date(Date.now()).toISOString()
        })
}

export const pustakawanLogin = async(req: Request, res: Response) => {
    const { email, password } = req.body

    const pustakawan = await Pustakawan.findOne({email: email})
    if (!pustakawan || pustakawan.statusAkun !== 'Aktif') {
        throw new NotFoundError('Email tidak ditemukan')
    }

    const isPasswordCorrect = await comparePassword(pustakawan.password as string, password)
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password salah')
    }

    const payload = {userId: pustakawan._id, role: pustakawan.role, email: pustakawan.email}
    const token = generateToken(payload)
    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, cookieConfiguration)
        .status(StatusCodes.OK)
        .json({
            status: StatusCodes.OK,
            message: 'Berhasil Login',
            timestamps: new Date(Date.now()).toISOString()
        })
}

export const register = async(req : Request<unknown, unknown, RegisterInputBody>, res: Response) => {

    // pengacakkan password
    req.body.password = await hashPassword(req.body.password)
    

    // akses hasil input nama dan email pengguna
    const { nama, email } = req.body

    // membuat user baru hasil validasi middleware
    const user = await Pengguna.create(req.body)

    try {
        // generate token authentikasi
        const tokenVerfikasi = generateToken({userId: user._id});

        // generate link verifikas
        const linkVerfikasi = `http://localhost:4000/api/v1/auth/verify/account?token=${tokenVerfikasi}`

        // mengirim email
        await sendVerficationEmail({
            templateName: 'mail',
            subject: 'Verifikasi Akun Anda',
            to: email, 
            emailData: {
                name: nama, 
                verficationLink: linkVerfikasi
            }
            })

        // respons berhasil dari API
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'Proses pendaftaran berhasil',
            timestamps: new Date().toISOString()
        })
    } catch (error) {
        const errormsg = error instanceof Error ? error.message : 'Something is wrong'
        throw new BadRequestError(errormsg)
    }
}

// controller untuk verifikasi email pengguna yang baru saja mendaftar atau registrasi
export const verifyEmail = async(req: Request, res:Response) => {
    // membaca token yang dikirim dari query
    const token = req.query.token

    // cek apakah token tersedia atau tidak
    if (!token || typeof token !== 'string') {
        return res.render('rejected')
    }

    // bongkar isi dari token untuk mengambil user id
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string}
        const user = await Pengguna.findOne({_id: decoded.userId})

        // cek apakah email user sudah diverfikasi atau belum
        if (user?.verifikasiEmail) {
            return res.render('rejected')
        }
    
        // cari pengguna dengan id nya lalu update verifikasiEmail menjadi true
        await Pengguna.updateOne({_id: decoded.userId}, {verifikasiEmail: true})
    
        // mengirim halaman verifikasi sukses
        return res.render('accepted', {
            name: user?.nama
        })
    } catch (error) {
        // jika terjadi kesalahan pada proses decode token
        return res.render('rejected')
    }
}

// controller untuk verifikasi pergantian email pengguna
export const verifyEmailUpdate = async(req: any | Request, res: Response) => {
    try {
        const { token } = req.query
        
        // cek apakah token tersedia atau tidak
        if (!token || typeof token !== 'string') {
            return res.render('rejected')
        }
        
        // bongkar isi dari token untuk mengambil userId, dan email baru
        const { userId, newEmail, email } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, newEmail: string, email: string }

        // pengecekkan agar tidak terjadi verifikasi 2 kali
        const dataPengguna = await Pengguna.findOne({_id: userId})
        if (dataPengguna?.email === newEmail) {
            return res.render('rejected')
        }

        // perbaharui email
        await Pengguna.findOneAndUpdate({ _id: userId }, { email: newEmail }, { new: true, runValidators: true })

        // kirim response berhasil
        res.render('newEmailSuccessVerification')
    } catch (error) {
        console.log(error)
        // jika terjadi kesalahan pada proses decode token
        return res.render('rejected')
    }
}

export const verifyPustakawanEmail = async(req : Request, res : Response) => {
    try {
        // mengambil data token dari query
        const { token } = req.query
    
        // pengecekkan type token dan apakah token disediakan atau tidak
        if (typeof token !== 'string' || !token) {
            return res.render('rejected')
        }

        // bongkar informasi dari jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, email: string, password: string }
        
        // cari user yang sesuai dengan userId yang dikirim ke database
        const user = await Pustakawan.findOne({_id: decoded.userId})
        // cek status akun, jika sudah aktif atau nonaktif. lempar halaman error 
        if (user?.statusAkun !== 'Pending') {
            return res.render('rejected')
        }

        // jika statusAkun = Pending, maka update statusAkun menjadi aktif
        await Pustakawan.findOneAndUpdate({_id: decoded.userId}, {statusAkun: 'Aktif'})

        // kirim email berisi data login ke email pustakawan
        try {
            await sendVerficationEmail({
                templateName: 'pustakawanAuthDataEmail',
                subject: 'Data Login Perpustakaan',
                to: decoded.email,
                emailData: {
                    name: user.nama as string,
                    email: user.email as string,
                    password: decoded.password
                }
            })
        } catch (error) {
            const errormsg = error instanceof Error ? error.message : 'Something is wrong'
            throw new BadRequestError(errormsg)
        }

        res.render('konfirmasiEmailPustakawan')
    } catch (error) {
        return res.render('rejected')
    }
}

export const logout = async(req: Request, res: Response) => {
    
    res.cookie('token', 'logout', {
        expires: new Date(Date.now() + 1000)
    }).status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Berhasil Logout' ,
        timestamps: new Date().toISOString()
    })
}