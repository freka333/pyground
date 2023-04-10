import { Alert, Snackbar } from "@mui/material";

export default function RunResultSnackbar({ resultState, openSnackbar, handleOnClose }) {
    return (
        <Snackbar autoHideDuration={3000} open={openSnackbar} onClose={handleOnClose}>
            {resultState == "completed"
                ? <Alert severity='success' sx={{ width: '100%', backgroundColor: 'successAlert.main', color: 'successAlert.dark' }}>Sikeresen megoldottad a feladatot!</Alert>
                : <Alert severity='warning' sx={{ width: '100%', backgroundColor: 'warningAlert.main', color: 'warningAlert.dark' }}>Sajnos nem ez a megoldás, próbáld újra!</Alert>
            }
        </Snackbar>
    )
}