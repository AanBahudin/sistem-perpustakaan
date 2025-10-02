import { BadRequestError, NotAuthorized, NotFoundError } from "../../errors/errorHandler"
import Pustakawan from "../../model/Pustakawan"
import { comparePassword, hashPassword } from "../../utils/passwordUtils"

export const pustakawanUpdatePasswword = async({data, pustakawanId} : {data: any, pustakawanId: string}) => {
    const {passwordLama, passwordBaru} = data
    
    // cari pustakawan
    const currentPustakawan = await Pustakawan.findOne({_id: pustakawanId})
    if (!currentPustakawan) throw new NotFoundError('Profil anda tidak ditemukan')
    
    // compare password lama dan yang baru
    const isPasswordCorrect = await comparePassword(currentPustakawan.password, passwordLama)
    if (!isPasswordCorrect) throw new NotAuthorized('Password yang dimasukan salah!')

    // jika password lama sudah benar
    const newPassword = await hashPassword(passwordBaru)

    // update ke password baru
    const updatedData = await Pustakawan.findOneAndUpdate({_id: pustakawanId}, {password: newPassword}, {new: true, runValidators: true}).select('nama')

    return updatedData
}

export const pustakawanUpdateEmail = async({data, pustakawanId} : {data: any, pustakawanId: string}) => {
    const { emailBaru, emailLama } = data

    // cari apakah email lama sama
    const currentPustakawan = await Pustakawan.findOne({_id: pustakawanId, email: emailLama})
    if (!currentPustakawan) throw new NotFoundError('Data email tidak ditemukan')
    
    // cek apakah email baru sudah digunakan atau sama dengan email lama
    const emailAlreadyUsed = await Pustakawan.find({email: emailBaru})
    if (emailAlreadyUsed.length > 0 || (currentPustakawan.email === emailBaru)) throw new BadRequestError('Email sudah digunakan')

    await Pustakawan.findOneAndUpdate(
        {_id: pustakawanId, email: emailLama},
        {email: emailBaru},
        {new: true, runValidators: true}
    )
}