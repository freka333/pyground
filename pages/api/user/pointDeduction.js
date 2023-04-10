import dbConnect from "@/lib/mongoose"
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            if (req.body.openedSolution) {
                const userFromDb = await User.findOne({ _id: req.body.id });

                const taskIndex = userFromDb.completedTasks.findIndex(task => task.task.toString() === req.body.taskId);
                userFromDb.completedTasks[taskIndex].checked_the_solution = true;

                await userFromDb.save();

                res.status(200).json({ checked_the_solution: userFromDb.completedTasks[taskIndex].checked_the_solution });
                break
            }
            res.status(200).json("nothing changed");
            break
        }
        default: {
            res.status(405).end() // Method not allowed
            break
        }
    }
}