import { Request, Response } from "express"
import Buku from "../../model/Buku"
import { SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse"
import { manualPaginationFn } from "../../utils/paginationFn"
import { NotFoundError } from "../../errors/errorHandler"
import { getSuggestedBook } from "../../services/BukuServices/UtilsBukuServices"

export const getLandingData = async(req: Request, res: Response) => {
    const KatalogDummy = await Buku.find().sort({totalDipinjam: -1}).limit(5).select('-createdBy -dihapus -featured -stok -sumberPengadaan -isMissing')

    SendDataResponse({
        res,
        message: 'success',
        data: {
            katalogReview: KatalogDummy
        }
    })
}

export const getLandingKatalogData = async(req: Request, res: Response) => {
    const query = req.query
    const currentPage = Number(req.query.page) || 1
    
    let copiedQuery = {...query}
    delete copiedQuery.page     // hapus query page agar tidak ikut dalam operasi mongoDB

    if (copiedQuery.query) {
        copiedQuery.judul = {$regex: copiedQuery.query, $options: 'i'}
        delete copiedQuery.query
    }

    const rawBuku = await Buku.find({dihapus: false, status: 'Tersedia', ...copiedQuery}).select('-createdBy -dihapus -featured -stok -sumberPengadaan -isMissing')
    const { data: dataBuku, totalPage } = manualPaginationFn({data: rawBuku, currentPage, limit: 18})

    SendDataResponse({
        res,
        message: 'Success',
        data: {
            totalPage,
            dataBuku
        }
    })
}

export const getSingleKatalogData = async(req: Request, res: Response) => {
    const {id: idBuku} = req.params

    const buku = await Buku.findOne({_id: idBuku}).select('-createdBy -dihapus -featured -stok -sumberPengadaan -isMissing')
    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    const relatedBooks = await getSuggestedBook({idBuku})

    SendOneDataResponse({
        res,
        message: 'success',
        data: {
            detailBuku: buku,
            relatedBooks
        }
    })
}