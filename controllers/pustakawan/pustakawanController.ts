import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Pustakawan from "../../model/Pustakawan";

import { 
    getAllPengguna, 
    getAllPenggunaDosen, 
    getStatsServices, 
    getAllPenggunaMahasiswa, 
    getSinglePengguna, 
    getAllPengajuanUser, 
    getAllPengajuanPeminjamanUser, 
    getSinglePengajuanPeminjamanUser, 
    getAllPengajuanPerpanjanganUser, 
    getSinglePengajuanPerpanjanganUser, 
    getAllPengajuanPengembalianUsers,
    getSinglePengajuanPengembalianUser} from "../../services/pustakawanServices";
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";
import Perpanjangan from "../../model/Perpanjangan";
import Buku from "../../model/Buku";
import Peminjaman from "../../model/Peminjaman";
import Pengembalian from "../../model/Pengembalian";
import { getBukuDiprosesPustakawanStats, getPeminjamanDiprosesPustakawanStats, getPengembalianDiprosesPustakawanStats, getPerpanjanganDiprosesPustakawanStats } from "../../services/PustakawanServices/PustakawanStatsServices";
import { pustakawanUpdatePasswword } from "../../services/PustakawanServices/PustakawanServices";

export const getStats = async(req: Request | any, res: Response) => {
    const data = await getStatsServices()
    SendDataResponse({
        res,
        message: 'stats data',
        data
    })
}

export const getAllUsers = async(req: Request, res: Response) => {
    const query = req.query
    const users = await getAllPengguna({query})

    SendDataResponse({
        res,
        message: 'Data Pengguna',
        data: users,
        total: users.pengguna.length,
        page: 1
    })
}

export const getAllDosenUser = async(req: Request, res: Response) => {
    const query = req.query
    const users = await getAllPenggunaDosen({query})

    SendDataResponse({
        res,
        message: 'Data Dosen',
        data: users,
        total: users.pengguna.length,
        page: 1
    })
}

export const getAllMahasiswaUser = async(req: Request, res: Response) => {
    const query = req.query
    const users = await getAllPenggunaMahasiswa({query})

    SendDataResponse({
        res,
        message: 'Data Dosen',
        data: users,
        total: users.pengguna.length,
        page: 1
    })
}

export const getSingleUser = async(req: Request, res: Response) => {

    const {id} = req.params
    const data = await getSinglePengguna({id})

    SendOneDataResponse({
        res,
        message: `Data Pengguna - ${data.pengguna?.nama}`,
        data
    })
}

export const getAllPengajuan = async(req: Request, res: Response) => {
    const data = await getAllPengajuanUser()
    
    SendOneDataResponse({
        res,
        message: 'Semua data pengajuan',
        data
    })
}

export const getAllPengajuanPeminjaman = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getAllPengajuanPeminjamanUser({query})
    SendDataResponse({
        res,
        message: 'Data pengajuan peminjaman',
        data,
        total: data.pengajuanPeminjaman.length || 0
    })
}

export const getSinglePengajuanPeminjaman = async(req: Request, res: Response) => {
    const {id: peminjamanId} = req.params
    const data = await getSinglePengajuanPeminjamanUser({id: peminjamanId})
    SendOneDataResponse({
        res, 
        message: 'Data peminjaman',
        data
    })
}

export const getAllPengajuanPerpanjangan = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getAllPengajuanPerpanjanganUser({query})
    SendDataResponse({
        res,
        message: 'Data perpanjangan',
        data
    })
}

export const getSinglePengajuanPerpanjangan = async(req: Request, res: Response) => {
    const {id: idPerpanjangan} = req.params
    const data = await getSinglePengajuanPerpanjanganUser({id: idPerpanjangan})

    SendOneDataResponse({
        res, 
        message: 'Data Perpanjangan',
        data
    })
}

export const getAllPengajuanPengembalian = async(req: Request, res: Response) => {
    const query = req.query
    const data = await getAllPengajuanPengembalianUsers({query})
    SendDataResponse({
        res,
        message: 'Data pengembalian',
        data
    })
}

export const getSinglePengajuanPengembalian = async(req: Request, res: Response) => {
    const {id: idPengembalian} = req.params
    const data = await getSinglePengajuanPengembalianUser({id: idPengembalian})
    SendOneDataResponse({
        res, 
        message: 'Data Pengembalian',
        data
    })
}

export const getProfile = async(req: Request | any, res: Response) => {
    const {userId} = req.user

    const profile = await Pustakawan.findOne({_id: userId}).select('-password')
    const getBukuDiproses = await Buku.find({createdBy: req.user.userId}).countDocuments()
    const getPeminjamanDiproses = await Peminjaman.find({diprosesOleh: req.user.userId}).countDocuments()
    const perpanjanganDiproses = await Perpanjangan.find({diprosesOleh: req.user.userId}).countDocuments()
    const pengembalianDiproses = await Pengembalian.find({statusPengembalian: 'Dikembalikan', diprosesOleh: req.user.userId}).countDocuments()

    // DATA STATS
    const statsBuku = await getBukuDiprosesPustakawanStats(req.user.userId)
    const statsPeminjaman = await getPeminjamanDiprosesPustakawanStats(req.user.userId)
    const statsPerpanjangan = await getPerpanjanganDiprosesPustakawanStats(req.user.userId)
    const statusPengembalian = await getPengembalianDiprosesPustakawanStats(req.user.userId)


    const dataValue: Array<number> = [getBukuDiproses, getPeminjamanDiproses, perpanjanganDiproses, pengembalianDiproses]

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Data Profil',
        timestamps: new Date(Date.now()).toString(),
        data: {
            profile, 
            dataValue,
            stats: {
                statsBuku,
                statsPeminjaman,
                statsPerpanjangan,
                statusPengembalian
            }
        }
    })
}

export const updatePasswordPustakawan = async(req: Request | any, res: Response) => {
    const {userId: pustakawanId} = req.user
    const data = req.body

    await pustakawanUpdatePasswword({data, pustakawanId})

    SendBasicResponse({
        res,
        message: 'Password berhasil diupdate'
    })
}

