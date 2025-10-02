import Buku from "../model/Buku"

export const getAllPenulisServices = async() => {
    const penulisList = await Buku.distinct('penulis')
    return penulisList
}