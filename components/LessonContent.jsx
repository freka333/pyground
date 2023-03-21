import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import MissionComplete from "./MissionComplete";
import TaskFooter from "./TaskFooter";

export default function LessonContent({ user, characters, mission, task }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleNextTask = () => {
        const serialNum = mission.tasks.findIndex(t => t._id === task._id)
        const nextTask = mission.tasks[serialNum + 1]
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
                    <Typography>{task.title}</Typography>
                    <Typography>{task.description}</Typography>
                    <Typography fontSize='30px'>abc fdkfjdfjd ff scskdms vdobjrfogr</Typography>
                    <Typography fontSize='30px'>abc fdkfjdfjd ff scskdms vdobjrfogr</Typography>
                    <Typography fontSize='30px'>abc fdkfjdfjd ff scskdms vdobjrfogr</Typography>
                    <Typography fontSize='30px'>abc fdkfjdfjd ff scskdms vdobjrfogr</Typography>
                    <Typography fontSize='30px'>abc fdkfjdfjd ff scskdms vdobjrfogr</Typography>
                    <Typography fontSize='30px'>abc fdkfjdfjd ff scskdms vdobjrfogr</Typography>
                </Paper>
            </Box>
            <TaskFooter island={mission} currentTaskId={task._id} handleNextTask={handleNextTask} />
            <MissionComplete open={open} />
        </>
    )
}