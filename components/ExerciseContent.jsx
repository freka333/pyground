import Editor, { loader } from "@monaco-editor/react";
import { Box, Button, Grid, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import themeData from "monaco-themes/themes/Night Owl.json";
import PlayCircle from "@mui/icons-material/PlayCircle";
import RestartAlt from "@mui/icons-material/RestartAlt";
import MissionComplete from "./MissionComplete";
import TaskFooter from "./TaskFooter";
const theme = "night-owl";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
    margin: '5px 5px 0 0',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.lightGreen.light,
    ':hover': {
        backgroundColor: theme.palette.secondary.dark
    }
}))

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
            body: JSON.stringify({
                code: editorValue,
                correctAnswer: task.correctAnswer,
                defaultCode: task.defaultCode,
                solution: task.solution
            }),
        });
        const result = await response.json();

        if (task.state === 'started' && result.state === 'completed') {
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
        if (nextTask && nextTask.state !== 'locked') {
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
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    return (
        <>
            <Grid container backgroundColor='lightPurpleGrey.dark' padding='10px' height='100%' overflow='hidden' >
                <Grid item xs={4} display='grid' height='100%'>
                    <Box borderRadius='15px' sx={{ backgroundColor: 'lightPurpleGrey.main' }} marginRight='10px' display='flex' flexDirection='column' overflow='hidden' >
                        <Box backgroundColor='purpleGrey.dark' borderRadius='15px 15px 0 0' padding='5px' color='lightPurpleGrey.light'>
                            <Typography fontSize='15px' align='center'>{mission.title}</Typography>
                            <Typography fontSize='20px' align='center'>{task.title}</Typography>
                        </Box>
                        <Box padding='10px' overflow='auto'>
                            <div style={{ fontFamily: 'Calibri, sans-serif', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: task.description }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8} height='100%' display='flex' flexDirection='column'>
                    <Stack height='60%'>
                        <Grid container backgroundColor='codeEditor.dark' borderRadius='20px 15px 0 0' justifyContent='space-between' paddingBottom='7px'>
                            <Grid item backgroundColor='purpleGrey.dark' borderRadius='20px 0' padding='10px' >
                                <Typography color='lightPurpleGrey.light'>Kódszerkesztő</Typography>
                            </Grid>
                            <Grid item>
                                <CustomButton variant='contained' onClick={handleRunClick} endIcon={<PlayCircle />}>
                                    Futtatás
                                </CustomButton>
                                <CustomButton variant='contained' onClick={handleResetCode} endIcon={<RestartAlt />} >
                                    Kód alaphelyzetbe állítása
                                </CustomButton>
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
                    <Box backgroundColor='codeEditor.main' height='40%' padding='10px' overflow='auto'>
                        {result?.map((line, i) => (
                            <Typography key={i} color='lightPurpleGrey.light' whiteSpace='pre' fontFamily='monospace'>{line}</Typography>
                        ))}
                    </Box>
                    <Box backgroundColor='codeEditor.main' borderRadius='0 0 20px 20px' display='flex' justifyContent='flex-end'>
                        <Box backgroundColor='purpleGrey.dark' borderRadius='20px 0px' padding='10px'  >
                            <Typography color='lightPurpleGrey.light'>Terminal</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid >
            <TaskFooter island={mission} currentTask={task} nextTaskState={nextTask?.state} handleNextTask={handleNextTask} handleGivenTask={handleGivenTask} />
            <MissionComplete open={openMissionComplete} island={mission} missionIdList={missionIdList} />
        </>
    )
}