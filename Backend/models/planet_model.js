import mongoose from "mongoose";

const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    distanceFromSun: {
        type: Number,
        required: true
    },
    orbitSpeed: {
        type: Number,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Planet', planetSchema);