import mongoose from "mongoose";

const simpanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna',
        required: true
    },
    bukuDisimpan: [
        {
            judulBuku: {
                type: String,
                required: true
            },
            buku: {
                type: mongoose.Types.ObjectId,
                ref: 'Buku'
            }
        }
    ]
})

export default mongoose.model('Simpan', simpanSchema)