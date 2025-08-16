import { Response, Request } from "express"

import { StatusCodes } from "http-status-codes"
import Peminjaman from "../../model/Peminjaman"
import { getOnePeminjaman, getOnePeminjamanUser, getOnePeminjamanUserByIdBook, getOnePeminjamanUserByPengembalianIdServices, getSemuaPeminjamanUser, getSemuaPengajuanPeminjaman, getSemuaPinjaman, getSemuaPinjamanAktif, pembatalanPeminjamanUser, pengajuanPeminjaman, tambahPinjamanUser, terimaPeminjamanUser } from "../../services/peminjamanServices"
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse"

// 4 controller dibawah khusus untuk pengguna

// SUDAH DITESTING
export const requestPinjaman = async(req: Request | any, res: Response) => {
    const { idBuku, durasiPeminjaman, alasan } = req.body
    const { userId } = req.user

    const {data} = await pengajuanPeminjaman({durasiPeminjaman, idBuku, userId, alasan})

    SendOneDataResponse({
        res,
        message: `Peminjaman buku telah diajukan, silahkan tunggu email verifikasi`,
        data 
    })
}

// SUDAH DITESTING
export const getPinjamanUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const query = req.query

    const {data} = await getSemuaPeminjamanUser({userId, query})

    SendDataResponse({
        res,
        message: 'Data Peminjaman',
        data,
        total: data.length,
        page: 1
    })
}

// SUDAH DITESTING
export const getSinglePinjamanUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const {id} = req.params

    const {data} = await getOnePeminjamanUser({userId, peminjamanId: id})
    SendOneDataResponse({
        res,
        message: 'Data Pinjaman',
        data
    })
}

// SUDAH DITESTING
export const getSinglePinjamanUserByBookId = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const {id} = req.params

    const data = await getOnePeminjamanUserByIdBook({bookId: id, userId})

    SendOneDataResponse({
        res,
        message: 'Data Pinjaman',
        data
    })
}

// SUDAH DITESTING
export const getSinglePinjamanUserByPengembalianId = async(req: Request | any, res: Response) => {
    const {id} = req.params
    const {userId} = req.user

    const data = await getOnePeminjamanUserByPengembalianIdServices({userId, pengembalianId: id})

    SendOneDataResponse({
        res,
        message: 'Data Peminjaman',
        data
    })
}


// SUDAH DITESTING
export const pembatalanPinjamanUser = async(req: Request | any, res: Response) => {
    const {idPeminjaman} = req.body
    const {userId} = req.user

    // ambil data pinjama terlebih dahulu
    const dataPinjaman = await pembatalanPeminjamanUser({idPeminjaman, userId})

    SendBasicResponse({
        res,
        message: 'Data Pinjaman Dibatalkan',
    })
}

// controller ini khusus untuk pustakawan
export const terimaPinjaman = async(req: Request | any, res: Response) => {
    const { idPeminjaman, statusPeminjaman, kondisiBuku } = req.body
    const {userId} = req.user

    const {data} = await terimaPeminjamanUser({idPeminjaman, statusPeminjaman, userId, kondisiBuku})

    // pemintaan ditolak/terima akan dikirim melalu notifikasi

    SendOneDataResponse({
        res,
        message: statusPeminjaman ? 'Pinjaman diterima' : 'Pinjaman ditolak',
        data
    })
    
}

export const tolakPeminjamanPustakawan = async(req: Request | any, res: Response) => {
    const {idPeminjaman} = req.params
    const {userId} = req.user

    const pengajuanPeminjaman = await Peminjaman.findOneAndUpdate({_id: idPeminjaman}, {
        statusPeminjaman: 'Ditolak', 
        disetujui: 'false',
        diprosesOleh: userId
    }, {runValidators: true, new: true})

    SendOneDataResponse({
        res,
        message: 'Data pengajuan peminjaman telah ditolak'
    })

}

// SUDAH DITESTING
export const tambahPinjaman = async(req: Request | any, res: Response) => {
    const {
        idBuku,
        idPengguna,
        durasiPeminjaman,
        kondisi
    } = req.body
    const {userId} = req.user

    const {data} = await tambahPinjamanUser({
        idBuku,
        idPengguna,
        durasiPeminjaman,
        kondisi,
        userId
    })

    SendOneDataResponse({
        res,
        message: 'Data Pinjaman Dibuat',
        data
    })
}

// SUDAH DITESTING
export const getAllPinjaman = async(req: Request, res: Response) => {
    const {data} = await getSemuaPinjaman()

    SendDataResponse({
        res,
        message: 'Seluruh Data Peminjaman',
        data,
        total: data.length,
        page: 1
    })
}

// SUDAH DITESTING
export const getAllPinjamanAktif = async(req: Request, res: Response) => {
    const {data} = await getSemuaPinjamanAktif()

    SendDataResponse({
        res,
        message: 'Data Pinjaman',
        data,
        total: data.length,
        page: 1
    })
}

// SUDAH DITESTING
export const getAllRequestedPinjaman = async(req: Request, res: Response) => {
    const {data} = await getSemuaPengajuanPeminjaman()

    SendDataResponse({
        res,
        message: 'Data Pinjaman',
        data,
        total: data.length,
        page: 1
    })
}

// SUDAH DITESTING
export const getSinglePinjaman = async(req: Request, res: Response) => {
    const {id: idPeminjaman} = req.params
    const {data} = await getOnePeminjaman({idPeminjaman})
    
    SendOneDataResponse({
        res,
        message: 'Data Pinjaman',
        data
    })
}

export const hapusPinjaman = async(req: Request, res: Response) => {
    const {id} = req.params

    await Peminjaman.findOneAndDelete({_id: id})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data pinjaman telah dihapus',
        timestamps: new Date(Date.now()).toString()
    })
}