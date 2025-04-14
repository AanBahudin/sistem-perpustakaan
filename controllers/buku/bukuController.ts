import { Request, Response } from "express"
import Buku, { BukuSchemaType } from "../../model/Buku"
import getDurasiPeminjaman from '../../services/getDurasiPeminjaman'
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../../errors/errorHandler"


// khusus yang diakses user
export const getAllBukuUser = async(req: Request, res: Response) => {
    const buku = await Buku.find({
        dihapus: false,
        status: 'Tersedia'
    }).select('-dihapus')

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Daftar Buku User',
        timestamps: new Date(Date.now()).toString(),
        data: buku,
        total: buku.length
    })
}

export const getSingleBukuUser = async(req: Request | any, res: Response) => {
    const {id} = req.params

    const buku = await Buku.findOne({_id: id, dihapus: false}).select("-dihapus -createdBy")
    if (!buku) {
        throw new NotFoundError('Buku tidak dapat ditemukan')
    }

    const durasiPeminjaman = await getDurasiPeminjaman()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Buku',
        timestamps: new Date(Date.now()).toString(),
        data: buku,
        durasiPeminjaman: [...durasiPeminjaman]
    })
}


// untuk pustakawan
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

    const buku = await Buku.findOneAndUpdate({_id: id}, {dihapus: true})

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

export const getAllBukuPustakawan = async(req: Request | any, res: Response) => {
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

export const getSingleBukuPustakawan = async(req: Request | any, res: Response) => {
    const { id } = req.params

    const buku = await Buku.findOne({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Data Buku ${buku?.judul}`,
        timestamps: new Date(Date.now()).toString(),
        data: buku
    })
}