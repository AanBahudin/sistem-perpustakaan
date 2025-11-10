import { BadRequestError, NotAuthenticated, NotFoundError } from '../errors/errorHandler'
import sendUpdateEmailVerification from '../helpers/sendUpdateEmailVerification'
import Pengguna from '../model/Pengguna'
import renderError from '../utils/renderError'
import { GetProfileParamsServiceType, PenggunaMeminjamParamsType, TambahDendaPenggunaTypes, UpdateEmailParamsServicesType, UpdatePasswordParamsServicesType, UpdateProfilParamsServicesType } from '../types/penggunaTypes'
import { comparePassword, hashPassword } from '../utils/passwordUtils'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'
import { getSemuaDataPeminjamanAktifUserById, getSemuaDataPeminjamanUserById } from './PeminjamanServices/pengguna/PeminjamanUserUtils'
import { getSemuaPerpanjanganUserById } from './PerpanjanganServices/PerpanjanganUserUtils'
import { getTotalBukuDihilangkan, getTotalPengembalian } from './PengembalianServices/PengembalianUserUtils'


// SUDAH DITESTING
export const getProfil = async({userId} : GetProfileParamsServiceType) => {
    const profil = await Pengguna.findOne({_id: userId})
    return profil
}

// SUDAH DITESTING
export const updateProfil = async({userId, dataUpdate} : UpdateProfilParamsServicesType) => {
    const updatedProfile = await Pengguna.findOneAndUpdate(
        {_id: userId},
        {...dataUpdate},
        {new: true, runValidators: true}
    ).select('-password')

    if (!updateProfil) {
        throw new NotFoundError('Profil tidak ditemukan')
    }

    return updatedProfile
}

export const photoUpdate = async(req: Request | any, res: Response) => {
    const {userId} = req.user

    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)

        req.body.fotoProfil = response.secure_url
        req.body.photoPublicId = response.public_id
    }

    const user = await Pengguna.findOne({_id: userId})
    if (req.file && user && user.photoPublicId) {
        await cloudinary.v2.uploader.destroy(user.photoPublicId)
    }
    const updatedUser = await Pengguna.findOneAndUpdate({_id: userId}, req.body, {runValidators: true, new: true})
    return updatedUser
}

// SUDAH DITESITNG
export const updatingPassword = async({userId, newPassword, oldPassword} : UpdatePasswordParamsServicesType) => {

    // memastikan password lama tidak sama dengan password baru
    if (newPassword === oldPassword) {
        throw new BadRequestError('Password baru tidak boleh sama dengan password lama')
    }

    // cari data pengguna terkait dan cek apakah data ada di database
    const pengguna = await Pengguna.findOne({_id: userId})
    if (!pengguna) {
        throw new NotFoundError('Pengguna tidak ditemukan')
    }

    // ambil password lama (sudah hash) untuk di cek apakah sama dengan password lama (yang dimasukan user)
    const {password: oldHashedPassword} = pengguna
    const isPasswordCorrect = await comparePassword(oldHashedPassword!, oldPassword);
    if (!isPasswordCorrect) {
        throw new NotAuthenticated('Password yang dimasukan salah')
    }

    // hash password baru
    const hashedPassword = await hashPassword(newPassword)

    // update password lama ke password baru
    const updatedUser = await Pengguna.findOneAndUpdate(
        {_id: userId},
        {password: hashedPassword},
        {new: true, runValidators: true}
    )

    // kembalikan data terbaru
    return updatedUser
}

// SUDAH DITESTING
export const updatingEmail = async({userId, newEmail} : UpdateEmailParamsServicesType) => {
    // ambil data pengguna terkait dan lakukan pengecekkan apakah data ada didatabase
    const user = await Pengguna.findOne({_id: userId})
    if (!user) {
        throw new NotFoundError('Profil tidak ditemukan')
    }
    // ambil nama dan email dari user
    const { nama, email } = user

    // pengecekkan memastikan email
    if (user.email === newEmail) {
        throw new BadRequestError('Email baru tidak boleh sama dengan email lama')
    }

    try {
        // kirim email ke user
        await sendUpdateEmailVerification({
            userId: userId, 
            nama: nama as string, 
            oldEmail: email as string,
            newEmail: newEmail, 
        })
    } catch (error) {
        // error ketika mengirim email / generate token verifikasi
        const errorMsg = renderError(error)
        throw new BadRequestError(errorMsg)
    }
}

export const userStats = async({userId} : {userId: string}) => {
    const {data: bukuTelahDipinjam, total: totalSemuaPeminjaman} = await getSemuaDataPeminjamanUserById({userId})
    const {data: peminjamanAktif, total: totalPeminjamanAktif} = await getSemuaDataPeminjamanAktifUserById({userId})
    const {data: perpanjangan, total: totalPerpanjangan} = await getSemuaPerpanjanganUserById({userId: userId})
    const {data: pengembalian, total: totalPengembalian} = await getTotalPengembalian({userId})
    const {data: bukuHilang, total: totalBukuHilang} = await getTotalBukuDihilangkan({userId})

    const summaryData = [
        {
            title: 'Total buku telah dipinjam',
            value: totalSemuaPeminjaman
        },
        {
            title: 'Peminjaman aktif',
            value: totalPeminjamanAktif
        },
        {
            title: 'Buku diperpanjang',
            value: totalPerpanjangan
        },
        {
            title: 'Buku dikembalikan',
            value: totalPengembalian
        },
        {
            title: 'Buku dihilangkan',
            value: totalBukuHilang
        },
        
    ]

    const data = {
        peminjaman: bukuTelahDipinjam,
        pengembalian,
        perpanjangan,
        peminjamanAktif: peminjamanAktif,
        bukuHilang,
        summaryData
    }

    return data
}


// FUNGSI PEMBANTU YANG DIGUNAKAN DI SERVICES LAIN

export const penggunaMengembalikan = async({ idPengguna } : PenggunaMeminjamParamsType) => {
    const pengguna = await Pengguna.findOneAndUpdate(
        {_id: idPengguna},
        {$inc: {jumlah_pinjaman: -1}},
        {new: true, runValidators: true}
    )
}

export const penggunaMengembalikanNew = async({idPengguna, dataPengembalian} : {idPengguna: string, dataPengembalian: any}) => {
    await Pengguna.findOneAndUpdate(
        { _id: idPengguna },
        [
            {
            $set: {
                jumlah_pinjaman: {
                $cond: [
                    { $gt: ["$jumlah_pinjaman", 0] }, 
                    { $subtract: ["$jumlah_pinjaman", 1] }, 
                    0
                ]
                },
                totalDenda: { $add: ["$totalDenda", dataPengembalian.totalDenda] }
            }
            }
        ],
        { new: true }
    )
}

export const penggunaMenghilangkan = async({idPengguna} : PenggunaMeminjamParamsType) => {
    const data = await Pengguna.findOneAndUpdate(
        {_id: idPengguna},
        {$inc: {bukuDihilangkan: 1}},
        {new: true, runValidators: true}
    )
}

export const penggunaMeminjam = async({ idPengguna } : PenggunaMeminjamParamsType) => {
    const pengguna = await Pengguna.findOneAndUpdate(
        {_id: idPengguna},
        {$inc: {jumlah_pinjaman: 1}},
        {new: true, runValidators: true}
    )
}

export const tambahDendaPengguna = async({ idPengguna, denda } : TambahDendaPenggunaTypes) => {
    const pengguna = await Pengguna.findOneAndUpdate(
        {_id: idPengguna},
        {$inc: {totalDenda: denda}},
        {new: true, runValidators: true}
    )
}