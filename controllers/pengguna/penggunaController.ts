import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Pengguna, { IPengguna } from "../../model/Pengguna";
import { BadRequestError } from "../../errors/errorHandler";
import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../../utils/passwordUtils";
import { generateToken } from "../../utils/jwt";
import sendVerficationEmail from "../../utils/emailVerification";


export const getProfile = async(req: any, res: Response) => {
    const { userId } = req.user

    const userData = await Pengguna.findOne({_id: userId}).select('-password')

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data profil',
        timestamps: new Date(Date.now()),
        data: userData
    })
}

export const updateProfile = async(req: any | Request, res: Response) => {
    const { userId } = req.user

    const updatedProfile = await Pengguna.findOneAndUpdate({_id: userId}, req.body, {new: true, runValidators: true}).select('-password');

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Berhasil update profile',
        timestamps: new Date(Date.now()),
        data: updatedProfile
    })
}

export const updatePassword = async(req: any | Request, res: Response) => {
    const { userId } = req.user
    const { password: newPassword } = req.body

    const user = await Pengguna.findOne({_id: userId})

    const isPasswordCorrect = await comparePassword(user?.password as string, newPassword)
    if (!isPasswordCorrect) {
        throw new BadRequestError('Password salah !')
    }

    const hashedPassword = await hashPassword(newPassword)
    
    const updatedUser = await Pengguna.findOneAndUpdate({_id: userId}, { password: hashedPassword }, {new: true, runValidators: true})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Berhasil update password',
        timestamps: new Date(Date.now()),
        data: updatedUser
    })
}

export const updateEmail = async (req: any | Request, res: Response) => {
    const { userId } = req.user;
    const { email : newEmail } = req.body

    /*
        ambil data nama dan email lama dari database
        nama - untuk headline link verifikasi
        email - untuk mengirim link verifikasi
    */ 
    const { nama, email } = await Pengguna.findOne({ _id: userId }) as IPengguna


    try {
        // generate token verifikasi
        const tokenVerifikasi = generateToken({ userId, newEmail, email })

        // generate link verifikasi
        const linkVerifikasi = `http://localhost:4000/api/v1/auth/verify/email?token=${tokenVerifikasi}`

        // kirim email ke user

        await sendVerficationEmail({
            templateName: 'konfirmasiUpdateEmail',
            subject: 'Konfirmasi Perubahan Akun Email',
            to: newEmail,
            emailData: {
                name: nama,
                verficationLink: linkVerifikasi
            }
        })
        console.log('pesan dikirim')

        // respon berhasil dari API
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'Silahkan cek email anda untuk melakukan verifikasi',
            timestamps: new Date(Date.now()).toString()
        })
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Something is wrong'
        throw new BadRequestError(errorMsg)
    }
}