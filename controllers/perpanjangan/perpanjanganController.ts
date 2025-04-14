import { Request, Response } from "express";

// untuk pengguna
export const pengajuanPerpanjangan = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan')
}

export const getAllPerpanjanganUser = async(req: Request, res: Response) => {
    res.send('pengajuan perpanjangan user')
}

export const getSinglePerpanjanganUser = async(req: Request, res: Response) => {
    res.send('single pengajuan perpanjangan user')
}

export const editPerpanjanganUser = async(req: Request, res: Response) => {
    res.send('edit perpanjangan')
}

export const batalPerpanjanganUser = async(req: Request, res: Response) => {
    res.send('pembatalanPerpanjangan')
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