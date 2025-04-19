import { BadRequestError, NotAuthenticated, NotFoundError } from '../errors/errorHandler'
import sendUpdateEmailVerification from '../helpers/sendUpdateEmailVerification'
import Pengguna from '../model/Pengguna'
import renderError from '../utils/renderError'
import { GetProfileParamsServiceType, UpdateEmailParamsServicesType, UpdatePasswordParamsServicesType, UpdateProfilParamsServicesType } from '../types/penggunaTypes'
import { comparePassword, hashPassword } from '../utils/passwordUtils'

// SUDAH DITESTING
export const getProfil = async({userId} : GetProfileParamsServiceType) => {
    const profil = await Pengguna.findOne({_id: userId}).select('-password')
    return profil
}

// SUDAH DITESTING
export const updateProfil = async({userId, dataUpdate} : UpdateProfilParamsServicesType) => {
    const updatedProfile = await Pengguna.findOneAndUpdate(
        {_id: userId},
        {...dataUpdate},
        {new: true, runValidators: true}
    ).select('-password')

    if (!updateProfil) {
        throw new NotFoundError('Profil tidak ditemukan')
    }

    return updatedProfile
}

// SUDAH DITESITNG
export const updatingPassword = async({userId, newPassword, oldPassword} : UpdatePasswordParamsServicesType) => {

    // memastikan password lama tidak sama dengan password baru
    if (newPassword === oldPassword) {
        throw new BadRequestError('Password baru tidak boleh sama dengan password lama')
    }

    // cari data pengguna terkait dan cek apakah data ada di database
    const pengguna = await Pengguna.findOne({_id: userId})
    if (!pengguna) {
        throw new NotFoundError('Pengguna tidak ditemukan')
    }

    // ambil password lama (sudah hash) untuk di cek apakah sama dengan password lama (yang dimasukan user)
    const {password: oldHashedPassword} = pengguna
    const isPasswordCorrect = await comparePassword(oldHashedPassword!, oldPassword);
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password yang dimasukan salah')
    }

    // hash password baru
    const hashedPassword = await hashPassword(newPassword)

    // update password lama ke password baru
    const updatedUser = await Pengguna.findOneAndUpdate(
        {_id: userId},
        {password: hashedPassword},
        {new: true, runValidators: true}
    )

    // kembalikan data terbaru
    return updatedUser
}

// SUDAH DITESTING
export const updatingEmail = async({userId, newEmail} : UpdateEmailParamsServicesType) => {
    // ambil data pengguna terkait dan lakukan pengecekkan apakah data ada didatabase
    const user = await Pengguna.findOne({_id: userId})
    if (!user) {
        throw new NotFoundError('Profil tidak ditemukan')
    }
    // ambil nama dan email dari user
    const { nama, email } = user

    // pengecekkan memastikan email
    if (user.email === newEmail) {
        throw new BadRequestError('Email baru tidak boleh sama dengan email lama')
    }

    try {
        // kirim email ke user
        await sendUpdateEmailVerification({
            userId: userId, 
            nama: nama as string, 
            oldEmail: email as string,
            newEmail: newEmail, 
        })
    } catch (error) {
        // error ketika mengirim email / generate token verifikasi
        const errorMsg = renderError(error)
        throw new BadRequestError(errorMsg)
    }
}