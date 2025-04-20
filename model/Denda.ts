import mongoose from "mongoose";

const DendaSchema = new mongoose.Schema({
    denda: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Denda', DendaSchema)