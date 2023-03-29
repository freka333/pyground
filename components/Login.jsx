import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

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
    return (
        <div style={styles.container}>
            <Box sx={{
                bgcolor: 'primary.main', boxShadow: 1, borderRadius: 2, minWidth: 300,
                position: "fixed", top: "20%", left: "20%", py: "20px",
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: '20px'
            }}>
                <Box sx={{ p: "10px" }}>
                    <img src="images/logo.png" alt="Pyground logo" width="200" />
                </Box>
                <Button variant="contained" color='secondary' onClick={() => signIn('google')}>Sign in with Google</Button>
            </Box>
        </div>
    )
}