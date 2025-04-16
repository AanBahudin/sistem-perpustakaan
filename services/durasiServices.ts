import { NotFoundError } from "../errors/errorHandler";
import DurasiPeminjaman from "../model/DurasiPeminjaman";

export const dataDurasiPeminjaman = async() => {
    const data = DurasiPeminjaman.find()

    return data;
}

export const tambahDurasiPeminjaman = async(durasiBaru: number) => {
    const durasiTerbar = await DurasiPeminjaman.create(durasiBaru)

    return durasiTerbar
}

export const hapusDataDurasi = async(IdDurasi: string) => {
    const durasiTerhapus = await DurasiPeminjaman.findOneAndDelete({_id: IdDurasi})

    if (!durasiTerhapus) {
        throw new NotFoundError('Data durasi tidak ditemukan')
    }

    return durasiTerhapus
}