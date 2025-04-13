import mongoose from "mongoose";

export interface IPengguna {
    _id: string,
    nama: string;
    kelas?: string;
    jurusan?: string;
    angkatan?: number;
    email: string;
    statusAkun?: 'Nonaktif' | 'Pending' | 'Aktif';
    password: string;
    fotoProfil?: string;
    no_hp?: string;
    role: 'Dosen' | 'Mahasiswa';
    jumlah_pinjaman?: number;
    totalDenda?: number;
    verifikasiEmail?: boolean;
    verifikasiProdi?: boolean;
    blocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

const PenggunaSchema = new mongoose.Schema({
    nama: String,
    kelas: {
        type: String,
        default: 'A'
    },
    idKampus: {
        type: String,
        unique: true
    },
    jurusan: {
        type: String,
        default: 'Teknik Informatika'
    },
    angkatan: Number,
    email: {
        type: String,
        unique: true
    },
    statusAkun: {
        type: String,
        enum: ['Nonaktif', 'Pending', 'Aktif'],
        default: 'Nonaktif'
    },
    password: String,
    fotoProfil: String,
    no_hp: String,
    role: {
        type: String,
        enum: ['Dosen', 'Mahasiswa']
    },
    jumlah_pinjaman: {
        type: Number,
        default: 0
    },
    totalDenda: {
        type: Number,
        default: 0
    },
    verifikasiEmail : {
        type: Boolean,
        default: false
    },
    verifikasiProdi : {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('Pengguna', PenggunaSchema)