import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Peminjaman from "../model/Peminjaman"
import Pengembalian from "../model/Pengembalian"
import { GetAllPengembalianDataParamsType, GetOnePengembalianDataParamsType, PustakawanAcceptPengembalianParamsType, PustakawanCreatePengembalianParamsType, PustakawanEditPengembalianParamsType, PustakawanGetOnePengembalianParamsType } from "../types/pengembalianTypes"
import { hitungKeterlambatan } from "../utils/selisihHari"
import { bukuDikembalikan } from "./bukuServices"
import { pinjamanDikembalikan } from "./peminjamanServices"
import { penggunaMeminjam } from "./penggunaServices"


// BELUM TESTING
export const getPengembalianUser = async({ userId } : GetAllPengembalianDataParamsType) => {
    const pengembalian = await Pengembalian.find({idPengguna: userId})

    return {data: pengembalian}
}

// BELUM TESTING
export const getOnePengembalianUser = async({ pengembalianId, userId } : GetOnePengembalianDataParamsType ) => {
    const pengembalian = await Pengembalian.findOne({_id: pengembalianId, idPengguna: userId})
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')

    return {data: pengembalian}
}


// BELUM TESTING
export const pustakawanGetDataPengembalian = async() => {
    const pengembalian = await Pengembalian.find()

    return {data: pengembalian}
}

// BELUM TESTING
export const getOneDataPengembalian = async({ pengembalianId } : PustakawanGetOnePengembalianParamsType) => {
    const pengembalian = await Pengembalian.findOne({_id: pengembalianId})
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')

    return {data: pengembalian}
}

// BELUM TESTING
export const pustakawanBuatDataPengembalian = async({ 
    idPeminjaman, 
    kondisiBuku, 
    statusPengembalian 
} : PustakawanCreatePengembalianParamsType) => {
    // cari data pinjaman
    const pinjaman = await Peminjaman.findOne({_id: idPeminjaman})
    if (!pinjaman) throw new NotFoundError('Data pinjaman tidak ditemukan')

    // cek status peminjaman agar dapat diproses
    const statusYangDiizinkan = ['Dipinjam', 'Terlambat']
    if (!statusYangDiizinkan.includes(pinjaman.statusPeminjaman)) throw new BadRequestError('Tidak dapat melakukan pengembalian')

    // menghitung jumlah hari dan denda keterlambatan
    const totalHariTerlambat = hitungKeterlambatan(pinjaman.berakhirPada as Date)
    const totalDendaKeterlambatan = 1000 * totalHariTerlambat

    // mengecek apakah pinjaman sudah diproses sebelumnya / pinjaman sudah memiliki data pengembalian
    const isPengembalianAlreadyExists = await Pengembalian.findOne({
        _id: pinjaman.dataPengembalian,
        idPeminjaman,
        idPengguna: pinjaman.peminjam
    });
    if (isPengembalianAlreadyExists) {
        return {
            success: true, 
            message: 'Data pengembalian ditemukan',
            data: isPengembalianAlreadyExists
        }
    }

    // buat data pengembalian
    const dataPengembalian = await Pengembalian.create({
        idPeminjaman: idPeminjaman,
        idPengguna: pinjaman.peminjam,
        idBuku: pinjaman.buku,
        durasiKeterlambatan: totalHariTerlambat,
        statusPengembalian: statusPengembalian,
        keadaanBuku: kondisiBuku,
        dendaKeterlambatan: totalDendaKeterlambatan,
        dendaFisik: 0 // nanti dibuatkan database khusus untuk nominal denda fisik
    })

    // update data peminjaman dengan memasukan id pengembalian
    await Peminjaman.findOneAndUpdate(
        {_id: idPeminjaman, peminjam: pinjaman.peminjam},
        {dataPengembalian: dataPengembalian?._id},
        {new: true, runValidators: true}
    )

    return {
        success: true,
        message: 'Data Pengembalian dibuat',
        data: dataPengembalian
    }
}

// BELUM TESTING
export const pustakawanTerimaDataPengembalian = async({ idPengembalian, userId } : PustakawanAcceptPengembalianParamsType) => {
    // mencari data pengembalian dan mengecek apakah data tersedia
    const pengembalian = await Pengembalian.findOne({
        _id: idPengembalian, 
        $or: [
                {statusPengembalian: 'Dihilangkan'},
                {statusPengembalian: 'Pending'}
            ]
        })
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')
    
    // update data pengembalian
    const updatedPengembalian = await Pengembalian.findOneAndUpdate(
        {_id: pengembalian._id},
        {
            statusPembayaran: 'Dibayar',
            statusPengembalian: pengembalian.statusPengembalian === 'Pending' ? 'Dikembalikan' : 'Dihilangkan',
            tanggalPengembalian: Date.now(),
            diprosesOleh: userId
        },
        {new: true, runValidators: true}
    )

    // update data peminjaman - statusPeminjaman
    await pinjamanDikembalikan({
        idBuku: pengembalian.idBuku as string, 
        idPeminjam: pengembalian.idPengguna as string,
        idPeminjaman: pengembalian.idPeminjaman as string
    })
    // update data buku - stok dan totalPeminjaman
    await bukuDikembalikan(pengembalian.idBuku as string)
    // update data pengguna - total pinjaman
    await penggunaMeminjam({idPengguna: pengembalian.idPengguna as string})

    // return agar diakses oleh controller
    return {data: updatedPengembalian}
}

// BELUM TESTING
export const pustakawanEditDataPengembalian = async({kondisiBuku, idPengembalian} : PustakawanEditPengembalianParamsType) => {
    const pengembalian = await Pengembalian.findOne({
        _id: idPengembalian,
        statusPembayaran: 'Belum Bayar',
        statusPengembalian: 'Pending'
    })
    if (!pengembalian) throw new NotFoundError('Data tidak ditemmukan')

    const updatedPengembalian = await Pengembalian.findOne(
        {_id: idPengembalian},
        {keadaanBuku: kondisiBuku},
        {new: true, runValidators: true}
    )

    return {data: updatedPengembalian}
}