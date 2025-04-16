import mongoose, { ObjectId } from "mongoose";

export type BukuSchemaType = {
    judul: string,
    penulis?: string,
    penerbit?: string,
    tahunTerbit?: string,
    deskripsi: string,
    cover?: string,
    ISBN?: string,
    stok?: number,
    kategori: string,
    status: 'Tidak Tersedia' | 'Tersedia',
    totalDipinjam: number,
    totalDilihat: number,
    totalDisukai: number,
    createdBy: ObjectId

}

const BukuSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    penulis: {
        type: String,
        default: 'Tidak diketahui'
    },
    penerbit: {
        type: String,
        default: 'Tidak diketahui'
    },
    tahunTerbit: {
        type: String,
        default: '2024'
    },
    deskripsi: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    stok: {
        type: Number,
        default: 1
    },
    kategori: [{
        type: String
    }],
    // kategori: {
    //     type: String,
    //     default: 'Pemrograman'
    // },
    status: {
        type: String,
        enum: ['Tidak Tersedia', 'Tersedia'],
        default: 'Tersedia'
    },
    totalDipinjam: {
        type: Number,
        default: 0
    },
    totalDilihat: {
        type: Number,
        default: 0
    },
    totalDisukai: {
        type: Number,
        default: 0
    },
    dihapus: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Pustakawan'
    }
}, { timestamps: true })

export default mongoose.model('Buku', BukuSchema)