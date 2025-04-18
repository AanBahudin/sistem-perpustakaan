import mongoose, { SchemaOptions } from "mongoose";

const PeminjamanSchema = new mongoose.Schema({
    peminjam: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna',
        required: true
    },
    buku: {
        type: mongoose.Types.ObjectId,
        ref: 'Buku',
        required: true
    },
    statusPeminjaman: {
        type: String,
        enum: ['Dipinjam', 'Dikembalikan', 'Terlambat', 'Diajukan', 'Ditolak'],
        default: 'Dipinjam'
    },
    durasiPeminjaman: {
        type: Number,
        required: true
    },
    berakhirPada: {
        type: Date
    },
    kondisi: {
        type: String,
        enum: [
            'Normal',    // Buku dalam kondisi baik
            'Rusak',     // Buku rusak secara fisik
            'Hilang',    // Buku hilang
            'Baik',      // Buku dalam kondisi fisik yang baik
            'Luntur',    // Buku dengan warna pudar
            'Kusam',     // Sampul buku yang kusam
            'Terpotong', // Buku yang terpotong sebagian
            'Kotor',     // Buku yang kotor atau bernoda
            'Tidak Lengkap' // Buku yang beberapa bagiannya hilang
        ],
        default: 'Normal'
    },
    disetujui: {
        type: Boolean,
        default: false
    },
    catatan: String,
    diprosesOleh: {
        type: mongoose.Types.ObjectId,
        ref: 'Pustakawan'
    },
    dataPengembalian: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengembalian'
    }
}, {timestamps: true})

export default mongoose.model('Peminjaman', PeminjamanSchema)