import { Request, Response } from "express";

// untuk pengguna
export const pengajuanPerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}

// untuk pustakawan
export const getAllPerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}

export const getSinglePerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}

export const terimaPerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}