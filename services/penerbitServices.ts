import Buku from "../model/Buku"

export const getAllPenerbitServices = async() => {
    const data = await Buku.distinct('penerbit')
    return data
}