import { Request, Response } from "express";
import { addKategori, allKategori, deleteKategori } from "../../services/kategoriServices";
import { SendBasicResponse, SendDataResponse, SendOneDataResponse } from "../../utils/sendResponse";

// SUDAH DITESTING
export const getAllKategori = async(req: Request | any, res: Response) => {
    const {data} = await allKategori()

    SendDataResponse({
        res,
        message: 'Daftar Kategori',
        data,
        total: data.length
    })
}

// SUDAH DITESTING
export const createKategori = async(req: Request | any, res: Response) => {
    const {kategoriBaru} = req.body

    const {data} = await addKategori({kategoriBaru})

    SendOneDataResponse({
        res,
        message: 'Kategori Dibuat',
        data
    })
}

// SUDAH DITESTING
export const hapusKategori = async(req: Request | any, res: Response) => {
    const {id} = req.params
    await deleteKategori({idKategori: id})

    SendBasicResponse({
        res,
        message: 'Kategori Dihapus',
    })
}