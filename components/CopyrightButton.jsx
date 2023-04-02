import { Button, Typography } from "@mui/material";
import ExternalContentDialog from "./ExternalContentDialog";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function CopyrightButton({ open, handleOpen, handleClose }) {
    return (
        <div style={{ display: 'flex', alignSelf: 'end', marginRight: '10px' }}>
            <Button disableElevation disableRipple onClick={handleOpen} sx={{ ':hover': { bgcolor: 'transparent' } }}>
                <CopyrightIcon sx={{ color: 'primary.dark', fontSize: 16 }} />
                <Typography color='primary.dark'> Képek forrása </Typography>
            </Button>
            <ExternalContentDialog open={open} handleClose={handleClose} />
        </div>
    )
}