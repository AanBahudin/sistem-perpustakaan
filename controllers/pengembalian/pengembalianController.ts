import { Request, Response } from "express";
import { 
    getOneDataPengembalian,
    getOnePengembalianUser, 
    getPengembalianUser, 
    pustakawanBuatDataPengembalian, 
    pustakawanEditDataPengembalian, 
    pustakawanGetDataPengembalian, 
    pustakawanTerimaDataPengembalian} from "../../services/pengembalianServices";
import { SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

// SUDAH TESTING
export const getAllPengembalianUser = async(req: Request | any, res: Response) => {
    const {userId} = req.user
    const query = req.query
    const {data} = await getPengembalianUser({userId, query})

    SendDataResponse({
        res,
        message: 'Data Pengembalian',
        total: data.length,
        page: 1,
        data
    })
}

// SUDAH TESTING
export const getSinglePengembalianUser = async(req: Request | any, res: Response) => {
    const {id} = req.params
    const { userId } = req.user

    const {data} = await getOnePengembalianUser({pengembalianId: id, userId})

    SendOneDataResponse({
        res,
        message: 'Data Pengembalian',
        data
    })
}

// export const createPengembalianDataUser = async(req: Request | any, res: Response) => {
//     const {userId} = req.user
//     const {id: peminjamanId} = req.params

//     const data = await userCreatePengembalianInfo({userId, peminjamanId})

//     res.status(200).json({message: 'test'})
// }

// untuk pustakawan

// SUDAH TESTING
export const getDataPengembalian = async(req: Request, res: Response) => {
    const {data} = await pustakawanGetDataPengembalian()

    SendDataResponse({
        res,
        message: 'Seluruh Data Peminjaman',
        total: data.length,
        page: 1,
        data
    })
}

// SUDAH TESTING
export const getSingleDataPengembalian = async(req: Request, res: Response) => {
    const { id } = req.params
    const {data} = await getOneDataPengembalian({pengembalianId: id})
    
    SendOneDataResponse({
        res,
        message: 'Data Pengembalian',
        data
    })
}

// SUDAH TESTING
export const buatDataPengembalian = async(req: Request, res: Response) => {
    const dataBody = req.body
    const {data, message} = await pustakawanBuatDataPengembalian({dataBody})

    SendOneDataResponse({
        res,
        message: message,
        data
    })
}

// SUDAH TESTING
export const terimaDataPengembalian = async(req: Request | any, res: Response) => {
    // id dari params
    const {id} = req.params
    const {data} = await pustakawanTerimaDataPengembalian({
        idPengembalian: id,
        userId: req.user.userId
    })

    SendOneDataResponse({
        res,
        message: 'Pengembalian diterima',
        data
    })
}

// SUDAH TESTING
export const editDataPengembalian = async(req: Request | any, res: Response) => {
    const {id: idPengembalian} = req.params
    const { kondisiBuku, statusHilang } = req.body

    const {data} = await pustakawanEditDataPengembalian({kondisiBuku, idPengembalian, statusHilang})

    SendOneDataResponse({
        res,
        message: 'Data pengembalian di-update',
        data
    })
}