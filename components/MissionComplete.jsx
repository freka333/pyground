import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";

export default function MissionComplete({ open, island, missionIdList }) {
    const router = useRouter();

    const handleBadgeClick = () => {
        router.push("/profile");
    }

    const handleIslandClick = () => {
        router.push("/");
    }
    return (
        <Dialog open={open} fullWidth maxWidth="sm" PaperProps={{ sx: { padding: '5px', bgcolor: '#f1eef3' } }} >
            <DialogTitle color='360c61' textAlign='center'>Gratulálok!</DialogTitle>
            <DialogContent>
                <DialogContentText color='360c61'>
                    {island.num < missionIdList.length ? `Végeztél a ${island.title} minden feladatával, így feloldottál egy új jutalmat, és egy új szigetet!` : "Minden feladatot teljesítettél, ezért megkaptad a legsikeresebbeknek járó jutalmat! Szép munka!"}
                </DialogContentText>
                <img src={island.badge_img} alt={island.title} width='120px' style={{ display: 'flex', margin: 'auto' }} />
                <DialogActions sx={{ justifyContent: 'center', marginTop: '10px' }}>
                    <Button variant="contained" onClick={handleBadgeClick}>
                        Mutasd a jutalmaimat!
                    </Button>
                    <Button variant="contained" onClick={handleIslandClick}>
                        {island.num < missionIdList.length ? "Lássuk az új szigetet!" : "Vissza a főoldalra"}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}