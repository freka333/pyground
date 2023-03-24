import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic";
import { useState } from "react";

const theme = "night-owl";

const Editor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
})

export default function ExerciseContent({ user, characters, mission, task }) {
    const [value, setValue] = useState('print("Python!")');

    const handleEditorChange = (value) => {
        setValue(value);
    };

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
                            <Typography>{task.description}</Typography>
                            <Typography fontSize='30px'>jfdfjdi</Typography>
                            <Typography fontSize='30px'>jfdfjdi</Typography>
                            <Typography fontSize='30px'>jfdfjdi</Typography>
                            <Typography fontSize='30px'>jfdfjdi</Typography>
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
                                <Button variant="contained" sx={{ backgroundColor: 'secondary.main' }} style={{ borderRadius: 15 }}>
                                    Futtatás
                                </Button>
                                <Button variant="contained" sx={{ backgroundColor: 'secondary.main' }} style={{ borderRadius: 15, margin: 5 }} >
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
                            options={{ minimap: { enabled: false } }}
                        />
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
}