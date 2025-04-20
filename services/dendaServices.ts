import Denda from "../model/Denda"

export const tambahDenda = async({denda} : {denda: number}) => {
    const newDenda = await Denda.findOneAndUpdate(
        {},
        {denda},
        {new: true, runValidators: true, upsert: true}
    )
    return newDenda
}

export const getDenda = async() => {
    const denda = await Denda.findOne().select('denda')

    return denda
}