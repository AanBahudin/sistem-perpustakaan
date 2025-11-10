import { ObjectId } from "mongoose"
import { BadRequestError, NotFoundError } from "../errors/errorHandler"
import Buku from "../model/Buku"
import Peminjaman from "../model/Peminjaman"
import Pengembalian from "../model/Pengembalian"
import { 
    GetAllPengembalianDataParamsType, 
    GetOnePengembalianDataParamsType, 
    PustakawanAcceptPengembalianParamsType, 
    PustakawanCreatePengembalianParamsType, 
    PustakawanEditPengembalianParamsType,
    PustakawanGetOnePengembalianParamsType, 
    UserCreatePengembalianDataType} from "../types/pengembalianTypes"
import { hitungDendaFisik } from "../utils/hitungDendaFisik"
import { hitungKeterlambatan } from "../utils/selisihHari"
import { bukuDihilangkan, bukuDikembalikan } from "./BukuServices/UtilsBukuServices"
import { getDenda } from "./dendaServices"
import { pinjamanDikembalikan, updateDurasiPinjaman } from "./peminjamanServices"
import { 
    penggunaMengembalikan, 
    penggunaMengembalikanNew, 
    penggunaMenghilangkan, 
    tambahDendaPengguna } from "./penggunaServices"
import Pengguna from "../model/Pengguna"
import { notifyUser } from "../sockets/soket"


// SUDAH TESTING
export const getPengembalianUser = async({ userId, query } : GetAllPengembalianDataParamsType) => {
    if (query?.judulBuku) {
        query.judulBuku = { $regex: query.judulBuku, $options: "i" }; 
    }

    const totalPengembalian = await Pengembalian.find({idPengguna: userId}).countDocuments()
    const page = query.page || 1
    const limit = 10
    const totalPage = Math.ceil(totalPengembalian / 10)
    const skip = (page - 1) * limit
    
    if (query.page) delete query.page

    const pengembalian = await Pengembalian.find({idPengguna: userId, ...query})
        .populate(['idBuku', 'idPeminjaman'])
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip)

    return {data: pengembalian, totalPage}
}

// BELUM TESTING
export const getOnePengembalianUser = async({ pengembalianId, userId } : GetOnePengembalianDataParamsType ) => {
    const pengembalian = await Pengembalian.findOne({_id: pengembalianId, idPengguna: userId}).populate(['idPeminjaman', 'idPengguna', 'idBuku'])
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')

    return {data: pengembalian}
}

// export const userCreatePengembalianInfo = async({peminjamanId, userId} : UserCreatePengembalianDataType) => {
//     // cari data peminjaman
//     const dataPeminjaman = await Peminjaman.findOne({_id: peminjamanId})
//     if (!dataPeminjaman) {
//         throw new NotFoundError('Peminjaman tidak ditemukan')
//     }

//     // cek status buku yang di bolehkan untuk dikembalikan
//     const statusDiizinkan = ['Dipinjam', 'Terlambat']
//     if (!statusDiizinkan.includes(dataPeminjaman.statusPeminjaman)) {
//         throw new BadRequestError('Buku tidak dapat dikembalikan')
//     }

//     // cek data pengembalian apakah sudah ada atau tidak
//     // jika data pengembalian sudah ada maka perbaharui, tetapi jika data pengembalian belum ada maka dibuat ulang
//     const dataPengembalian = await Pengembalian.findOne({idPeminjaman: peminjamanId})
//     if (!dataPengembalian) {
//         await createPengembalian({dataPeminjaman})
//     } else {
//         await updatePengembalian({idPengembalian : dataPengembalian._id})
//     }
// }


// SUDAH TESTING
export const pustakawanGetDataPengembalian = async() => {
    const pengembalian = await Pengembalian.find()

    return {data: pengembalian}
}

// SUDAH TESTING
export const getOneDataPengembalian = async({ pengembalianId } : PustakawanGetOnePengembalianParamsType) => {
    const pengembalian = await Pengembalian.findOne({_id: pengembalianId})
        .populate({
            path: 'idPengguna',
            select: 'nama email idKampus role jurusan noHp fotoProfil'
        })
        .populate({
            path: 'idPeminjaman',
        })
        .populate({
            path: 'idBuku'
        })
        .populate({
            path: 'diprosesOleh',
            select: 'nama email'
        })
        .populate(['idPeminjaman', 'idBuku', 'diprosesOleh'])
    if (!pengembalian) throw new NotFoundError('Data pengembalian tidak ditemukan')


    if (pengembalian.statusPengembalian === 'Pending' || pengembalian.statusPembayaran === 'Belum Bayar') {
        const peminjaman = await Peminjaman.findOne({_id: pengembalian.idPeminjaman})

        const totalHariTerlambat = hitungKeterlambatan(peminjaman?.berakhirPada as Date)
        const nominalDendaTerlambat = await getDenda()
        const totalDendaKeterlambatan = nominalDendaTerlambat as number * totalHariTerlambat

        const totalDenda = totalDendaKeterlambatan + pengembalian.dendaFisik

        const newPengembalian = await Pengembalian.findOneAndUpdate({_id: pengembalianId}, {
            totalDenda,
            durasiKeterlambatan: totalHariTerlambat,
            dendaKeterlambatan: totalDendaKeterlambatan
        }, {new: true, runValidators: true})
            .populate({
                path: 'idPengguna',
                select: 'nama email idKampus role jurusan noHp fotoProfil'
            })
            .populate({
                path: 'idPeminjaman',
            })
            .populate({
                path: 'idBuku'
            })
            .populate({
                path: 'diprosesOleh',
                select: 'nama email'
            })
            .populate(['idPeminjaman', 'idBuku', 'diprosesOleh'])

        return {data: newPengembalian}
    }
    
    return {data: pengembalian}
}

// SUDAH TESTING
export const pustakawanBuatDataPengembalian = async({dataBody} : PustakawanCreatePengembalianParamsType) => {

    // pecah data dari req.body
    const {idPeminjaman} = dataBody
    console.log(dataBody)

    // cari data pinjaman
    const pinjaman = await Peminjaman.findOne({_id: idPeminjaman})
    if (!pinjaman) throw new NotFoundError('Data pinjaman tidak ditemukan')

    // cek data buku
    const buku = await Buku.findOne({_id: pinjaman.buku})
    if (!buku) throw new NotFoundError('Terjadi kesalahan, data buku tidak ditemukan')

    // cek status peminjaman agar dapat diproses
    const statusYangDiizinkan = ['Dipinjam', 'Terlambat']
    if (!statusYangDiizinkan.includes(pinjaman.statusPeminjaman)) throw new BadRequestError('Tidak dapat melakukan pengembalian')

    // mengecek apakah pinjaman sudah diproses sebelumnya / pinjaman sudah memiliki data pengembalian
    const isPengembalianAlreadyExists = await Pengembalian.findOne({
        idPeminjaman: pinjaman._id,
        idBuku: buku._id,
        idPengguna: pinjaman.peminjam,
        statusPengembalian: 'Pending'
    });

    // JIKA ADA MAKA PENGEMBALIAN DI UPDATE
    if (isPengembalianAlreadyExists) {
        return updatePengembalian({
            dataPengembalian: dataBody,
            dataPeminjaman: pinjaman, 
            dataBuku: buku, 
            idPengembalian: isPengembalianAlreadyExists._id})
    } else {
        return createPengembalian({
            dataPengembalian: dataBody,
            dataPeminjaman: pinjaman,
            dataBuku: buku
        })
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
        await penggunaMenghilangkan({idPengguna: updatedPengembalian.idPengguna as string})
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

export const setujuiPengembalianPutakawan = async({idPengembalian, pustakawanId} : {idPengembalian: string, pustakawanId: string}) => {
    // perbaharui data pengembalian
    const updatePengembalian = await Pengembalian.findOneAndUpdate(
        {_id: idPengembalian},
        {statusPembayaran: 'Dibayar', diprosesOleh: pustakawanId, statusPengembalian: 'Dikembalikan', tanggalPengembalian: new Date(Date.now())},
        {new: true, runValidators: true}
    )

    if (!updatePengembalian) {
        throw new NotFoundError('Data pengembalian tidak ditemukan')
    }
    // perbaharui total pinjaman pengguna di model Pengguna
    await penggunaMengembalikanNew({
        idPengguna: updatePengembalian.idPengguna as string, 
        dataPengembalian: updatePengembalian
    })

    // perbahraui data peminjaman
    await Peminjaman.findOneAndUpdate(
        {_id: updatePengembalian.idPeminjaman},
        {statusPeminjaman: 'Dikembalikan', dataPengembalian: updatePengembalian._id}
    )
    
    // perbaharaui buku, jika buku dikembalikan dalam kondisi hilang
    if (updatePengembalian.isMissing) {
        await bukuDihilangkan(updatePengembalian.idBuku as string)
        await penggunaMenghilangkan({idPengguna: updatePengembalian.idPengguna as string})
    } else {
        await bukuDikembalikan(updatePengembalian.idBuku as string)
    }


    notifyUser({
        userId: updatePengembalian.idPengguna.toString() as string,
        event: 'PENGEMBALIAN_PEMINJAMAN',
        payload: {
            untuk: 'PENGGUNA',
            tipe: 'PENGEMBALIAN',
            title: 'Pengembalian Berhasil',
            deskripsi: 'Lihat data pengembalian anda',
            data: updatePengembalian
        }
    })
    
    return updatePengembalian
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


const createPengembalian = async({dataPengembalian, dataPeminjaman, dataBuku} : {dataPengembalian: any, dataPeminjaman: any, dataBuku: any}) => {

    const { idPeminjaman, kondisiBuku, statusHilang, catatan } = dataPengembalian

    // menghitung jumlah hari dan denda keterlambatan
    const totalHariTerlambat = hitungKeterlambatan(dataPeminjaman.berakhirPada as Date)
    const nominalDendaTerlambat = await getDenda()
    const totalDendaKeterlambatan = nominalDendaTerlambat as number * totalHariTerlambat

    // menghitung denda fisik
    const dendaFisik = await hitungDendaFisik({
        kondisiAwal: dataPeminjaman.kondisi as string,
        kondisiAkhir: kondisiBuku,
        idBuku: dataPeminjaman.buku as string,
        statusHilang
    })

    // cek apakah buku yang dikembalikan hilang. jika buku yang dikembalikan hilang, maka denda fisik diganti dengan denda kehilangan buku / harga buku
    const isDendaHilangExist = statusHilang ? Number(dataBuku.hargaGanti) : dendaFisik

    // gabung semua jenis denda
    let totalDenda = totalDendaKeterlambatan + isDendaHilangExist

    // // buat data pengembalian
    const pengembalian = await Pengembalian.create({
        idPeminjaman: idPeminjaman,
        idPengguna: dataPeminjaman.peminjam,
        idBuku: dataPeminjaman.buku,
        catatan,
        isMissing: statusHilang,
        durasiKeterlambatan: totalHariTerlambat,
        keadaanBuku: statusHilang ? 'Hilang' : kondisiBuku,
        dendaKeterlambatan: totalDendaKeterlambatan,
        dendaFisik: isDendaHilangExist,
        judulBuku: dataBuku.judul,
        totalDenda
    })

    return {
        success: true, 
        message: 'Data pengembalian ditemukan',
        data: pengembalian
    }
}

// perbaharui pengembalian
const updatePengembalian = async({dataPengembalian, idPengembalian, dataPeminjaman, dataBuku} : {dataPeminjaman: any, dataBuku: any, idPengembalian: any, dataPengembalian: any}) => {
    
    const { idPeminjaman, kondisiBuku, statusHilang, catatan } = dataPengembalian

    // menghitung jumlah hari dan denda keterlambatan
    const totalHariTerlambat = hitungKeterlambatan(dataPeminjaman.berakhirPada as Date)
    const nominalDendaTerlambat = await getDenda()
    const totalDendaKeterlambatan = nominalDendaTerlambat as number * totalHariTerlambat

    // menghitung denda fisik
    const dendaFisik = await hitungDendaFisik({
        kondisiAwal: dataPeminjaman.kondisi as string,
        kondisiAkhir: kondisiBuku,
        idBuku: dataPeminjaman.buku as string,
        statusHilang
    })

    // cek apakah buku yang dikembalikan hilang. jika buku yang dikembalikan hilang, maka denda fisik diganti dengan denda kehilangan buku / harga buku
    // const isDendaHilangExist = statusHilang ? Number(dataBuku.hargaGanti || 100000) : dendaFisik

    // gabung semua jenis denda
    let totalDenda = totalDendaKeterlambatan + dendaFisik

    // // buat data pengembalian
    const pengembalian = await Pengembalian.findOneAndUpdate({_id: idPengembalian}, {
        idPeminjaman: idPeminjaman,
        idPengguna: dataPeminjaman.peminjam,
        idBuku: dataPeminjaman.buku,
        isMissing: statusHilang,
        catatan: catatan,
        durasiKeterlambatan: totalHariTerlambat,
        keadaanBuku: statusHilang ? 'Hilang' : kondisiBuku,
        dendaKeterlambatan: totalDendaKeterlambatan,
        dendaFisik: dendaFisik,
        judulBuku: dataBuku.judul,
        totalDenda
    }, {new: true, runValidators: true})

    return {
        success: true, 
        message: 'Data pengembalian ditemukan',
        data: pengembalian
    }
}


// digunakan di services lain
export const getTotalBukuHilangByUser = async({idPengguna} : {idPengguna: string}) => {
    const dataHilang = await Pengembalian.find({idPengguna, isMissing: true})
    return dataHilang
}

export const getPengembalianHilangByBukuId = async({idBuku} : {idBuku: string}) => {
    const buku = await Pengembalian.find({idBuku, isMissing: true})
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN stok',
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })
    return buku
}

export const getPengembalianByUserId = async({idPengguna} : {idPengguna: string}) => {
    const pengembalian = await Pengembalian.find({idPengguna: idPengguna}).populate(['idBuku', 'idPengguna'])
    return pengembalian
}

export const getPengembalianByBukuId = async({idBuku} : {idBuku: string}) => {
    const pengembalian = await Pengembalian.find({idBuku})
        .select('idBuku idPengguna idPeminjaman _id tanggalPengembalian keadaanBuku isMissing')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN',
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })
    
    return pengembalian
}