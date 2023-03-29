import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema({
    num: Number,
    title: String,
    image: String,
    badge_name: String,
    badge_img: String,
    tasks: [{
        path: String,
        kind: String,
        title: String,
        description: String,
        defaultCode: String,
        correctAnswer: [{
            type: String,
            value: String
        }],
        point: Number,
    }],
    disabled: Boolean,
})

export default mongoose.models.Mission || mongoose.model('Mission', MissionSchema)