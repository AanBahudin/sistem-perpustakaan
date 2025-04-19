import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import DurasiPeminjaman from "../model/DurasiPeminjaman";

// SUDAH DITESTING
export const dataDurasiPeminjaman = async() => {
    const data = DurasiPeminjaman.find()

    return data;
}

// SUDAH DITESTING
export const tambahDurasiPeminjaman = async(durasiBaru: number) => {
    const durasiExist = await DurasiPeminjaman.findOne({durasi: durasiBaru})
    if (durasiExist) throw new BadRequestError('Data durasi sudah ada')

    const durasiTerbaru = await DurasiPeminjaman.create({durasi: durasiBaru})
    return durasiTerbaru
}

// SUDAH DITESTING
export const hapusDataDurasi = async(IdDurasi: string) => {
    const durasiTerhapus = await DurasiPeminjaman.findOneAndDelete({_id: IdDurasi})

    if (!durasiTerhapus) {
        throw new NotFoundError('Data durasi tidak ditemukan')
    }

    return durasiTerhapus
}