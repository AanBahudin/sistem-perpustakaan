import mongoose from "mongoose";

const PengembalianSchema = new mongoose.Schema({
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
    judulBuku: {
        type: String,
        required: true
    },
    tanggalPengembalian: {
        type: Date,
    },
    durasiKeterlambatan: {
        type: Number,
        required: true
    },
    statusPengembalian: {
        type: String,
        enum: ['Dikembalikan', 'Pending'],
        default: 'Pending'
    },
    keadaanBuku: {
        type: String,
        default: "Normal"
    },
    dendaKeterlambatan: {
        type: Number,
        default: 0
    },
    dendaFisik: {
        type: Number,
        default: 0
    },
    catatan: {
        type: String
    },
    dendaKehilangan: {
        type: Number,
        default: 0
    },
    totalDenda: {
        type: Number,
        default: 0,
        required: true
    },
    statusPembayaran: {
        type: String,
        enum: ['Dibayar', 'Belum Bayar'],
        default: 'Belum Bayar'
    },
    isMissing: {
        type: Boolean,
        default: false
    },
    diprosesOleh: {
        type: mongoose.Types.ObjectId,
        ref: 'Pustakawan'
    }
}, {timestamps: true})
export default mongoose.model('Pengembalian', PengembalianSchema)