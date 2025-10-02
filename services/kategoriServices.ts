import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Kategori from "../model/Kategori"
import { AddKategoriParamsType, DeleteKategoriParamsType } from "../types/kategoriTypes"

// SUDAH DITESTING
export const allKategori = async() => {
    const kategori = await Kategori.find()

    return {data: kategori}
}

export const searchKategori = async(title: any) => {
    let dataKategori = []
    if (title === undefined || title === '') {
        dataKategori = await Kategori.find()
    } else {
        dataKategori = await Kategori.find({
            nama: {$regex: title, $options: 'i'}
        })
    }

    return dataKategori
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

export const editKategoriServices = async({data, idKategori} : {data: any, idKategori: string}) => {
    const updatedKategori = await Kategori.findOneAndUpdate(
        {_id: idKategori},
        {nama: data.kategoriBaru},
        {new: true, runValidators: true}
    )

    return updatedKategori
}

// SUDAH DITESTING
export const deleteKategori = async({idKategori} : {idKategori: string}) => {
    const kategori = await Kategori.findOneAndDelete({_id: idKategori})
    if (!kategori) throw new NotFoundError('Kategori tidak ditemukan')
}