import { Button, Typography } from "@mui/material";
import ExternalContentDialog from "./ExternalContentDialog";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function CopyrightButton({ open, handleOpen, handleClose, color }) {
    const txtColor = color || 'primary.dark';
    return (
        <div style={{ display: 'flex', alignSelf: 'end', marginRight: '10px' }}>
            <Button disableElevation disableRipple onClick={handleOpen} sx={{ ':hover': { bgcolor: 'transparent' } }}>
                <CopyrightIcon sx={{ color: txtColor, fontSize: 16 }} />
                <Typography color={txtColor}> Képek forrása </Typography>
            </Button>
            <ExternalContentDialog open={open} handleClose={handleClose} />
        </div>
    )
}