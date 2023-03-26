import Editor, { loader } from "@monaco-editor/react";
import { Box, Button, Grid, Typography } from "@mui/material"
import Stack from '@mui/material/Stack';
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import themeData from "monaco-themes/themes/Night Owl.json";
import PlayCircle from '@mui/icons-material/PlayCircle';
import RestartAlt from '@mui/icons-material/RestartAlt';
import MissionComplete from "./MissionComplete";
import TaskFooter from "./TaskFooter";
const theme = "night-owl";

const findTaskIndex = (mission, task) => {
    const serialNum = mission.tasks.findIndex(t => t._id === task._id)
    return mission.tasks[serialNum + 1]
}

export default function ExerciseContent({ user, mission, task }) {
    const editorRef = useRef(null);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const [value, setValue] = useState('print("Python!")');
    const [result, setResult] = useState(null);

    const nextTask = findTaskIndex(mission, task);

    const handleEditorChange = (value) => {
        setValue(value);
    };

    const handleRunClick = async () => {
        console.log(value)

        const response = await fetch('/api/python', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: value }),
        });
        const result = await response.json();

        if (task.state === "started") {
            const data = {
                id: user.id,
                taskId: task._id,
                missionId: mission._id,
                point: 10,
            }
            const responseTaskCompleted = await fetch('/api/user/taskCompleted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            await responseTaskCompleted.json();
            if (responseTaskCompleted.status < 300) {
                refreshData();
            }
        }
        setResult(result);
    }

    const handleGivenTask = (taskPath) => {
        router.push(`/${mission.title}/${taskPath}`)
    }

    const handleNextTask = () => {
        const serialNum = mission.tasks.findIndex(t => t._id === task._id)
        const nextTask = mission.tasks[serialNum + 1]
        if (nextTask && nextTask.state !== "locked") {
            router.push(`/${mission.title}/${nextTask.path}`)
        }
        else if (!nextTask) {
            setOpen(true);
        }
    }

    useEffect(() => {
        const defineTheme = async () => {
            const monaco = await loader.init();
            monaco.editor.defineTheme(theme, themeData);
        };

        defineTheme();
    }, [])

    useEffect(() => {
        const onResize = () => {
            editorRef.current.layout({});
        }
        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [])

    return (
        <>
            <Grid container backgroundColor='#bfb2cc' padding='10px' height='100%' overflow='hidden' >
                <Grid item xs={4} display='grid' height='100%'>
                    <Box borderRadius='15px' sx={{ backgroundColor: '#f0ebf6' }} marginRight='10px' display='flex' flexDirection='column' overflow='hidden' >
                        <Box backgroundColor='#534660' borderRadius='15px 15px 0 0' padding='5px' color='#ede5f4'>
                            <Typography fontSize='15px' align="center">{mission.title}</Typography>
                            <Typography fontSize='20px' align="center">{task.title}</Typography>
                        </Box>
                        <Box padding='10px' overflow='auto'>
                            <div style={{ fontFamily: 'Calibri, sans-serif', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: task.description }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8} height='100%' display='flex' flexDirection='column'>
                    <Stack height='60%'>
                        <Grid container backgroundColor='#011627' borderRadius='20px 15px 0 0' justifyContent='space-between' paddingBottom='7px'>
                            <Grid item backgroundColor='#534660' borderRadius='20px 0' padding='10px' >
                                <Typography color='#ede5f4'>Kódszerkesztő</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" endIcon={<PlayCircle />} sx={{ backgroundColor: 'secondary.main' }} style={{ borderRadius: 15 }} onClick={handleRunClick}>
                                    Futtatás
                                </Button>
                                <Button variant="contained" endIcon={<RestartAlt />} sx={{ backgroundColor: 'secondary.main' }} style={{ borderRadius: 15, margin: 5 }} >
                                    Kód alaphelyzetbe állítása
                                </Button>
                            </Grid>
                        </Grid>
                        <Editor
                            height='100%'
                            language={'python'}
                            value={value}
                            theme={theme}
                            onChange={handleEditorChange}
                            onMount={editor => { editorRef.current = editor }}
                            options={{ minimap: { enabled: false } }}
                        />
                    </Stack>
                    <Box backgroundColor='#2A173D' borderRadius='0 0 15px 15px' height='40%' padding='10px' color='white' overflow='auto'>
                        {result?.map((line, i) => (
                            <Typography key={i} color='white' whiteSpace='pre' fontFamily='monospace'>{line}</Typography>
                        ))}

                    </Box>
                </Grid>
            </Grid >
            <TaskFooter island={mission} isNextButton={nextTask && nextTask.state !== "locked"} currentTaskId={task._id} handleNextTask={handleNextTask} handleGivenTask={handleGivenTask} />
            <MissionComplete open={open} />
        </>
    )
}