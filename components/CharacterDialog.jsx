import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CharacterDialog({ open, user, characters, handleClose }) {
    const [selectedCharacter, setSelectedCharacter] = useState(user.userCharacter);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleListItemClick = (event, item) => {
        setSelectedCharacter(item);
    }

    const handleCharacter = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/user/character', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ character: selectedCharacter }),
        });
        const result = await response.json();
        if (response.status < 300) {
            refreshData();
        }
        handleClose();
    }

    return (
        <Dialog open={open} transitionDuration={0} maxWidth='xs' fullWidth>
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
                <Button disabled={!selectedCharacter} variant='contained' onClick={handleCharacter}>Mentés</Button>
            </DialogActions>
        </Dialog>
    )
}