import { Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import FirstCompletedDialog from "./FirstCompletedDialog";
import MissionComplete from "./MissionComplete";
import TaskFooter from "./TaskFooter";
import ContainerBox from "./ContainerBox";

const findTaskIndex = (mission, task) => {
    const index = mission.tasks.findIndex(t => t._id === task._id)
    return mission.tasks[index + 1]
}

export default function LessonContent({ user, mission, task, missionIdList }) {
    const router = useRouter();
    const [openMissionComplete, setOpenMissionComplete] = useState(false);
    const [openFirstDialog, setOpenFirstDialog] = useState(false);

    const nextTask = findTaskIndex(mission, task);

    const openNextTask = () => {
        router.push(`/${mission.title}/${nextTask.path}`);
    }

    const handleGivenTask = (taskPath) => {
        router.push(`/${mission.title}/${taskPath}`)
    }

    const handleNextTask = async () => {
        if (task.state === 'started') {
            const data = {
                id: user.id,
                taskId: task._id,
                missionId: mission._id,
                point: task.point || 10,
            }
            const responseTaskCompleted = await fetch('/api/user/taskCompleted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            await responseTaskCompleted.json();

            if (mission.num === 1 && task._id === mission.tasks[0]._id) {
                setOpenFirstDialog(true);
                return
            }
        }

        if (nextTask) {
            openNextTask();
        }
        else {
            setOpenMissionComplete(true);
        }
    }

    return (
        <>
            <ContainerBox display='grid'>
                <Paper sx={{ width: '70%', borderRadius: 0, padding: '20px', backgroundColor: 'lightPurpleGrey.main', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Typography variant='h4'>{task.title}</Typography>
                    <div style={{ fontFamily: 'Calibri, sans-serif', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: task.description }} />
                </Paper>
            </ContainerBox>
            <TaskFooter island={mission} currentTask={task} nextTaskState={nextTask?.state} handleNextTask={handleNextTask} handleGivenTask={handleGivenTask} />
            <MissionComplete open={openMissionComplete} island={mission} missionIdList={missionIdList} />
            <FirstCompletedDialog open={openFirstDialog} handleClick={openNextTask} />
        </>
    )
}