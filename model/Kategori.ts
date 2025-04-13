import mongoose from "mongoose";

const KategoriSchema = new mongoose.Schema({
    nama: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }
})

export default mongoose.model('Kategori', KategoriSchema)