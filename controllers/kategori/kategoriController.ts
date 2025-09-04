import { Request, Response } from "express";
import { addKategori, allKategori, deleteKategori, editKategoriServices, searchKategori } from "../../services/kategoriServices";
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

export const getSearchKategori = async(req: Request, res: Response) => {
    const {kategori} = req.query
    const data = await searchKategori(kategori || '')

    SendDataResponse({
        res, 
        message: 'Kategori',
        data
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

export const editKategori = async(req: Request, res: Response) => {
    const data = req.body
    const idKategori = req.params.id

    const updatedData = await editKategoriServices({data, idKategori})

    SendOneDataResponse({
        res,
        message: 'Kategori berhasil diupdate',
        data: updatedData
    })
    
}

// SUDAH DITESTING
export const hapusKategori = async(req: Request | any, res: Response) => {
    const {id: idKategori} = req.params
    await deleteKategori({idKategori})

    SendBasicResponse({
        res,
        message: 'Kategori Dihapus',
    })
}