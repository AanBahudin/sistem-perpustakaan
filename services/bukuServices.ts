import Buku, { BukuSchemaType } from "../model/Buku";
import { NotFoundError } from "../errors/errorHandler";

// SUDAH TESTING
export const getSemuaBukuTersediaUntukUser = async() => {
    const buku = await Buku.find({
        dihapus: false,
        status: 'Tersedia'
    }).select('-dihapus')

    return buku
}

// SUDAH TESTING
export const getSatuBukuTersediaUntukUser = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku, dihapus: false, status: 'Tersedia'}).select('-dihapus')

    if (!buku) throw new NotFoundError('Data buku tidak ditemukan')
    return buku
}

// UNTUK PUSTAKAWAN

// SUDAH TESTING
export const getSemuaBukuUntukPustakawan = async() => {
    const books = await Buku.find()
    return books
}

// SUDAH TESTING
export const getSatuBukuUntukPustakawan = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku})
    if (!buku) throw new NotFoundError('Buku tidak ditemukan!')
    return buku
}

// SUDAH DITESTING
export const tambahDataBuku = async(dataBukuTerbaru: BukuSchemaType) => {
    const bukuTerbaru = await Buku.create(dataBukuTerbaru)
    return bukuTerbaru
}

// SUDAH DITESTING
export const editDataBuku = async(idBuku: string, dataBuku: BukuSchemaType) => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {...dataBuku},
        {new: true, runValidators: true}
    )

    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    return buku
}

// SUDAH DITESTING
export const hapusDataBuku = async(idBuku: string)  => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {dihapus: true},
        {new: true}
    );
    if (!buku) throw new NotFoundError('Buku tidak ditemukan!');
    
    return buku;
}