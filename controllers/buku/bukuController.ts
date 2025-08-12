import { Request, Response } from "express"
import {dataDurasiPeminjaman} from '../../services/durasiServices'
import { SendDataResponse, SendDataWithDurasiResponse, SendOneDataResponse } from "../../utils/sendResponse"
import { discoveryBukuServices, editDataBuku, getSatuBukuTersediaUntukUser, getSatuBukuUntukPustakawan, getSemuaBukuTersediaUntukUser, getSemuaBukuUntukPustakawan, hapusDataBuku, tambahDataBuku } from "../../services/bukuServices"


// khusus yang diakses user

// SUDAH TESTING
export const getAllBukuUser = async(req: Request, res: Response) => {
    const query = req.query
    const {buku, recommendation, totalPage, lastAdded} = await getSemuaBukuTersediaUntukUser({query})
    SendDataResponse({
        res,
        message: 'Data Buku',
        data: {
            buku,
            recommendation,
            lastAdded
        },
        total: totalPage,
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

export const discoveryBuku = async(req: Request, res: Response) => {
    const {query} = req.query

    const data = await discoveryBukuServices({query})

    SendDataResponse({
        res,
        message: 'Data Buku',
        data,
        total: data.length,
        page: 1
    })    
}


// untuk pustakawan -  SUDAH DITESTING
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

// SUDAH TESTING
export const hapusBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await hapusDataBuku(id)

    SendOneDataResponse({
        res,
        message: `Buku ${buku?.judul} Dihapus`
    })
}

// SUDAH TESTING
export const editBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await editDataBuku(id, req.body)

    SendOneDataResponse({
        res,
        message: `Buku ${buku?.judul} Diubah`,
        data: buku
    })
}

// SUDAH TESTING
export const getAllBukuPustakawan = async(req: Request | any, res: Response) => {
    const books = await getSemuaBukuUntukPustakawan({})

    SendDataResponse({
        res,
        message: 'Daftar Semua Buku',
        data: books,
        total: books.dataBuku.length,
        page: 1

    })
} 

// SUDAH TESTING
export const getSingleBukuPustakawan = async(req: Request | any, res: Response) => {
    const { id } = req.params

    const buku = await getSatuBukuUntukPustakawan(id)

    SendOneDataResponse({
        res,
        message: `Data Buku ${buku?.judul}`,
        data: buku
    })
}