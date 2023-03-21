import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    kind: String,
    image: String,
    icon: String
})

export default mongoose.models.Character || mongoose.model('Character', characterSchema)