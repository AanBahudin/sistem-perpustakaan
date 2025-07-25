import { Request, Response } from "express";
import Buku from "../../model/Buku";
import { getAllPenulisServices } from "../../services/penulisServices";
import { SendOneDataResponse } from "../../utils/sendResponse";

export const getAllPenulis = async(req: Request, res: Response) => {
    const data = await getAllPenulisServices()

    SendOneDataResponse({
        res,
        message: 'Daftar penulis',
        data
    })
}