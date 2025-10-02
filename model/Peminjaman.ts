import mongoose, { SchemaOptions } from "mongoose";

const PeminjamanSchema = new mongoose.Schema({
    peminjam: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna',
        required: true
    },
    judulBuku: {
        type: String,
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
    },
    disetujui: {
        type: Boolean,
        default: false
    },
    alasan: {
        type: String,
        required: true,
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