import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";

export default function MissionComplete({ island, missionIdList }) {
    const router = useRouter();

    const handleBadgeClick = () => {
        router.push('/profile');
    }

    const handleIslandClick = () => {
        router.push('/');
    }
    return (
        <Dialog open fullWidth maxWidth='sm' >
            <DialogTitle textAlign='center'>Gratulálok!</DialogTitle>
            <DialogContent>
                <DialogContentText color='text.primary'>
                    {island.num < missionIdList.length ? `Végeztél a ${island.title} minden feladatával, így feloldottál egy új jutalmat, és egy új szigetet!` : 'Minden feladatot teljesítettél, ezért megkaptad a legsikeresebbeknek járó jutalmat! Szép munka!'}
                </DialogContentText>
                <img src={island.badge_img} alt={island.title} width='120px' style={{ display: 'flex', margin: 'auto' }} />
                <DialogActions sx={{ justifyContent: 'center', marginTop: '10px' }}>
                    <Button variant='contained' onClick={handleBadgeClick}>
                        Mutasd a jutalmaimat!
                    </Button>
                    <Button variant='contained' onClick={handleIslandClick}>
                        {island.num < missionIdList.length ? 'Lássuk az új szigetet!' : 'Vissza a főoldalra'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}