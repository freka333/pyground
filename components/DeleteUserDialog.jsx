import { Button, Dialog, Typography } from "@mui/material";

export default function DeleteUserDialog({ open, handleClose }) {
    return (
        <Dialog open={open}>
            <Typography>Biztos vagy benne, hogy törlöd a fiókod minden adatoddal együtt?</Typography>
            <Button>Törlés</Button>
            <Button onClick={handleClose}>Mégse</Button>
        </Dialog>
    )
}