import { Request, Response } from "express"
import {dataDurasiPeminjaman} from '../../services/durasiServices'
import { SendDataResponse, SendDataWithDurasiResponse, SendOneDataResponse } from "../../utils/sendResponse"
import { editDataBuku, getSatuBukuTersediaUntukUser, getSatuBukuUntukPustakawan, getSemuaBukuTersediaUntukUser, getSemuaBukuUntukPustakawan, hapusDataBuku, tambahDataBuku } from "../../services/bukuServices"


// khusus yang diakses user

// SUDAH TESTING
export const getAllBukuUser = async(req: Request, res: Response) => {
    const buku = await getSemuaBukuTersediaUntukUser()

    SendDataResponse({
        res,
        message: 'Data Buku',
        data: buku,
        total: buku.length,
        page: 1
    })
}

// SUDAH TESTING
export const getSingleBukuUser = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await getSatuBukuTersediaUntukUser(id)
    const durasiPeminjaman = await dataDurasiPeminjaman()

    SendDataWithDurasiResponse({
        res,
        message: 'Data Buku',
        data: buku,
        durasi: durasiPeminjaman,
    })
}


// untuk pustakawan
export const addBuku = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    req.body.createdBy = userId
    
    const buku = await tambahDataBuku(req.body)
    
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

    const buku = await editDataBuku(id, req.body)

    SendOneDataResponse({
        res,
        message: `Buku ${buku?.judul} Diubah`,
        data: buku
    })
}

export const getAllBukuPustakawan = async(req: Request | any, res: Response) => {
    const books = await getSemuaBukuUntukPustakawan()

    SendDataResponse({
        res,
        message: 'Daftar Semua Buku',
        data: books,
        total: books.length,
        page: 1

    })
} 

export const getSingleBukuPustakawan = async(req: Request | any, res: Response) => {
    const { id } = req.params

    const buku = await getSatuBukuUntukPustakawan(id)

    SendOneDataResponse({
        res,
        message: `Data Buku ${buku?.judul}`,
        data: buku
    })
}