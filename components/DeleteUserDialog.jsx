import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";

export default function DeleteUserDialog({ open, handleClose }) {
    const router = useRouter();

    const handleDelete = async () => {
        const response = await fetch('/api/user/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await response.json();
        if (response.status < 300) {
            router.push('/');
        }
    }

    return (
        <Dialog open={open} maxWidth='sm' >
            <DialogTitle textAlign='center' fontSize='24px'>Biztos vagy benne, hogy törlöd a fiókod minden adatoddal együtt?</DialogTitle>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' onClick={handleDelete} sx={{ backgroundColor: 'red.main', color: 'lightPurpleGrey.light', ':hover': { backgroundColor: 'red.dark' } }}>Törlés</Button>
                <Button variant='contained' onClick={handleClose} sx={{ backgroundColor: 'grey.main', color: 'lightPurpleGrey.light', ':hover': { backgroundColor: 'grey.dark' } }}>Mégse</Button>
            </DialogActions>
        </Dialog>
    )
}