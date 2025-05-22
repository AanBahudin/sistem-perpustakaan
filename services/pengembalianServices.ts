import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Buku from "../model/Buku"
import Peminjaman from "../model/Peminjaman"
import Pengembalian from "../model/Pengembalian"
import { GetAllPengembalianDataParamsType, GetOnePengembalianDataParamsType, PustakawanAcceptPengembalianParamsType, PustakawanCreatePengembalianParamsType, PustakawanEditPengembalianParamsType, PustakawanGetOnePengembalianParamsType } from "../types/pengembalianTypes"
import { hitungDendaFisik } from "../utils/hitungDendaFisik"
import { hitungKeterlambatan } from "../utils/selisihHari"
import { bukuDihilangkan, bukuDikembalikan } from "./bukuServices"
import { getDenda } from "./dendaServices"
import { getDataKondisi } from "./kondisiServices"
import { pinjamanDikembalikan } from "./peminjamanServices"
import { penggunaMeminjam, penggunaMengembalikan, penggunaMenghilangkan, tambahDendaPengguna } from "./penggunaServices"


// SUDAH TESTING
export const getPengembalianUser = async({ userId } : GetAllPengembalianDataParamsType) => {
    const pengembalian = await Pengembalian.find({idPengguna: userId}).populate('idBuku')

    return {data: pengembalian}
}

// BELUM TESTING
export const getOnePengembalianUser = async({ pengembalianId, userId } : GetOnePengembalianDataParamsType ) => {
    const pengembalian = await Pengembalian.findOne({_id: pengembalianId, idPengguna: userId})
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')

    return {data: pengembalian}
}


// SUDAH TESTING
export const pustakawanGetDataPengembalian = async() => {
    const pengembalian = await Pengembalian.find()

    return {data: pengembalian}
}

// SUDAH TESTING
export const getOneDataPengembalian = async({ pengembalianId } : PustakawanGetOnePengembalianParamsType) => {
    const pengembalian = await Pengembalian.findOne({_id: pengembalianId})
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')

    return {data: pengembalian}
}

// SUDAH TESTING
export const pustakawanBuatDataPengembalian = async({ 
    idPeminjaman, 
    kondisiBuku,
    statusHilang,
} : PustakawanCreatePengembalianParamsType) => {
    // cari data pinjaman
    const pinjaman = await Peminjaman.findOne({_id: idPeminjaman})
    if (!pinjaman) throw new NotFoundError('Data pinjaman tidak ditemukan')

    // cek status peminjaman agar dapat diproses
    const statusYangDiizinkan = ['Dipinjam', 'Terlambat']
    if (!statusYangDiizinkan.includes(pinjaman.statusPeminjaman)) throw new BadRequestError('Tidak dapat melakukan pengembalian')

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

    // menghitung jumlah hari dan denda keterlambatan
    const totalHariTerlambat = hitungKeterlambatan(pinjaman.berakhirPada as Date)
    const nominalDenda = await getDenda()
    const totalDendaKeterlambatan = nominalDenda as number * totalHariTerlambat

    // menghitung denda fisik
    const dendaFisik = await hitungDendaFisik({
        kondisiAwal: pinjaman.kondisi as string,
        kondisiAkhir: kondisiBuku,
        idBuku: pinjaman.buku as string,
        statusHilang
    })

    // gabung semua jenis denda
    let totalDenda = totalDendaKeterlambatan + dendaFisik

    // buat data pengembalian
    const dataPengembalian = await Pengembalian.create({
        idPeminjaman: idPeminjaman,
        idPengguna: pinjaman.peminjam,
        idBuku: pinjaman.buku,
        isMissing: statusHilang,
        durasiKeterlambatan: totalHariTerlambat,
        keadaanBuku: kondisiBuku,
        dendaKeterlambatan: totalDendaKeterlambatan,
        dendaFisik,
        totalDenda
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
        // data: []
    }
}

// SUDAH TESTING
export const pustakawanTerimaDataPengembalian = async({ idPengembalian, userId } : PustakawanAcceptPengembalianParamsType) => {
    // mencari data pengembalian dan mengecek apakah data tersedia
    const pengembalian = await Pengembalian.findOne({_id: idPengembalian, statusPengembalian: 'Pending'})
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')
    
    // update data pengembalian
    const updatedPengembalian = await Pengembalian.findOneAndUpdate(
        {_id: pengembalian._id},
        {
            statusPembayaran: 'Dibayar',
            statusPengembalian: 'Dikembalikan',
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
    // update data buku - jika dihilangkan maka update saja totalDipinjam
    if (updatedPengembalian?.isMissing) {
        await bukuDihilangkan(pengembalian.idBuku as string)
        await penggunaMenghilangkan({idPengguna: pengembalian.idPengguna as string})
    } else {
        await bukuDikembalikan(pengembalian.idBuku as string)
    }
    // update data pengguna - total pinjaman
    await penggunaMengembalikan({idPengguna: pengembalian.idPengguna as string})

    // tambah denda pengguna
    await tambahDendaPengguna({
        idPengguna: pengembalian.idPengguna as string,
        denda: pengembalian.totalDenda
    })

    // return agar diakses oleh controller
    return {data: updatedPengembalian}
}

// SUDAH TESTING
export const pustakawanEditDataPengembalian = async({kondisiBuku, idPengembalian, statusHilang} : PustakawanEditPengembalianParamsType) => {
    const pengembalian = await Pengembalian.findOne({
        _id: idPengembalian,
        statusPembayaran: 'Belum Bayar',
        statusPengembalian: 'Pending'
    })
    if (!pengembalian) throw new NotFoundError('Data tidak ditemmukan')

    const updatedPengembalian = await Pengembalian.findOneAndUpdate(
        {_id: idPengembalian},
        {
            keadaanBuku: kondisiBuku,
            // dendaFisik: dendaFisikBaru,
            // totalDenda: totalDendaBaru
        },
        {new: true, runValidators: true}
    )

    return {data: updatedPengembalian}
    // return {data: pengembalian}
}