import mongoose from "mongoose";

const PerpanjanganSchema = new mongoose.Schema({
    idPeminjaman: {
        type: mongoose.Types.ObjectId,
        ref: 'Peminjaman',
        required: true
    },
    idPengguna: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna',
        required: true
    },
    idBuku: {
        type: mongoose.Types.ObjectId,
        ref: 'Buku',
        required: true
    },
    durasi: {
        type: Number,
        required: true
    },
    disetujui: {
        type: String,
        enum: ['Diterima', 'Pending', 'Ditolak'],
        default: 'Pending'
    },
    diprosesOleh: {
        type: mongoose.Types.ObjectId,
        ref: 'Pustakawan'
    },
    alasan: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model('Perpanjangan', PerpanjanganSchema)