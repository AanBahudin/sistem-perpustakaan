import mongoose from "mongoose";

const KondisiSchema = new mongoose.Schema({
    kondisi: {
        type: String,
        unique: true,
        required: true
    },
    denda: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Pustakawan',
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Kondisi', KondisiSchema)