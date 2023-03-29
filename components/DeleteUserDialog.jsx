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
        <Dialog open={open} maxWidth="sm" PaperProps={{ sx: { padding: '5px', bgcolor: '#f1eef3' } }} >
            <DialogTitle textAlign='center' fontSize='24px'>Biztos vagy benne, hogy törlöd a fiókod minden adatoddal együtt?</DialogTitle>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleDelete} sx={{ backgroundColor: '#bb0005', color: '#f3ecec', ':hover': { backgroundColor: '#e2060c' } }}>Törlés</Button>
                <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: '#8d76a1', color: '#eeedf0', ':hover': { backgroundColor: '#7b6b89' } }}>Mégse</Button>
            </DialogActions>
        </Dialog>
    )
}