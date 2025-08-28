import { Request, Response } from "express"
import { SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse"
import { 
    tambahDataBuku, 
    hapusDataBuku,
    editDataBuku,
    getSemuaBukuUntukPustakawan,
    getSemuaBukuHilang,
    getSemuaBukuDipinjam,
    getSemuaBukuDiperpanjang,
    getSemuaBukuDikembalikan,
    getSatuBukuUntukPustakawan} from "../../services/BukuServices/PustakawanBukuServices"
import { getAllBookYear } from "../../services/BukuServices/UtilsBukuServices"

export const getAllBukuDihilangkanPustakawan = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getSemuaBukuHilang({query})

    SendDataResponse({
        res,
        message: 'Data buku dihilangkan',
        data,
        total: data.bukuDihilangkan.length
    })
}

export const getSingleBukuPustakawan = async(req: Request | any, res: Response) => {
    const { id } = req.params

    const data = await getSatuBukuUntukPustakawan(id)

    SendOneDataResponse({
        res,
        message: `Data Buku ${data?.buku?.judul}`,
        data: data
    })
}

export const getAllBukuPustakawan = async(req: Request | any, res: Response) => {
    const query = req.query
    const books = await getSemuaBukuUntukPustakawan({query})

    SendDataResponse({
        res,
        message: 'Daftar Semua Buku',
        data: books,
        total: books.dataBuku.length,
        page: 1

    })
}

export const getAllBukuDipinjamPustakawan = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getSemuaBukuDipinjam({query})

    SendDataResponse({
        res,
        message: 'Data buku dipinjam',
        data,
        total: data.bukuDipinjam.length
    })
}

export const getAllBukuDiperpanjangPustakawan = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getSemuaBukuDiperpanjang({query})

    SendDataResponse({
        res, 
        message: 'Data buku diperpanjang',
        data,
        total: data.bukuDiperpanjang.length
    })
}

export const getAllBukuDikembalikanPustakawan = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getSemuaBukuDikembalikan({query})

    SendDataResponse({
        res, 
        message: 'Data buku dikembalikan',
        data, 
        total: data.bukuDikembalikan.length
    })
}



export const addBuku = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    req.body.createdBy = userId
    
    const buku = await tambahDataBuku(req.body, req.file)
    
    SendOneDataResponse({
        res,
        message: 'Buku ditambahkan',
        data: buku
    })
}

export const hapusBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await hapusDataBuku(id)

    SendOneDataResponse({
        res,
        message: `Buku ${buku?.judul} Dihapus`
    })
}

export const editBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await editDataBuku(id, req.body, req.file)

    SendOneDataResponse({
        res,
        message: `Buku ${buku?.judul} Diubah`,
        data: buku
    })
}

export const getAllBukuYearPustakawan = async(req: Request, res: Response) => {
    const data = await getAllBookYear()
    SendOneDataResponse({
        res,
        message: 'Data tahun',
        data
    })
}