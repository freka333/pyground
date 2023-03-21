import { Button, Dialog, Typography } from "@mui/material";

export default function MissionComplete({ open }) {
    return (
        <Dialog open={open} fullWidth maxWidth="sm" >
            <Typography>Gratulálok! Szereztél egy új érmét!</Typography>
            <Button variant="contained">Gomb</Button>
        </Dialog>
    )
}