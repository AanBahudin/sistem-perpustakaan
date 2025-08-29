import { NotAuthorized, NotFoundError } from "../../errors/errorHandler"
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