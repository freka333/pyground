import mongoose from 'mongoose'

const testUserSchema = new mongoose.Schema({
    name: String,
    age: Number
})

export default mongoose.models.Test || mongoose.model('Test', testUserSchema)