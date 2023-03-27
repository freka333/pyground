import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function MissionComplete({ open, island }) {
    const router = useRouter();

    const handleBadgeClick = () => {
        router.push("/profile");
    }

    const handleIslandClick = () => {
        router.push("/");
    }
    return (
        <Dialog open={open} fullWidth maxWidth="sm" PaperProps={{ sx: { padding: '5px', bgcolor: '#f1eef3' } }} >
            <DialogTitle color='360c61'>Gratulálok!</DialogTitle>
            <DialogContent>
                <DialogContentText color='360c61'>Végeztél a {island.title} sziget minden feladatával, így feloldottál egy új jutalmat, és egy új szigetet!</DialogContentText>
                <img src={island.badge_img} alt={island.title} width='120px' style={{ display: 'flex', margin: 'auto' }} />
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleBadgeClick}>Mutasd a jutalmaimat!</Button>
                    <Button variant="contained" onClick={handleIslandClick}>Lássuk az új szigetet!</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}