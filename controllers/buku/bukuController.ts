import { Request, Response } from "express"
import Buku, { BukuSchemaType } from "../../model/Buku"
import getDurasiPeminjaman from '../../services/getDurasiPeminjaman'
import { StatusCodes } from "http-status-codes"

export const addBuku = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const dataBuku : BukuSchemaType = req.body
    dataBuku.createdBy = userId
    
    const buku = await Buku.create(dataBuku);
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Buku ditambahkan',
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })  
}

export const hapusBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await Buku.findOneAndDelete({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Buku ${buku?.judul} Dihapus`,
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })
}

export const editBuku = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await Buku.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Buku ${buku?.judul} Diubah`,
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })
}

export const getAllBuku = async(req: Request | any, res: Response) => {
    const books = await Buku.find()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Daftar Semua Buku',
        timestamps: new Date(Date.now()).toString(),
        data: books,
        total: books.length,
        page: 1
    })
} 

export const getSingleBuku = async(req: Request | any, res: Response) => {
    const { id } = req.params

    const buku = await Buku.findOne({_id: id})
    const durasiPeminjaman = await getDurasiPeminjaman()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Data Buku ${buku?.judul}`,
        timestamps: new Date(Date.now()).toString(),
        data: buku,
        meta: {
            durasi: durasiPeminjaman
        }
    })
}