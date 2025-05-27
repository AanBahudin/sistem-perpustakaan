import mongoose from "mongoose";

const SukaSchema =  new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Pengguna',
        required: true
    },
    bukuDisukai: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Buku'
        }
    ]
}, {timestamps: true})

export default mongoose.model('Suka', SukaSchema)