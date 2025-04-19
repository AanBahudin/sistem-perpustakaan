import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Kategori from "../model/Kategori"
import { AddKategoriParamsType, DeleteKategoriParamsType } from "../types/kategoriTypes"

// SUDAH DITESTING
export const allKategori = async() => {
    const kategori = await Kategori.find()

    return {data: kategori}
}

// SUDAH DITESTING
export const addKategori = async({kategoriBaru} : AddKategoriParamsType) => {
    const isKategoriExist = await Kategori.findOne({
        nama: { $regex: new RegExp('^' + kategoriBaru + '$', 'i') }
    })
    if (isKategoriExist) throw new BadRequestError('Kategori sudah ada')

    const kategori = await Kategori.create({ nama: kategoriBaru })

    return {data: kategori}
}

// SUDAH DITESTING
export const deleteKategori = async({idKategori} : DeleteKategoriParamsType) => {
    const kategori = await Kategori.findOneAndDelete({_id: idKategori})
    if (!kategori) throw new NotFoundError('Kategori tidak ditemukan')
}