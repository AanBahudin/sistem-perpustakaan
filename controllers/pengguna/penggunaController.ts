import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Pengguna, { IPengguna } from "../../model/Pengguna";
import { getProfil, updateProfil, updatingPassword, updatingEmail } from "../../services/penggunaServices";

export const getProfile = async(req: any, res: Response) => {
    const { userId } = req.user

    const userData = await getProfil({userId})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data profil',
        timestamps: new Date(Date.now()),
        data: userData
    })
}

export const updateProfile = async(req: any | Request, res: Response) => {
    const { userId } = req.user

    const updatedProfile = await updateProfil({userId, dataUpdate: req.body})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Berhasil update profile',
        timestamps: new Date(Date.now()),
        data: updatedProfile
    })
}

export const updatePassword = async(req: any | Request, res: Response) => {
    const { userId } = req.user
    const { password: newPassword, oldPassword } = req.body

    const updatedUser = await updatingPassword({userId, newPassword, oldPassword})

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

    const updatedUser = await updatingEmail({newEmail: newEmail, userId})

    // respon berhasil dari API
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Silahkan cek email anda untuk melakukan verifikasi',
        timestamps: new Date(Date.now()).toString()
    })
}