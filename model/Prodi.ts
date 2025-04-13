import mongoose from "mongoose";

const ProdiSchema = new mongoose.Schema({
    nama: String,
    email: {
        type: String,
        unique: String
    },
    password: String,
    role: {
        type: String,
        default: 'Prodi'
    },
    noHp: String,
    statusAkun: {
        type: String,
        enum: ['Nonaktif', 'Pending', 'Aktif'],
        default: 'Pending'
    },
    fotoProfil: String,
}, {timestamps: true})

export interface ProdiInterfaceModel {
    nama: string,
    email: string,
    password: string,
    role: 'Prodi',
    statusAkun: 'Nonaktif' | 'Pending' | 'Aktif'
}

export default mongoose.model('Prodi', ProdiSchema)