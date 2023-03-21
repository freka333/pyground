import Editor, { loader } from "@monaco-editor/react";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material"
import Stack from '@mui/material/Stack';
import { useRouter } from "next/router";
import { useState } from "react";
import themeData from "monaco-themes/themes/Night Owl.json";
import { DeleteIcon, PlayCircle, RestartAlt } from '@mui/icons-material';
import MissionComplete from "./MissionComplete";
const theme = "night-owl";

const defineTheme = async () => {
    const monaco = await loader.init();
    monaco.editor.defineTheme(theme, themeData);
};

defineTheme();

export default function ExerciseContent({ user, characters, mission, task }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [value, setValue] = useState('print("Python!")');
    const [result, setResult] = useState(null);

    const handleEditorChange = (value) => {
        setValue(value);
    };

    const handleOnClick = async () => {
        console.log(value)

        const response = await fetch('/api/python', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: value }),
        });
        const result = await response.json();
        console.log("result:", result)
        setResult(result);
    }

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
            <Grid container backgroundColor='#7a549f' sx={{ flex: 1 }}>
                <Grid item xs={4}>
                    <Box borderRadius='15px' sx={{ backgroundColor: '#EBE1F6' }}>
                        <Box backgroundColor='#0ab49a' borderRadius='15px 15px 0 0' padding='5px' color='#011627'>
                            <Typography fontSize='15px' align="center">{mission.title}</Typography>
                            <Typography fontSize='20px' align="center">{task.title}</Typography>
                        </Box>
                        <Box padding='10px'>
                            <Typography>{task.description}</Typography>
                            <Button variant="contained" onClick={handleNextTask}>Következő</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Stack height='100vh'>
                        <Stack>
                            <Grid container backgroundColor='#011627' borderRadius='20px 15px 0 0' justifyContent='space-between'>
                                <Grid item backgroundColor='#0ab49a' borderRadius='20px 0' padding='10px' >
                                    <Typography color='#011627'>Kódszerkesztő</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton aria-label="Run" variant='contained' color='secondary' backgroundColor='#ff0000' onClick={handleOnClick} size='large'>
                                        <PlayCircle fontSize="inherit" />
                                    </IconButton>
                                    <IconButton aria-label="Restart" variant='contained' color='secondary' backgroundColor='#ff0000' size='large'>
                                        <RestartAlt fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Editor
                                height='60%'
                                language={'python'}
                                value={value}
                                theme={theme}
                                onChange={handleEditorChange}
                            />
                        </Stack>
                        <Box container backgroundColor='#2A173D' borderRadius='0 0 15px 15px' sx={{ height: '100%' }}>

                            <Typography color='white'>{result}</Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            <MissionComplete open={open} />
        </>
    )
}