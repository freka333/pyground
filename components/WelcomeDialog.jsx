import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";

export default function WelcomeDialog({ user, characters }) {
    const [dialog, setDialog] = useState(!user.nickname ? 1 : 2);
    const [name, setName] = useState(user.nickname);
    const [selectedCharacter, setSelectedCharacter] = useState(user.userCharacter);
    const [open, setOpen] = useState(!user.nickname || !user.userCharacter);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleListItemClick = (event, item) => {
        setSelectedCharacter(item);
    }

    const handleCharacter = async (event) => {
        event.preventDefault();

        const data = {
            id: user.id,
            character: selectedCharacter,
        }

        const response = await fetch('/api/user/character', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status < 300) {
            refreshData();
        }
        setOpen(false);
    }

    const handleNickname = async (event) => {
        event.preventDefault();

        const data = {
            id: user.id,
            name: name,
        }

        const response = await fetch('/api/user/nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status < 300) {
            refreshData();
        }
        selectedCharacter ? setOpen(false) : setDialog(2);
    }

    return (
        <Dialog open={open}>
            {dialog === 1 &&
                <>
                    <DialogTitle>
                        Üdvözöllek!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Adj meg egy becenevet!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Név"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!name} variant="contained" onClick={handleNickname}>Tovább</Button>
                    </DialogActions>
                </>
            }
            {!user.userCharacter && dialog === 2 &&
                <>
                    <DialogTitle>
                        Válassz egy karaktert!
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            {characters.map((item) => (
                                <ListItem key={item.kind}>
                                    <ListItemButton selected={item._id === selectedCharacter} onClick={(event) => handleListItemClick(event, item._id)}>
                                        <Avatar alt={item.kind} src={item.icon} sx={{ width: 50, height: 50 }} />
                                        <ListItemText>
                                            {item.kind}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!selectedCharacter} variant="contained" onClick={handleCharacter}>Kész</Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    )
}