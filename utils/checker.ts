import mongoose from "mongoose";
import { BadRequestError } from "../errors/errorHandler";
import Peminjaman from "../model/Peminjaman";

export const isValidMongooseId = (objectId: string) : Boolean => {
    const isValidId = mongoose.Types.ObjectId.isValid(objectId)

    if (!isValidId) {
        throw new BadRequestError('Id tidak valid')
    }

    return isValidId
}

export const mencegahBukuDipinjamBerulang = async(idBuku: string, idPengguna: string) => {
    const statusBlokir = ['Dipinjam', 'Diajukan', 'Terlambat']
    const peminjaman = await Peminjaman.findOne({
        peminjam: idPengguna,
        buku: idBuku,
        statusPeminjaman: {$in: statusBlokir}
    })

    console.log(peminjaman);
    
    return peminjaman
}

export const mencegahBukuDiterimaBerulang = async(idBuku: string, idPengguna: string) => {
    const statusBlokir = ['Dipinjam', 'Terlambat']
    const peminjaman = await Peminjaman.findOne({
        peminjam: idPengguna,
        buku: idBuku,
        statusPeminjaman: {$in: statusBlokir}
    })

    console.log(peminjaman);
    
    return peminjaman
}