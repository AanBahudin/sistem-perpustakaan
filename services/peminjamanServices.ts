import Peminjaman from "../model/Peminjaman";
import { PinjamanDikembalikanParamsType } from "../types/pinjamanTypes";

export const pinjamanDikembalikan = async({idBuku, idPeminjam, idPeminjaman} : PinjamanDikembalikanParamsType) => {
    await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman, peminjam: idPeminjam, buku: idBuku},
        {statusPeminjaman: 'Dikembalikan'},
        {new: true, runValidators: true}
    )
}