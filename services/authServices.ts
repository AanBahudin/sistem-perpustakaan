import Pengguna from "../model/Pengguna"
import { LoginServicesParamsType, RegisterUserServicesParamsType, DataVerifyAccountTokenType, DataVerifyEmailUpdateType, DataAuthPustakawanType, VerifyServicesParamsType } from "../types/authTypes"
import { comparePassword, hashPassword } from "../utils/passwordUtils"
import sendRegisterEmailVerification from "../helpers/sendRegisterEmailVerification"
import renderError from "../utils/renderError"
import { BadRequestError, NotAuthenticated, NotAuthorized, NotFoundError } from "../errors/errorHandler"
import Prodi from "../model/Prodi"
import jwt from 'jsonwebtoken'
import { generateToken } from "../utils/jwt"
import Pustakawan from "../model/Pustakawan"
import sendVerifyAndAuthDataPustakawan from "../helpers/sendVerifyAndAuthDataPustakawan"

export const registerUser = async(dataRegister: RegisterUserServicesParamsType) => {
    // pengacakkan password
    dataRegister.password = await hashPassword(dataRegister.password)

    const {nama, email} = dataRegister
    const user = await Pengguna.create(dataRegister)

    try {
        await sendRegisterEmailVerification({email, nama, userId: user._id.toString()})
    } catch (error) {
        const errorMsg = renderError(error)
        throw new BadRequestError(errorMsg)
    }
}

export const loginUser = async({email, password} : LoginServicesParamsType) => {
    // mencari data user
    const user = await Pengguna.findOne({email})
    // pengecekkan data user dan status akun user
    if (!user || user.statusAkun === "Nonaktif" || !user.verifikasiEmail) {
        throw new NotFoundError('Akun tidak ditemukan')
    }

    // pengecekkan status blokir akun pengguna
    if (user.blocked) {
        throw new NotAuthorized("Akun anda telah di blokir")
    }

    // pecah data pengguna
    const { _id: idPengguna, email: emailPengguna, role, password: hashPassword } = user
    
    // pengecekkan password 
    const isPasswordCorrect = await comparePassword(hashPassword as string, password)
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password yang dimasukan salah')
    }

    // generate token
    const payload = {userId: idPengguna, role, email: emailPengguna}
    const token = generateToken(payload)

    return {token}
}

export const loginProdi = async({email, password} : LoginServicesParamsType) => {
    const prodi = await Prodi.findOne({email})
    if (!prodi || prodi.statusAkun !== 'Aktif') {
        throw new NotFoundError('Akun tidak ditemukan')
    }

    // pecah data prodi
    const { password: hashPassword, _id: prodiId, role, email: emailProdi } = prodi

    // cek password
    const isPasswordCorrect = await comparePassword(hashPassword as string, password)
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password salah')
    }

    // buat token login
    const paylaod = {userId: prodiId, role, emailProdi}
    const token = generateToken(paylaod)

    return {token}
}

export const loginPustakawan = async({email, password} : LoginServicesParamsType) => {
    // cari akun berdasarkan email yang di-input
    const pustakawan = await Pustakawan.findOne({email})

    // pengecekkan akun dan status akun pustakawan
    if (!pustakawan || pustakawan.statusAkun !== 'Aktif') {
        throw new NotFoundError('Akun tidak ditemukan')
    }

    // pecah data pustakawan
    const { password: hashPassword, _id: pustakawanId, email: emailPustakawan, role } = pustakawan!

    // pengecekkan password
    const isPasswordCorrect = await comparePassword(hashPassword as string, password);
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password salah')
    }

    const payload = {userId: pustakawanId, role, emailPustakawan};
    const token = generateToken(payload)

    return {token}
}

export const verifyRegisterEmail = async({token, res} : VerifyServicesParamsType) => {
    // cek apakah token ada dan bertipe string
    if (!token || typeof token !== 'string') {
        return res.render('rejected')
    }

    try {
        // membuka isi dari token
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataVerifyAccountTokenType
        // mencari data pengguna berdasarkan userId dari token
        const user = await Pengguna.findOne({_id: dataToken.userId})

        // cek apakah sudah menggunakan link verifikasi sebelumnya atau akunnya sudah di-verifikasi
        if (user?.verifikasiEmail) {
            return res.render('rejected')
        }

        // cari pengguna dengan id nya lalu update verifikasiEmail menjadi true
        const updateUser = await Pengguna.findOneAndUpdate({_id: dataToken.userId}, {verifikasiEmail: true}, {new: true, runValidators: true})

        // kembalikan data pengguna baru
        return {user: updateUser}
    } catch (error) {
        return res.render('rejected')
    }
}

export const verifyEmailUpdate = async({token, res} : VerifyServicesParamsType) => {
    // cek apakah token tersedia atau bertipe string
    if (!token || typeof token !== 'string') {
        return res.render('rejected')
    }

    try {
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataVerifyEmailUpdateType
        
        // ambil data pengguna dari database
        const dataPengguna = await Pengguna.findOne({_id: dataToken.userId})
        if (!dataPengguna) {
            return res.render('rejected')
        }

        // pengecekkan agar tidak terjadi verifikasi 2 kali
        if (dataPengguna.email === dataToken.newEmail) {
            return res.render('rejected')
        }

        // perbaharui email
        const updatedUser = await Pengguna.findOneAndUpdate({ _id: dataToken.userId }, { email: dataToken.newEmail }, { new: true, runValidators: true })
        return {data: updatedUser   }

    } catch (error) {
        return res.render('rejected')
    }
}

export const verifyPustakawanEmailAndAuthData = async({token, res} : VerifyServicesParamsType) => {
     // cek apakah token tersedia atau bertipe string
     if (!token || typeof token !== 'string') {
        return res.render('rejected')
    }

    try {
        // verify token yang dikirim
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataAuthPustakawanType
        const { pustakawanId, email, password } = dataToken

        // ambil data pustakawan sebelum di-update
        const pustakawanExist = await Pustakawan.findOne({_id: pustakawanId, email})
        if (!pustakawanExist) {
            return res.render('rejected')
        }

        // cek apakah akun pustakawan sudah di-verifikasi untuk mencegah update berulang
        if (pustakawanExist.statusAkun !== 'Pending') {
            return res.render('rejected')
        }

        // update status akun pustakawan menjadi aktif
        const pustakawan = await Pustakawan.findOneAndUpdate(
            {_id: pustakawanId, email},
            {statusAkun: "Aktif"},
            {new: true, runValidators: true}
        )

        // cek apakah pustakawan diupdate / tidak ditemukan
        if (!pustakawan) {
            return res.render('rejected')
        }

        // ambil data pustakawan yang sudah di-update
        const { nama } = pustakawan

        await sendVerifyAndAuthDataPustakawan({
            emailPustakawan: email, 
            namaPustakawan: nama as string, 
            passwordPustakawan: password
        })

    } catch (error) {
        return res.render('rejected')
    }
}