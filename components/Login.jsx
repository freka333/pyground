import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import CopyrightButton from "./CopyrightButton";

const styles = {
    container: {
        backgroundImage: 'url(images/login_bg.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }
};

export default function Login() {
    const [disable, setDisable] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSignIn = () => {
        setDisable(true);
        signIn('google');
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div style={styles.container}>
            <Box sx={{
                bgcolor: 'primary.main', boxShadow: 2, borderRadius: 2, minWidth: 300,
                position: 'fixed', top: '20%', left: '20%', py: '20px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px'
            }}>
                <img src='images/logo.png' alt='Pyground logo' width='200' style={{ padding: '10px' }} />
                <Button variant='contained' disabled={disable} color='secondary' onClick={handleSignIn}>Bejelentkezés Google fiókkal</Button>
            </Box>
            <Box sx={{ position: 'fixed', bottom: 0, right: 0 }}>
                <CopyrightButton open={open} handleOpen={handleOpen} handleClose={handleClose} color='secondary.main' />
            </Box>
        </div>
    )
}