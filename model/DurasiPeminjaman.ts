import mongoose, { model } from 'mongoose'

const DurasiSchema = new mongoose.Schema({
    durasi: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Durasi', DurasiSchema)