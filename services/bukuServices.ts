import { Request, Response } from "express";
import Buku, { BukuSchemaType } from "../model/Buku";
import { NotFoundError } from "../errors/errorHandler";

export const getSemuaBukuTersediaUntukUser = async() => {
    const buku = await Buku.find({
        dihapus: false,
        status: 'Tersedia'
    }).select('-dihapus')

    return buku
}

export const getSatuBukuTersediaUntukUser = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku, dihapus: false, status: 'Tersedia'}).select('-dihapus')

    if (!buku) {
        throw new NotFoundError('Data buku tidak ditemukan')
    }
    return buku
}

// UNTUK PUSTAKAWAN

export const getSemuaBukuUntukPustakawan = async() => {
    const books = await Buku.find()
    
    return books
}

export const getSatuBukuUntukPustakawan = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku})

    if (!buku) {
        throw new NotFoundError('Buku tidak ditemukan!')
    }
    
    return buku
}

export const tambahDataBuku = async(dataBukuTerbaru: BukuSchemaType) => {
    const bukuTerbaru = await Buku.create(dataBukuTerbaru)

    return bukuTerbaru
}

export const editDataBuku = async(idBuku: string, dataBuku: BukuSchemaType) => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {...dataBuku},
        {new: true, runValidators: true}
    )

    if (!buku) {
        throw new NotFoundError('Buku tidak ditemukan')
    }

    return buku
}

export const hapusDataBuku = async(idBuku: string)  => {

    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {dihapus: true},
        {new: true}
    );
    if (!buku) {
        throw new NotFoundError('Buku tidak ditemukan!');
    }
    
    return buku;
}