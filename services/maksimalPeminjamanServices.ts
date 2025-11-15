import MaksPeminjaman from "../model/MaksPeminjaman"

export const getMaksimalPeminjaman = async() => {
    const maksimalPeminjaman = await MaksPeminjaman.findOne().select('maksimal _id')
    return maksimalPeminjaman
}

export const updateMaksimalPeminjaman = async({data, id} : {data: any, id: string}) => {
    const updatedData = await MaksPeminjaman.findOneAndUpdate({_id: id}, data, {new: true, runValidators: true})
    return updatedData
}