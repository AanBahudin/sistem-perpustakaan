import { Request, Response } from "express"
import Buku, { BukuSchemaType } from "../../model/Buku"
import {dataDurasiPeminjaman} from '../../services/durasiServices'
import { StatusCodes } from "http-status-codes"
import { SendDataResponse, SendOneDataResponseWithDuration } from "../../utils/sendResponse"
import { editDataBuku, getSatuBukuTersediaUntukUser, getSatuBukuUntukPustakawan, getSemuaBukuTersediaUntukUser, getSemuaBukuUntukPustakawan, hapusDataBuku, tambahDataBuku } from "../../services/bukuServices"


// khusus yang diakses user
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

export const getSingleBukuUser = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await getSatuBukuTersediaUntukUser(id)
    const durasiPeminjaman = await dataDurasiPeminjaman()

    SendOneDataResponseWithDuration({
        res,
        message: 'Data Buku',
        data: buku,
        durasi: durasiPeminjaman
    })
}


// untuk pustakawan
export const addBuku = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    req.body.createdBy = userId
    
    const buku = await tambahDataBuku(req.body)
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Buku ditambahkan',
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })  
}

export const hapusBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await hapusDataBuku(id)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Buku ${buku?.judul} Dihapus`,
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })
}

export const editBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await editDataBuku(id, req.body)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Buku ${buku?.judul} Diubah`,
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })
}

export const getAllBukuPustakawan = async(req: Request | any, res: Response) => {
    const books = await getSemuaBukuUntukPustakawan()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Daftar Semua Buku',
        timestamps: new Date(Date.now()).toString(),
        data: books,
        total: books.length,
        page: 1
    })
} 

export const getSingleBukuPustakawan = async(req: Request | any, res: Response) => {
    const { id } = req.params

    const buku = await getSatuBukuUntukPustakawan(id)

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Data Buku ${buku?.judul}`,
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })
}