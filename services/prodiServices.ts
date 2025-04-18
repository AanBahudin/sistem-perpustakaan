import { BadRequestError, NotAuthenticated, NotAuthorized, NotFoundError } from "../errors/errorHandler"
import Pengguna from "../model/Pengguna"
import Prodi from "../model/Prodi"
import Pustakawan from "../model/Pustakawan"
import { hashPassword } from "../utils/passwordUtils"
import { CreateAdminParamsType, CreatePustakawanParamsType, GetOnePenggunaDataParamsType, GetOnePustakawanDataParamsType, GetOneRequestedPenggunaParamsType, GetProdiProfileParamsType, VerifyRegisteredAccountParamsType } from "../types/prodiTypes"
import sendVerifyEmailPustakawan from "../helpers/sendVerifyEmailPustakawan"
import renderError from "../utils/renderError"

// TESTING ROUTE INI
export const createAdmin = async({ nama, email, password } : CreateAdminParamsType) => {
    const existingAdmin = await Prodi.findOne({email})
    if (existingAdmin) throw new BadRequestError('Email administrator sudah digunakan')

    const hashedPassword = await hashPassword(password)

    await Prodi.create({
        nama,
        email,
        password: hashedPassword
    })
}

// TESTING ROUTE INI
export const createNewPustakawan = async({ nama, email, password, adminId, no_hp} : CreatePustakawanParamsType) => {
    const existingPustakawan = await Pustakawan.findOne({email})
    if (existingPustakawan) throw new BadRequestError('Akun Pustakawan sudah digunakan')

    // pengacakkan password
    const hashedPassword = hashPassword(password)

    // membuat data pustakawan
    const pustakawan = await Pustakawan.create({
        nama,
        email,
        password: hashedPassword,
        statusAkun: 'Pending',
        no_hp,
        createdBy: adminId
    })

    try {
        await sendVerifyEmailPustakawan({
            pustakawanId: pustakawan._id.toString(),
            nama: pustakawan.nama,
            email: pustakawan.email,
            password
        })
    } catch (error) {
        const errorMsg = renderError(error)
        throw new BadRequestError(errorMsg)
    }
}

// TESTING ROUTE INI
export const getProdiProfile = async({prodiId} : GetProdiProfileParamsType) => {
    const prodi = await Prodi.findOne({_id: prodiId}).select('-password')
    if (!prodi) throw new NotFoundError('Profil tidak ditemukan')

    return {data: prodi}
}

// SUDAH DITESTING
export const getAllPustakawanData = async() => {
    const pustakawan = await Pustakawan.find()

    return {data: pustakawan}
}

// SUDAH DITESTING
export const getOnePustakawanData = async({pustakawanId} : GetOnePustakawanDataParamsType) => {
    const pustakawan = await Pustakawan.findOne({_id: pustakawanId}).select('-password')
    if (!pustakawan) throw new NotFoundError('Data pustakawan tidak ditemukan')
    
    return {data: pustakawan}
}

// SUDAH DITESTING
export const getAllPenggunaData = async() => {
    const pengguna = await Pengguna.find({verifikasiEmail: true}).select('-password')

    return {data: pengguna}
}

// SUDAH DITESTING
export const getOnePenggunaData = async({penggunaId} : GetOnePenggunaDataParamsType) => {
    const pengguna = await Pengguna.findOne({_id: penggunaId}).select('-password')
    if (!pengguna) throw new NotFoundError('Data pengguna tidak ditemukan')

    return {data: pengguna}
}

// SUDAH DITESTING
export const getAllRequestedPengguna = async() => {
    const pengguna = await Pengguna.find({verifikasiEmail: true, verifikasiProdi: false, blocked: false}).select('-password')

    return {data: pengguna}
}

// SUDAH DITESTING
export const getOneRequestedPengguna = async({penggunaId} : GetOneRequestedPenggunaParamsType) => {
    const pengguna = await Pengguna.findOne({_id: penggunaId}).select('-password')
    if (!pengguna) throw new NotFoundError('Data pengguna tidak ditemukan')

    return {data: pengguna}
}

// SUDAH DITESTING
export const verifyRegisteredAccount = async({userId} : VerifyRegisteredAccountParamsType) => {
    const pengguna = await Pengguna.findOne({_id: userId})
    
    // pengecekkan apakah data pengguna ada dalam database
    if (!pengguna) throw new NotFoundError('Akun pengguna tidak dapat ditemukan')
    // pengecekkan status akun pengguna.
    if (pengguna.statusAkun !== 'Pending') throw new NotAuthenticated('Tidak dapat meng-verifikasi akun pengguna')
    // pengecekkan apakah pengguna belum meng-verifikasi emailnya
    if (!pengguna.verifikasiEmail) throw new NotAuthorized('Akun pengguna belum meng-verifikasi Email')
    // pengecekkan apakah akun pengguna sedang dalam kondisi terblokir
    if (pengguna.blocked) throw new NotAuthorized('Akun pengguna telah di-blokir')
    // pengecekkan apakah pengguna sudah meng-verifikasi akunnya sebelumnya
    if (pengguna.verifikasiProdi) throw new BadRequestError('Akun telah di-verifikasi')

    
    const updatedData = await Pengguna.findOneAndUpdate(
        {_id: pengguna._id},
        {statusAkun: 'Aktif', verifikasiProdi: true},
        {new: true, runValidators: true}
    )

    return {data: updatedData}
}