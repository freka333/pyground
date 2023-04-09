import dbConnect from "@/lib/mongoose"
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            const userFromDb = await User.findOne({ _id: req.body.id });
            const taskIndex = userFromDb.completedTasks.findIndex(task => task.task.toString() === req.body.taskId);
            userFromDb.completedTasks[taskIndex].status = "started";
            await userFromDb.save();
            res.status(200).json({ status: userFromDb.completedTasks[taskIndex].status });
            break
        }
        default: {
            res.status(405).end() // Method not allowed
            break
        }
    }
}