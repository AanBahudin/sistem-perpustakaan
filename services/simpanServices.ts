import mongoose, { Mongoose } from "mongoose"
import { NotFoundError } from "../errors/errorHandler"
import Buku from "../model/Buku"
import Simpan from "../model/Simpan"

export const fetchOrCreateServices = async({userId} : {userId: string}) => {
    const isSimpananExist = await Simpan.findOne({userId})
    if (!isSimpananExist) {
        const simpanan = await createTersimpan({userId})
        return simpanan
    } else {
        const simpanan = await fetchTersimpan({userId})
        return simpanan
    }
}

export const addOrDeleteServices = async({userId, bookId} : {userId: string, bookId: string}) => {
    const simpanan = await Simpan.findOne({userId})

    if (!simpanan) {
        await createTersimpan({userId})
        await addSimpanan({userId, bookId})
    } else {
        const savedBooks : string[] = simpanan.bukuDisimpan.map(item => {
            const bookId = item.buku!
            return bookId.toString()
        })
        const isAlreadySaved : boolean= savedBooks.includes(bookId)

        if (isAlreadySaved) {
            const data = await removeSimpanan({userId, bookId})
            return data
        } else {
            const data = await addSimpanan({userId, bookId})
            return data
        }
    }
}

// services terpisah

const fetchTersimpan = async({userId} : {userId: string}) => {
    const tersimpan = await Simpan.find({userId})
        .select('bukuDisimpan')
        .populate({
            path: 'bukuDisimpan.buku',
            select: '-dihapus -createdBy -totalDihilangkan'
        })
    return tersimpan
}

const createTersimpan = async({userId} : {userId: string}) => {
    const tersimpan = await Simpan.create({userId})
    return tersimpan
}

const addSimpanan = async({userId, bookId} : {userId: string, bookId: string}) => {
    const buku = await Buku.findOne({_id: bookId})
    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    const tersimpan = await Simpan.findOneAndUpdate(
        {userId},
        {$addToSet: {bukuDisimpan: {judulBuku: buku.judul, buku: bookId}}}
    )

    await Buku.findOneAndUpdate({_id: bookId}, {
        $inc: {totalDisimpan: 1},

    })
    
    return tersimpan
}

const removeSimpanan = async({userId, bookId} : {userId: string, bookId: string}) => {
    const removeBuku = await Simpan.findOneAndUpdate(
            { userId },
            {$pull: {bukuDisimpan: {
                buku: new mongoose.Types.ObjectId(bookId)
            }}},
            { new: true, runValidators: true }
    )

    await Buku.findOneAndUpdate({_id: bookId}, {
        $inc: {totalDisimpan: -1}
    })
    return removeBuku
}