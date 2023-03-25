import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    initialized: Boolean,
    xp: Number,
    nickname: String,
    character: ObjectId,
    completedTasks: [{
        mission: mongoose.Schema.Types.ObjectId,
        task: mongoose.Schema.Types.ObjectId,
        completed: Boolean,
    }],
    badges: [String],
})

export default mongoose.models.User || mongoose.model('User', userSchema)