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

// SUDAH DITESTING
export const registerUser = async(dataRegister: RegisterUserServicesParamsType) => {

    const existingUser = await Pengguna.findOne({
        $or: [
            { email: dataRegister.email },
            { idKampus: dataRegister.idKampus }
          ]
    })

    // pengecekkan apakah email dan nim sudah digunakan
    if (existingUser) {
        if (existingUser.email === dataRegister.email) {
          throw new BadRequestError('Email sudah digunakan');
        }
        if (existingUser.idKampus === dataRegister.idKampus) {
          throw new BadRequestError('NIM / NIDN sudah digunakan');
        }
      }
    
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

// SUDAH DITESTING
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

// SUDAH DITESTING
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

// SUDAH DITESTING
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

// SUDAH DITESTING
export const verifyRegisterUser = async({token, res} : VerifyServicesParamsType) => {
    // cek apakah token ada dan bertipe string
    if (!token || typeof token !== 'string') return { success: false, message: 'Terjadi kesalahan saat meng-verifikasi', data: null }

    try {
        // membuka isi dari token
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataVerifyAccountTokenType
        // mencari data pengguna berdasarkan userId dari token
        const user = await Pengguna.findOne({_id: dataToken.userId})

        if (!user) return { success: false, message: 'Data Anda tidak dapat ditemukan', data: null }
        // cek apakah sudah menggunakan link verifikasi sebelumnya atau akunnya sudah di-verifikasi
        if (user.verifikasiEmail) return { success: false, message: 'Akun anda sudah di-verifikasi', data: null } 

        // cari pengguna dengan id nya lalu update verifikasiEmail menjadi true
        await Pengguna.findOneAndUpdate({_id: dataToken.userId}, {verifikasiEmail: true, statusAkun: 'Pending'}, {new: true, runValidators: true})

        // kembalikan data pengguna baru
        return {
            success: true,
            message: 'Berhasil diverifikasi',
            data: user.nama
        }
    } catch (error) {
        const errorMsg = renderError(error)
        return { success: false, message: errorMsg, data: null }
    }
}

// SUDAH TESTING - SET TOKEN BARU DENGAN EMAIL YANG BARU DIUPDATE
export const verifyEmailUpdateUser = async({token, res} : VerifyServicesParamsType) => {
    // cek apakah token tersedia atau bertipe string
    if (!token || typeof token !== 'string') return {success: false, message: 'Terjadi kesalahan saat meng-verifikasi', data: null}

    try {
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataVerifyEmailUpdateType
        
        // ambil data pengguna dari database
        const dataPengguna = await Pengguna.findOne({_id: dataToken.userId})
        if (!dataPengguna) return {success: false, message: 'Akun anda tidak dapat didtemukan', data: null}

        // pengecekkan agar tidak terjadi verifikasi 2 kali
        if (dataPengguna.email === dataToken.newEmail) return {success: false, message: 'Akun anda telah diverikasi', data: null}

        // perbaharui email
        const updatedUser = await Pengguna.findOneAndUpdate({ _id: dataToken.userId }, { email: dataToken.newEmail }, { new: true, runValidators: true })
        return {success: true, message: 'Berhasil diupdate', data: updatedUser?.nama}

    } catch (error) {
        const erroMsg = renderError(error)
        return {success: false, message: erroMsg, data: null}
    }
}

// SUDAH DITESTING
export const verifyPustakawanEmailAndAuthData = async({token, res} : VerifyServicesParamsType) => {
     // cek apakah token tersedia atau bertipe string
     if (!token || typeof token !== 'string') return {success: false, message: 'Terjadi kesalahan saat meng-verifikasi', data: null}

    try {
        // verify token yang dikirim
        const dataToken = jwt.verify(token, process.env.JWT_SECRET as string) as DataAuthPustakawanType
        const { pustakawanId, email, password } = dataToken

        // ambil data pustakawan sebelum di-update
        const pustakawanExist = await Pustakawan.findOne({_id: pustakawanId, email})
        if (!pustakawanExist) return {success: false, message: 'Akun Anda tidak dapat ditemukan', data: null}

        // cek apakah akun pustakawan sudah di-verifikasi untuk mencegah update berulang
        if (pustakawanExist.statusAkun !== 'Pending') {
            return {
                success: false, 
                message: `Tidak dapat melakukan verifikasi, Akun Anda dalam status ${pustakawanExist.statusAkun}`, 
                data: null
            }
        }

        // update status akun pustakawan menjadi aktif
        const pustakawan = await Pustakawan.findOneAndUpdate(
            {_id: pustakawanId, email},
            {statusAkun: "Aktif"},
            {new: true, runValidators: true}
        )

        // cek apakah pustakawan diupdate / tidak ditemukan
        if (!pustakawan) return {success: false, message: 'Akun anda tidak dapat ditemukan', data: null}

        // ambil data pustakawan yang sudah di-update
        const { nama } = pustakawan

        await sendVerifyAndAuthDataPustakawan({
            emailPustakawan: email, 
            namaPustakawan: nama as string, 
            passwordPustakawan: password
        })

        return {success: true, message: 'Berhasil diverifikasi', data: nama}

    } catch (error) {
        const errorMsg = renderError(error)
        return {success: false, message: errorMsg, data: null}
    }
}