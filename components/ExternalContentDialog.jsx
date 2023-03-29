import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ExternalContentDialog({ open, handleClose }) {
    return (
        <Dialog open={open}>
            <DialogTitle>Az oldalon található képek és ikonok forrása:</DialogTitle>
            <DialogContent>
                <DialogContentText><a href="https://www.freepik.com/free-vector/isometric-colorful-game-islands-set_9587373.htm#&position=13&from_view=undefined">Image by macrovector</a> on Freepik</DialogContentText>
                <DialogContentText><a href="https://www.freepik.com/free-vector/gaming-islands-with-stones-isometric-set_9457352.htm#&position=15&from_view=undefined">Image by macrovector</a> on Freepik</DialogContentText>
                <DialogContentText><a href="https://www.freepik.com/free-vector/magic-school-classroom-with-cauldron-night_16646800.htm#&position=27&from_view=undefined">Image by upklyak</a> on Freepik</DialogContentText>
                <DialogContentText><a href="https://www.freepik.com/free-vector/cartoon-heroes-monster-illustrations-set_19212615.htm#&position=33&from_view=undefined">Image by pch.vector</a> on Freepik</DialogContentText>
                <DialogContentText><a href="https://www.freepik.com/free-vector/computer-game-cartoon-characters-set-giant-viking-warrior-with-shield-orc-magician-elf-gnome-hobbit-isolated-cartoon-vector-illustration-online-game-fantasy-fairytale_10172524.htm#&position=37&from_view=undefined">Image by pch.vector</a> on Freepik</DialogContentText>
                <DialogContentText><a href="https://www.freepik.com/free-vector/game-ranking-badges-with-star-fantasy-frame_30001050.htm#&position=11&from_view=undefined">Image by upklyak</a> on Freepik</DialogContentText>
                <DialogContentText><a href="https://www.flaticon.com/free-icons/ferris-wheel" title="ferris wheel icons">Ferris wheel icons created by Freepik - Flaticon</a></DialogContentText>
                <DialogContentText><a href="https://www.flaticon.com/free-icons/emerald" title="emerald icons">Emerald icons created by Maxim Basinski Premium - Flaticon</a></DialogContentText>
                <DialogContentText><a href="https://www.flaticon.com/free-icons/person" title="person icons">Person icons created by bqlqn - Flaticon</a></DialogContentText>
                <DialogContentText><a href="https://www.flaticon.com/free-icons/edit" title="edit icons">Edit icons created by Pixel perfect - Flaticon</a></DialogContentText>
                <DialogContentText><a href="https://www.flaticon.com/free-icons/writer" title="writer icons">Writer icons created by SeyfDesigner - Flaticon</a></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Bezárás</Button>
            </DialogActions>
        </Dialog>
    )
}