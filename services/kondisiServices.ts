import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Kondisi from "../model/Kondisi"
import { BuatKondisiParamsType, EditKondisiParamsType, GetOneKondisiParamsType, HapusKondisiParamsType } from "../types/kondisiTypes"

export const buatKondisi = async({denda, kondisi, deskripsi, userId} : BuatKondisiParamsType) => {
    const isKondisiExist = await Kondisi.findOne(
        {kondisi: { $regex: new RegExp('^' + kondisi + '$', 'i') }}
    )
    if (isKondisiExist) throw new BadRequestError('Kondisi sudah digunakan')

    const kondisiBaru = await Kondisi.create({kondisi, denda, deskripsi, createdBy: userId})
    return{data: kondisiBaru}
}

export const getDataKondisi = async() => {
    const kondisi = await Kondisi.find()

    return {data: kondisi}
}

export const getOneKondisi = async({kondisiId} : GetOneKondisiParamsType) => {
    const kondisi = await Kondisi.findOne({_id: kondisiId})

    return {data: kondisi}
}

export const editKondisi = async({denda, kondisi, deskripsi, kondisiId} : EditKondisiParamsType) => {
    const kondisiBaru = await Kondisi.findOneAndUpdate(
        {_id: kondisiId},
        {kondisi, denda, deskripsi},
        {new: true, runValidators: true}
    )

    if (!kondisiBaru) throw new NotFoundError('Data kondisi tidak ditemukan')

    return {data: kondisiBaru}

}

export const hapusKondisi = async({kondisiId} : HapusKondisiParamsType) => {
    const kondisi = await Kondisi.findOneAndDelete({_id: kondisiId})
    if (!kondisi) throw new NotFoundError('Data kondisi tidak ditemukan')

    return {data: kondisi}
}
