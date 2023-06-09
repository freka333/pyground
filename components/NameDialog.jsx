import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NameDialog({ open, user, handleClose }) {
    const [name, setName] = useState(user.nickname);
    const [errorMessage, setErrorMessage] = useState(false);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleSetName = (name) => {
        if (name.length > 15) {
            setErrorMessage(true);
        }
        else {
            setErrorMessage(false);
        }
        setName(name);
    }

    const handleNickname = async (event) => {
        event.preventDefault();

        if (!errorMessage) {
            const response = await fetch('/api/user/nickname', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });
            const result = await response.json();
            if (response.status < 300) {
                refreshData();
            }
            handleClose();
        }
    }

    return (
        <Dialog open={open} transitionDuration={0} maxWidth='xs' fullWidth >
            <DialogTitle>
                Válassz egy nevet a karakterednek!
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Név'
                    fullWidth
                    variant='standard'
                    value={name}
                    onChange={(e) => handleSetName(e.target.value)}
                />
                {errorMessage &&
                    <Typography color='red' fontSize='14px'>
                        Maximum 15 karakterből állhat a név!
                    </Typography>
                }
            </DialogContent>
            <DialogActions>
                <Button disabled={!name} variant='contained' onClick={handleNickname}>Mentés</Button>
            </DialogActions>
        </Dialog>
    )
}