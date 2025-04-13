import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import Pustakawan, { PustakawanInterface } from "../../model/Pustakawan";
import Prodi, { ProdiInterfaceModel } from "../../model/Prodi";
import { Request, Response } from "express";
import { ControllerParams } from "../../types/global";
import { hashPassword } from "../../utils/passwordUtils";
import { generateToken } from "../../utils/jwt";
import sendVerficationEmail from "../../utils/emailVerification";
import { BadRequestError } from "../../errors/errorHandler";
import Pengguna from "../../model/Pengguna";

export const createAdministrator = async(req: any | Request, res: Response) => {
    const bodyInput = req.body
    bodyInput.password = await hashPassword(bodyInput.password)

    await Prodi.create(bodyInput)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Akun administrator berhasil dibuat',
        timestamps: new Date(Date.now()).toISOString()
    })
}

export const createPustakawan = async(req : any | Request, res: Response) => {
    const {userId} = req.user

    // ambil input prodi
    const pustakawanData : PustakawanInterface = req.body as PustakawanInterface

    const plainPassword = pustakawanData.password
    // set status akun menjadi pending
    pustakawanData.statusAkun = 'Pending'
    pustakawanData.createdBy = userId

    // hash password pustakawan 
    pustakawanData.password = await hashPassword(pustakawanData.password)

    // buat data pustakawan
    const user = await Pustakawan.create(pustakawanData)

    try {

        // set data yang akan dikirm via token, dan link verifikasi
        const payload = {userId: user._id, email: user.email, password: plainPassword}
        const tokenVerfikasi = generateToken(payload)
        const linkVerfikasi = `http://localhost:4000/api/v1/auth/verify/pustakawan/account?token=${tokenVerfikasi}`

        // kirim email verifikasi ke akun calon pustakawan
        await sendVerficationEmail({
            subject: 'Verifikasi Email Pustakawan',
            templateName: 'konfirmasiEmailPustakawan',
            to: pustakawanData.email,
            emailData: {
                verficationLink: linkVerfikasi,
                name: pustakawanData.nama
            }
        })


        // kirim response berhasil jika email sudah terkirim
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'Proses pendaftaran berhasil, menunggu verifikasi akun',
            timestamps: new Date().toISOString()
        })

    } catch (error) {
        const errormsg = error instanceof Error ? error.message : 'Something is wrong'
        throw new BadRequestError(errormsg)
    }
}

// export const verifyPustakawanEmail = async({req, res} : ControllerParams) => {
//     // mengambil data token dari query
//     const { token } = req.query
//     console.log(token)

//     // pengecekkan type token dan apakah token disediakan atau tidak
//     if (typeof token !== 'string' || !token) {
//         return res.render('rejected')
//     }

//     try {
//         // bongkar informasi dari jwt
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, email: string, password: string }
        
//         // cari user yang sesuai dengan userId yang dikirim ke database
//         const user = await Pustakawan.findOne({_id: decoded.userId})
//         // cek status akun, jika sudah aktif atau nonaktif. lempar halaman error 
//         if (user?.statusAkun !== 'Pending') {
//             return res.render('rejected')
//         }

//         // jika statusAkun = Pending, maka update statusAkun menjadi aktif
//         await Pustakawan.findOneAndUpdate({_id: decoded.userId}, {statusAkun: 'Aktif'})

//         // kirim email berisi data login ke email pustakawan
//         try {
//             await sendVerficationEmail({
//                 templateName: 'pustakawanAuthDataEmail',
//                 subject: 'Data Login Perpustakaan',
//                 to: decoded.email,
//                 name: user.nama as string
//             })
//         } catch (error) {
//             const errormsg = error instanceof Error ? error.message : 'Something is wrong'
//             throw new BadRequestError(errormsg)
//         }

//         res.render('konfirmasiEmailPustakawan')
//     } catch (error) {
//         console.log('token kadaluarsa')
//         return res.render('rejected')
//     }
// }

export const getProfile = async(req: any | Request, res: Response) => {
    const {userId} = req.user
    const user = await Prodi.findOne({_id: userId}).select('-password')

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Profil admin',
        timestamps: new Date(Date.now()).toISOString(),
        data: user
    })
}

export const getAllPustakawan = async(req: any | Request, res: Response) => {
    const pustakawan = await Pustakawan.find()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pustakawan',
        timestamps: new Date(Date.now()).toISOString(),
        data: pustakawan,
        total: pustakawan.length
    })
}

export const getSinglePustakawan = async(req: any | Request, res: Response) => {
    const {id} = req.params

    const pustakawan = await Pustakawan.findOne({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Data Pustakawan - ${pustakawan?.nama}`,
        timestamps: new Date(Date.now()).toISOString(),
        data: pustakawan
    })
}

export const getAllUsers = async(req: any | Request, res: Response) => {
    const allUsers = await Pengguna.find({verifikasiEmail: true, verifikasiProdi: true})
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pengguna aktif',
        timestamps: new Date(Date.now()).toISOString(),
        data: allUsers,
        total: allUsers.length
    })
}

export const getSingleUser = async(req: any | Request, res: Response) => {
    const {id} = req.params

    const user = await Pengguna.findOne({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Data Pengguna - ${user?.nama}`,
        timestamps: new Date(Date.now()).toISOString(),
        data: user
    })
}

export const getRequestedUser = async (req: any | Request, res: Response) => {
    const requestedUser = await Pengguna.find({verifikasiEmail: true, verifikasiProdi: false, blocked: false})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Permintaan Daftar Pengguna',
        timestamps: new Date(Date.now()).toISOString(),
        data: requestedUser,
        total: requestedUser.length
    })
}

export const getSingleRequestedUser = async (req: any | Request, res: Response) => {
    const { id } = req.params

    const requestedUser = await Pengguna.findOne({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Permintaan Pendaftaran',
        timestamps: new Date(Date.now()).toISOString(),
        data: requestedUser
    })
}