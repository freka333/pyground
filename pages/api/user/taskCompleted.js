import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import Mission from "@/models/Mission";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            const userFromDb = await User.findOne({ _id: req.body.id });

            const taskIndex = userFromDb.completedTasks.findIndex(task => task.task.toString() === req.body.taskId);
            userFromDb.completedTasks[taskIndex].status = "completed";
            const point = userFromDb.completedTasks[taskIndex].checked_the_solution ? req.body.point - 5 : req.body.point;
            userFromDb.xp = userFromDb.xp + point;

            const missionFromDb = await Mission.findOne({ _id: req.body.missionId });
            const missionTaskIndex = missionFromDb.tasks.findIndex(task => task._id.toString() === req.body.taskId);
            //if the following task exists:
            if (missionTaskIndex > -1 && missionFromDb.tasks[missionTaskIndex + 1]) {
                userFromDb.completedTasks.push({
                    mission: missionFromDb._id,
                    task: missionFromDb.tasks[missionTaskIndex + 1]._id,
                    status: "started",
                    checked_the_solution: false
                })
            }
            //if this was the last task in the mission:
            else {
                const nextNum = missionFromDb.num + 1;
                const nextMissionFromDb = await Mission.findOne({ num: nextNum })
                //if there is another mission:
                if (missionTaskIndex > -1 && nextMissionFromDb && !nextMissionFromDb.disabled) {
                    userFromDb.completedTasks.push({
                        mission: nextMissionFromDb._id,
                        task: nextMissionFromDb.tasks[0]._id,
                        status: "new",
                        checked_the_solution: false
                    })
                }
                userFromDb.badges.push(missionFromDb._id.toString())
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