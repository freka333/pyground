import dbConnect from "@/lib/mongoose"
import User from "@/models/User";
import Mission from "@/models/Mission";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            const userFromDb = await User.findOne({ _id: req.body.id });
            userFromDb.xp = userFromDb.xp + req.body.point;

            const taskIndex = userFromDb.completedTasks.findIndex(task => task.task.toString() === req.body.taskId);
            userFromDb.completedTasks[taskIndex].completed = true;

            const missionFromDb = await Mission.findOne({ _id: req.body.missionId });
            const missionTaskIndex = missionFromDb.tasks.findIndex(task => task._id.toString() === req.body.taskId);
            if (missionTaskIndex > -1 && missionFromDb.tasks[missionTaskIndex + 1]) {
                userFromDb.completedTasks.push({
                    mission: missionFromDb._id,
                    task: missionFromDb.tasks[missionTaskIndex + 1]._id,
                    completed: false
                })
            }
            else {
                if (missionTaskIndex > -1 && missionFromDb.num + 1) {
                    const nextMissionFromDb = await Mission.findOne({ num: missionFromDb.num + 1 })
                    userFromDb.completedTasks.push({
                        mission: nextMissionFromDb._id,
                        task: nextMissionFromDb.tasks[0]._id,
                        completed: false
                    })
                    userFromDb.badges.push(missionFromDb._id.toString())
                }
            }

            await userFromDb.save();
            res.status(200).json({ taskIndex: taskIndex });
            break
        }
        default: {
            res.status(405).end() // Method not allowed
            break
        }
    }
}