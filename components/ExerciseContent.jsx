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
    const index = mission.tasks.findIndex(t => t._id === task._id)
    return mission.tasks[index + 1]
}

export default function ExerciseContent({ user, mission, task, missionIdList, defaultCode }) {
    const editorRef = useRef(null);
    const router = useRouter();
    const [openMissionComplete, setOpenMissionComplete] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const [editorValue, setEditorValue] = useState(defaultCode);
    const [result, setResult] = useState(null);

    const nextTask = findTaskIndex(mission, task);

    const handleEditorChange = (value) => {
        setEditorValue(value);
    };

    const handleRunClick = async () => {
        const response = await fetch('/api/python', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: editorValue, correctAnswer: task.correctAnswer, defaultCode: task.defaultCode }),
        });
        const result = await response.json();

        if (task.state === "started" && result.state === "completed") {
            const data = {
                id: user.id,
                taskId: task._id,
                missionId: mission._id,
                point: task.point,
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
        setResult(result.value);
    }

    const handleGivenTask = (taskPath) => {
        router.push(`/${mission.title}/${taskPath}`)
    }

    const handleNextTask = () => {
        const index = mission.tasks.findIndex(t => t._id === task._id)
        const nextTask = mission.tasks[index + 1]
        if (nextTask && nextTask.state !== "locked") {
            router.push(`/${mission.title}/${nextTask.path}`)
        }
        else if (!nextTask) {
            setOpenMissionComplete(true);
        }
    }

    const handleResetCode = () => {
        setEditorValue(defaultCode);
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
                                <Button variant="contained" onClick={handleRunClick} endIcon={<PlayCircle />} sx={{ borderRadius: '15px', backgroundColor: 'secondary.main', color: '#ebf3ef', ':hover': { backgroundColor: '#34cd75' } }}>
                                    Futtatás
                                </Button>
                                <Button variant="contained" onClick={handleResetCode} endIcon={<RestartAlt />} sx={{ borderRadius: '15px', margin: '5px', backgroundColor: 'secondary.main', color: '#ebf3ef', ':hover': { backgroundColor: '#34cd75' } }} >
                                    Kód alaphelyzetbe állítása
                                </Button>
                            </Grid>
                        </Grid>
                        <Editor
                            height='100%'
                            language={'python'}
                            value={editorValue}
                            theme={theme}
                            onChange={handleEditorChange}
                            onMount={editor => { editorRef.current = editor }}
                            options={{ minimap: { enabled: false } }}
                        />
                    </Stack>
                    <Box backgroundColor='#2A173D' height='40%' padding='10px' color='white' overflow='auto'>
                        {result?.map((line, i) => (
                            <Typography key={i} color='white' whiteSpace='pre' fontFamily='monospace'>{line}</Typography>
                        ))}
                    </Box>
                    <Box backgroundColor='#2A173D' borderRadius='0 0 20px 20px' display='flex' justifyContent='flex-end'>
                        <Box backgroundColor='#7b5f96' borderRadius='20px 0px' padding='10px'  >
                            <Typography color='#ede5f4'>Terminal</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid >
            <TaskFooter island={mission} currentTask={task} nextTaskState={nextTask?.state} handleNextTask={handleNextTask} handleGivenTask={handleGivenTask} />
            <MissionComplete open={openMissionComplete} island={mission} missionIdList={missionIdList} />
        </>
    )
}