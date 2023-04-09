import { Box, Button, Dialog, Typography } from "@mui/material";

export default function MissionWelcomeDialog({ description, background, handleClick }) {

    return (
        <Dialog open PaperProps={{ style: { minWidth: '960px', maxWidth: '960px', minHeight: '520px', maxHeight: '540px', backgroundImage: `url(${background})`, backgroundSize: '100%' } }}>
            <Box sx={{ margin: 'auto', }}>
                <Box sx={{ padding: '20px', marginX: '60px', borderRadius: '15px', backgroundColor: 'primary.main', background: 'rgba(50, 160, 100, 0.87)' }}>
                    <Typography fontSize='21px' textAlign='center'> {description} </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <Button variant="contained" color='secondary' onClick={handleClick} sx={{ fontSize: '20px' }} >
                        Kezdjük!
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}