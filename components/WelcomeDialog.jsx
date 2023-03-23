import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import NameDialog from "./NameDialog"
import CharacterDialog from './CharacterDialog'

export default function WelcomeDialog2({ user, characters }) {
    const [selectedDialog, setSelectedDialog] = useState(!user.nickname && !user.userCharacter ? "intro" : !user.nickname ? "nickname" : !user.userCharacter ? "characters" : "");

    const handleSelectedDialog = () => {
        let dialog = "";
        if (selectedDialog === "intro") {
            if (!user.userCharacter) {
                dialog = "characters";
            }
            else if (!user.nickname) {
                dialog = "nickname";
            }
        }
        else if (selectedDialog === "characters") {
            if (!user.nickname) {
                dialog = "nickname";
            }
            else {
                dialog = "guide";
            }
        }
        else if (selectedDialog === "nickname") {
            if (!user.userCharacter) {
                dialog = "characters";
            }
            else {
                dialog = "guide";
            }
        }
        setSelectedDialog(dialog);
    }

    return (
        <>
            {selectedDialog === "intro" &&
                <Dialog open PaperProps={{ style: { backgroundColor: '#f5f1f7' } }}>
                    <DialogTitle>Üdvözöllek a PyGround világában!</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Mielőtt elkezdenénk a Python nyelvvel való ismerkedést, válassz egy karaktert magadnak, akinek a képességeit fejlesztheted a tanulás során, majd nevezd el! Ez a név fog megjelenni a felületen, ezt később bármikor módosíthatod.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleSelectedDialog}>Tovább</Button>
                    </DialogActions>
                </Dialog>
            }
            {selectedDialog === 'characters' &&
                <CharacterDialog open user={user} characters={characters} handleClose={handleSelectedDialog} />
            }
            {selectedDialog === 'nickname' &&
                <NameDialog open user={user} handleClose={handleSelectedDialog} />
            }
            {selectedDialog === "guide" &&
                <Dialog open PaperProps={{ style: { backgroundColor: '#f5f1f7' } }}>
                    <DialogTitle>Szia, {user.nickname}!</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Máris kezdhetjük a kódolást!
                        </Typography>
                        <Typography>
                            Minden szigeten feladatok várnak, amiknek a sikeres teljesítését követően gyémántokat szerezhetsz, valamint egy sziget összes feladatának megoldása után egy-egy kitüntetést is bezsebelhetsz.
                        </Typography>
                        <Typography>
                            Kezdődjön a kaland, sok sikert!
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleSelectedDialog}>Kalandra fel!</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}