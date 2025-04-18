import mongoose, { ObjectId } from "mongoose";

const PustakawanSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Pustakawan',
        required: true
    },
    no_hp: {
        type: String,
        required: true
    },
    statusAkun: {
        type: String,
        enum: ['Nonaktif', 'Pending', 'Aktif'],
        default: 'Aktif'
    },
    fotoProfil: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Prodi',
        required: true
    }
}, {timestamps: true})

export interface PustakawanInterface {
    _id: string | ObjectId,
    nama: string,
    email: string,
    password: string,
    role: 'Pustakawan',
    no_hp?: string,
    statusAkun: 'Nonaktif' | 'Pending' | 'Aktif',
    fotoProfil?: string,
    createdBy : string | ObjectId
}

export default mongoose.model('Pustakawan', PustakawanSchema)