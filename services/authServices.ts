import Pengguna from "../model/Pengguna"
import { LoginServicesParamsType, RegisterUserServicesParamsType, DataVerifyAccountTokenType, DataVerifyEmailUpdateType, DataAuthPustakawanType, VerifyServicesParamsType, TokenType } from "../types/authTypes"
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
    const hashedPassword = await hashPassword(dataRegister.password)

    const {nama, email} = dataRegister
    const user = await Pengguna.create({
        ...dataRegister,
        password: hashedPassword
    })

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
    if (!user) throw new NotFoundError('Akun tidak ditemukan')
    // pengecekkan status akun
    if (user.statusAkun === "Nonaktif") throw new NotAuthenticated('Akun telah dinonaktifkan')
    // pengecekkan apakah pengguna sudah verifikasi email
    if (!user.verifikasiEmail) throw new NotAuthenticated('Silahkan verifikasi email terlebih dahulu')
    // pengecekkan status blokir akun pengguna
    if (user.blocked) throw new NotAuthorized("Akun anda telah di blokir")
    
    // pengecekkan password 
    const isPasswordCorrect = await comparePassword(user.password as string, password)
    if (!isPasswordCorrect) throw new NotAuthenticated('Password yang dimasukan salah')

    // generate token
    const payload : TokenType = {
        userId: user._id.toString(), 
        role: user.role, 
        email: user.email
    }
    const token = generateToken(payload)

    return {token, user}
}

export const loginProdi = async({email, password} : LoginServicesParamsType) => {
    const prodi = await Prodi.findOne({email})

    // cek apakah data prodi ada
    if (!prodi) throw new NotFoundError('Data tidak ditemukan')
    // cek status akun prodi
    if (prodi.statusAkun !== 'Aktif') throw new NotAuthenticated('Akun tidak aktif')

    // cek password
    const isPasswordCorrect = await comparePassword(prodi.password as string, password)
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password salah')
    }

    // buat token login
    const payload : TokenType = {
        userId: prodi._id.toString(), 
        role: prodi.role,
        email: prodi.email
    }
    const token = generateToken(payload)

    return {token}
}

export const loginPustakawan = async({email, password} : LoginServicesParamsType) => {
    // cari akun berdasarkan email yang di-input
    const pustakawan = await Pustakawan.findOne({email})

    // pengecekkan akun
    if (!pustakawan) throw new NotFoundError('Data tidak ditemukan')
    // pengecekkan status akun
    if (pustakawan.statusAkun !== 'Aktif') throw new NotAuthorized('Akun di nonaktifkan')

    // pengecekkan password
    const isPasswordCorrect = await comparePassword(pustakawan.password, password);
    if (!isPasswordCorrect) throw new NotAuthenticated('Password salah')

    const payload : TokenType = {
        userId: pustakawan._id.toString(), 
        role: pustakawan.role,
        email: pustakawan.email
    };
    const token = generateToken(payload)

    return {token}
}

export const verifyRegisterUser = async({token, res} : VerifyServicesParamsType) => {
    // cek apakah token ada dan bertipe string
    if (!token || typeof token !== 'string') {
        res.render('rejected', {message: 'Terjadi kesalahan saat meng-verifikasi'})
        return null
    }

    try {
        // membuka isi dari token
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataVerifyAccountTokenType
        // mencari data pengguna berdasarkan userId dari token
        const user = await Pengguna.findOne({_id: dataToken.userId})

        if (!user)  {
            res.render('rejected', {message: 'Data Anda tidak dapat ditemukan'})
            return null
        }
        // cek apakah sudah menggunakan link verifikasi sebelumnya atau akunnya sudah di-verifikasi
        if (user.verifikasiEmail) {
            res.render('rejected', {message: 'Akun anda sudah di-verifikasi'})
            return null
        }

        // cari pengguna dengan id nya lalu update verifikasiEmail menjadi true
        await Pengguna.findOneAndUpdate({_id: dataToken.userId}, {verifikasiEmail: true}, {new: true, runValidators: true})

        // kembalikan data pengguna baru
        return {nama: user.nama}
    } catch (error) {
        const errorMsg = renderError(error)
        return res.render('rejected', {message: errorMsg})
    }
}

export const verifyEmailUpdateUser = async({token, res} : VerifyServicesParamsType) => {
    // cek apakah token tersedia atau bertipe string
    if (!token || typeof token !== 'string') {
        res.render('rejected', {message: 'Terjadi kesalahan saat meng-verifikasi'})
        return null
    }

    try {
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataVerifyEmailUpdateType
        
        // ambil data pengguna dari database
        const dataPengguna = await Pengguna.findOne({_id: dataToken.userId})
        if (!dataPengguna) {
            res.render('rejected', {message: 'Akun Anda tidak dapat ditemukan'})
            return null
        }

        // pengecekkan agar tidak terjadi verifikasi 2 kali
        if (dataPengguna.email === dataToken.newEmail) {
            res.render('rejected', {message: 'Akun Anda telah diverifikasi'})
            return null
        }

        // perbaharui email
        const updatedUser = await Pengguna.findOneAndUpdate({ _id: dataToken.userId }, { email: dataToken.newEmail }, { new: true, runValidators: true })
        return {data: updatedUser}

    } catch (error) {
        const erroMsg = renderError(error)
        return res.render('rejected', {message: erroMsg})
    }
}

export const verifyPustakawanEmailAndAuthData = async({token, res} : VerifyServicesParamsType) => {
     // cek apakah token tersedia atau bertipe string
     if (!token || typeof token !== 'string') {
        res.render('rejected', {message: 'Terjadi kesalahan saat meng-verifikasi'})
        return null
    }

    try {
        // verify token yang dikirim
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataAuthPustakawanType
        const { pustakawanId, email, password } = dataToken

        // ambil data pustakawan sebelum di-update
        const pustakawanExist = await Pustakawan.findOne({_id: pustakawanId, email})
        if (!pustakawanExist) {
            return res.render('rejected', {message: 'Akun Anda tidak dapat ditemukan'})
        }

        // cek apakah akun pustakawan sudah di-verifikasi untuk mencegah update berulang
        if (pustakawanExist.statusAkun !== 'Pending') {
            res.render('rejected', {messge: `Tidak dapat melakukan verifikasi, akun Anda dalam status ${pustakawanExist.statusAkun}`})
            return null
        }

        // update status akun pustakawan menjadi aktif
        const pustakawan = await Pustakawan.findOneAndUpdate(
            {_id: pustakawanId, email},
            {statusAkun: "Aktif"},
            {new: true, runValidators: true}
        )

        // cek apakah pustakawan diupdate / tidak ditemukan
        if (!pustakawan) {
            res.render('rejected', {message: 'Akun Anda tidak dapat ditemukan'})
            return null
        }

        // ambil data pustakawan yang sudah di-update
        const { nama } = pustakawan

        await sendVerifyAndAuthDataPustakawan({
            emailPustakawan: email, 
            namaPustakawan: nama as string, 
            passwordPustakawan: password
        })

    } catch (error) {
        const errorMsg = renderError(error)
        return res.render('rejected', {message: errorMsg})
    }
}