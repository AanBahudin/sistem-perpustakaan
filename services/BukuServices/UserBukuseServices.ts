import Buku from "../../model/Buku";
import { recomendationBook, lastAddedBook } from "./UtilsBukuServices";
import { NotFoundError } from "../../errors/errorHandler";

export const getSemuaBukuTersediaUntukUser = async({query} : {query: any}) => {

    let filters : Record<string, any>[] = []
     if (query.search) {
        const searchRegex = { $regex: query.search, $options: "i" };
        filters = [
            { penulis: searchRegex },
            { judul: searchRegex },
            { penerbit: searchRegex }
        ];
    }

    const buku = await Buku.find({
        dihapus: false,
        status: 'Tersedia',
        ...(filters.length > 0 && { $or: filters })
    }).select('-dihapus').sort({createdAt: -1})


    const recommendation = await recomendationBook()
    const lastAdded = await lastAddedBook()

    // for testing purposed
    const totalPage = 1

    return {buku, recommendation, totalPage, lastAdded}
}

export const discoveryBukuServices = async({query} : {query: any}) => {

    if (typeof query === undefined) {
        return []
    }
    
    if (query === 'rekomendasi') {
        const data = await Buku.find().sort({totalDipinjam: -1})
        return data
    }

    const data = await Buku.find({
        kategori: {
            $in: query
        }
    })

    return data
}

export const getSatuBukuTersediaUntukUser = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku, dihapus: false, status: 'Tersedia'})
        .select('-dihapus')
        .sort({bukuDipinjam: -1})

    if (!buku) throw new NotFoundError('Data buku tidak ditemukan')
    return buku
}