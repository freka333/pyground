import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import MissionComplete from "./MissionComplete";
import TaskFooter from "./TaskFooter";

const findTaskIndex = (mission, task) => {
    const serialNum = mission.tasks.findIndex(t => t._id === task._id)
    return mission.tasks[serialNum + 1]
}

export default function LessonContent({ user, mission, task }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const nextTask = findTaskIndex(mission, task);

    const handleGivenTask = (taskPath) => {
        router.push(`/${mission.title}/${taskPath}`)
    }

    const handleNextTask = () => {
        if (nextTask) {
            router.push(`/${mission.title}/${nextTask.path}`)
        }
        else {
            setOpen(true);
        }
    }

    return (
        <>
            <Box className="mainPage" display='grid' overflow='auto' >
                <Paper sx={{ width: '70%', borderRadius: 0, padding: '20px', backgroundColor: '#EBE1F6', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Typography variant='h4'>{task.title}</Typography>
                    <div style={{ fontFamily: 'Calibri, sans-serif', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: task.description }} />
                </Paper>
            </Box>
            <TaskFooter island={mission} currentTaskId={task._id} isNextButton={true} handleNextTask={handleNextTask} handleGivenTask={handleGivenTask} />
            <MissionComplete open={open} />
        </>
    )
}