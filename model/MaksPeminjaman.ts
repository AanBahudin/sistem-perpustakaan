import mongoose from "mongoose";

const MaksPeminjaman = new mongoose.Schema({
    maksimal: {
        type: Number,
        required: true
    }
})

export default mongoose.model('MaksimalPeminjaman', MaksPeminjaman)