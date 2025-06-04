import { Request, Response } from "express";
import { getProfil, updateProfil, updatingPassword, updatingEmail, photoUpdate, userStats } from "../../services/penggunaServices";
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

// SUDAH DITESTING
export const getProfile = async(req: any, res: Response) => {
    const { userId } = req.user
    const userData = await getProfil({userId})

    SendOneDataResponse({
        res,
        message: 'Data profil',
        data: userData
    })
}

export const getStats = async(req: any | Request, res: Response) => {
    const {userId} = req.user

    const data = await userStats({userId})

    SendOneDataResponse({
        res,
        message: 'Data stats',
        data
    })
}

// SUDAH DITESTING
export const updateProfile = async(req: any | Request, res: Response) => {
    const { userId } = req.user

    const updatedProfile = await updateProfil({userId, dataUpdate: req.body})

    SendOneDataResponse({
        res,
        message: 'Berhasil update profile',
        data: updatedProfile
    })
}

// BELUM TESTING
export const updatePhoto = async(req: any | Request, res: Response) => {
    const data = await photoUpdate(req, req)
    SendDataResponse({
        res,
        message: 'Foto berhasil diubah',
        data
    })
}

// SUDAH DITESTING
export const updatePassword = async(req: any | Request, res: Response) => {
    const { userId } = req.user
    const { newPassword, oldPassword } = req.body

    const updatedUser = await updatingPassword({userId, newPassword, oldPassword})

    SendOneDataResponse({
        res,
        message: 'Berhasil update password',
        data: updatedUser

    })
}

// SUDAH DITESTING
export const updateEmail = async (req: any | Request, res: Response) => {
    const { userId } = req.user;
    const { email : newEmail } = req.body

    const updatedUser = await updatingEmail({newEmail, userId})

    // respon berhasil dari API
    SendOneDataResponse({
        res,
        message: 'Silahkan cek email anda untuk melakukan verifikasi',
    })
}