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
    durasiKeterlambatan: {
        type: Number,
        required: true
    },
    statusPengembalian: {
        type: String,
        default: 'Dikembalikan'
    },
    keadaanBuku: {
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
        default: "Normal"
    },
    denda: {
        type: Number,
        default: 0
    },
    statusPembayaran: {
        type: String,
        enum: ['Dibayar', 'Belum Bayar'],
        default: 'Belum Bayar'
    }
}, {timestamps: true})

export default mongoose.model('Pengembalian', PengembalianSchema)