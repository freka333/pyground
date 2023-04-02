import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function FirstCompletedDialog({ open, handleClick }) {
    return (
        <Dialog open={open} fullWidth maxWidth='sm' >
            <DialogContent sx={{ padding: '15px' }}>
                <DialogContentText textAlign='center' fontSize='18px' color='text.primary'>
                    Az első akadályt sikeresen elhárítottad, ezért kaptál 10 gyémántot!
                    Csak így tovább!
                </DialogContentText>
                <img src='/images/diamond.png' alt='diamond' width='60px' style={{ display: 'flex', margin: 'auto' }} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', marginBottom: '15px' }}>
                <Button variant='contained' onClick={handleClick} >
                    Lássuk a következő feladatot!
                </Button>
            </DialogActions>
        </Dialog>
    )
}