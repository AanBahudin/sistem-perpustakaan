import mongoose from "mongoose";

const PengembalianSchema = new mongoose.Schema({
    idPeminjaman: {
        type: mongoose.Types.ObjectId,
        ref: 'Peminjaman'
    },
    idPengguna: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna'
    },
    tanggalPengembalian: {
        type: Date,
        default: Date.now
    },
    statusPengembalian: {
        type: String,
        enum: ['Dikembalikan', 'Terlambat', 'Rusak'],
        default: 'Dikembalikan'
    },
    denda: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('Pengembalian', PengembalianSchema)