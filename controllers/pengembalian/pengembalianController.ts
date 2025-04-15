import { Request, Response } from "express";

export const getAllPengembalianUser = async(req: Request, res: Response) => {
    res.send('data pengembalian user')
}

export const getSinglePengembalianUser = async(req: Request, res: Response) => {
    res.send('data pengembalian user')
}

// untuk pustakawan
export const getDataPengembalian = async(req: Request, res: Response) => {
    res.send('data pengembalian user')
}

export const getSingleDataPengembalian = async(req: Request, res: Response) => {
    res.send('data pengembalian user')
}

export const terimaPengembalian = async(req: Request, res: Response) => {
}