import { Response, Request } from "express"

import { StatusCodes } from "http-status-codes"
import Peminjaman from "../../model/Peminjaman"
import Buku from "../../model/Buku"
import Pengguna from "../../model/Pengguna"
import { PinjamanUpdatedFieldType } from "../../types/pinjamanTypes"
import tambahHariKeTanggal from "../../utils/tambahHari"

// 2 controller dibawah khusus untuk pengguna
export const requestPinjaman = async(req: Request | any, res: Response) => {
    const { id : idBuku, durasiPeminjaman } = req.body
    const { userId } = req.user

    const pinjaman = await Peminjaman.create({ 
        peminjam: userId, 
        buku: idBuku, 
        durasiPeminjaman, 
        statusPeminjaman: 'Diajukan' })

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: `Peminjaman buku telah diajukan, silahkan tunggu email verifikasi`,
        timestamps: new Date(Date.now()).toString(),
        data: pinjaman
    })
}

// controller ini khusus untuk pustakawan
export const terimaPinjaman = async(req: Request | any, res: Response) => {
    const { id: pinjamanId, statusPeminjaman: isAccepted } = req.body

    // objek yang akan digunakan untuk meng-update data pinjaman
    let updatedField : PinjamanUpdatedFieldType = {
        statusPeminjaman : isAccepted ? 'Dipinjam' : 'Ditolak',
        disetujui: isAccepted,
        diprosesOleh: req.user.userId
    }

    // ambil data pinjaman khususnya durasiPeminjaman
    const dataPeminjaman = await Peminjaman.findOne({_id: pinjamanId})
    const {durasiPeminjaman} = dataPeminjaman!

    // jika data peminjaman diterima, maka tambahkan field berakhirPada untuk menandai masa selesainya peminjaman
    if (isAccepted) {
        const berakhirPada = tambahHariKeTanggal(new Date, durasiPeminjaman as number)
        updatedField.berakhirPada = berakhirPada
    }    

    // update data peminjaman dengan objek updatedField
    const dataPinjaman = await Peminjaman.findOneAndUpdate(
        {_id: pinjamanId},
        updatedField,
        {new: true, runValidators: true}
    )


    if (isAccepted) {
        
        // update attribute jumlahPinjaman di model Pengguna
        const user = await Pengguna.findOneAndUpdate(
            {_id: dataPinjaman?.peminjam},
            {$inc: {jumlah_pinjaman: 1}},
            {new: true, runValidators: true}
        )
    
        // update attribute stok buku di model Buku
        const dataBuku = await Buku.findOneAndUpdate(
            {_id: dataPinjaman?.buku},
            {$inc: {stok: -1}},
            {new: true, runValidators: true}
        )
    }


    // pemintaan ditolak/terima akan dikirim melalu notifikasi

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: isAccepted ? 'Pinjaman diterima' : 'Pinjaman ditolak',
        timestamps: new Date(Date.now()).toString(),
        data: dataPinjaman
    }) 
    
}

export const tambahPinjaman = async(req: Request, res: Response) => {
    res.send('tambah pinjaman controller')
}

export const getAllPinjaman = async(req: Request, res: Response) => {
    const dataPinjaman = await Peminjaman.find()

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Seluruh Data Peminjaman',
        timestamps: new Date(Date.now()).toString(),
        data: dataPinjaman,
        total: dataPinjaman.length
    })
}

export const getAllPinjamanAktif = async(req: Request, res: Response) => {
    const dataPinjaman = await Peminjaman.find({statusPeminjaman: 'Dipinjam', disetujui: true})

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pinjaman',
        timestamps: new Date(Date.now()).toString(),
        data: dataPinjaman,
        total: dataPinjaman.length
    })
}

export const getAllRequestedPinjaman = async(req: Request, res: Response) => {
    const dataPermintaanPeminjaman = await Peminjaman.find(
        {statusPeminjaman: 'Diajukan', disetujui: 'false'}
    ).populate([
        {path: 'peminjam', select: '-password -role'},
        {path: 'buku'}
    ])

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Permintaan Pinjaman',
        timestamps: new Date(Date.now()).toString(),
        data: dataPermintaanPeminjaman,
        total: dataPermintaanPeminjaman.length
    })
}

export const getSinglePinjaman = async(req: Request, res: Response) => {
    const {id} = req.params

    const dataPinjaman = await Peminjaman.findOne({_id: id})
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Pinjaman',
        timestamps: new Date(Date.now()).toString(),
        data: dataPinjaman
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