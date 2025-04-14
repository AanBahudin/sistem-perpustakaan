import mongoose from "mongoose";

const PerpanjanganSchema = new mongoose.Schema({
    idPeminjaman: {
        type: mongoose.Types.ObjectId,
        ref: 'Peminjaman'
    },
    idPengguna: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna',
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
    disetujuiOleh: {
        type: mongoose.Types.ObjectId,
        ref: 'Pustakawan'
    },
    alasan: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model('Perpanjangan', PerpanjanganSchema)