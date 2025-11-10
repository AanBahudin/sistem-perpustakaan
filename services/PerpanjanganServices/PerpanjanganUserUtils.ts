import Perpanjangan from "../../model/Perpanjangan"

export const getSemuaPerpanjanganUserById = async({userId} : {userId: string}) => {
    const semuaPerpanjanganBerhasil = await Perpanjangan.find({idPengguna: userId, disetujui: 'Diterima'}).populate('idBuku')
    const totalData = semuaPerpanjanganBerhasil.length

    return {
        data: semuaPerpanjanganBerhasil,
        total: totalData
    }
}