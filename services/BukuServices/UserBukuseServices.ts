import Buku from "../../model/Buku";
import { recomendationBook, lastAddedBook } from "./UtilsBukuServices";
import { NotFoundError } from "../../errors/errorHandler";
import { manualPaginationFn, paginationFn } from "../../utils/paginationFn";

export const getSemuaBukuTersediaUntukUser = async({query} : {query: any}) => {

    const newQuery = {...query}
    delete newQuery.page

    let filters : Record<string, any>[] = []
     if (newQuery.search) {
        const searchRegex = { $regex: newQuery.search, $options: "i" };
        filters = [
            { penulis: searchRegex },
            { judul: searchRegex },
            { penerbit: searchRegex }
        ];
    }
    

    const rawBuku = await Buku.find({
        dihapus: false,
        status: 'Tersedia',
        ...(filters.length > 0 && { $or: filters })
    }).select('-dihapus').sort({createdAt: -1})
    
    const {data, totalPage} = manualPaginationFn({data: rawBuku, currentPage: query.page, limit: 18})

    return {data, totalPage}
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

export const katalogBukuUser = async() => {
    const rekomendasiBuku = await Buku.find({dihapus: false}).sort({totalDipinjam: 1}).limit(5)
    const bukuTerbaru = await Buku.find().sort({createdAt: -1}).limit(1)
    const buku = await Buku.find({dihapus: false}).sort({totalDipinjam: 1}).limit(18)

    return {
        rekomendasiBuku,
        bukuTerbaru,
        buku
    }
}