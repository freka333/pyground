import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function SolutionDialog({ code, handleClose }) {
    return (
        <Dialog open>
            <DialogTitle>
                Megoldás:
            </DialogTitle>
            <DialogContent>
                <code style={{ whiteSpace: 'pre-wrap' }}>{code}</code>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>Bezárás</Button>
            </DialogActions>
        </Dialog>
    )
}